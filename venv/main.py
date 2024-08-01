from flask import Flask, request, send_file, jsonify
from playwright.sync_api import sync_playwright
import requests
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import os
import zipfile
import glob

app = Flask(__name__)

download_dir = 'downloaded_images'

def download_images(img_urls, download_dir, product_name):
    os.makedirs(download_dir, exist_ok=True)
    angle_pattern = re.compile(r'angle/(\d+)')
    count_img_downloaded = 0
    image_paths = []

    for img_url in img_urls:
        try:
            img_response = requests.get(img_url)
            img_response.raise_for_status()
            angle_match = angle_pattern.search(img_url)
            if angle_match:
                angle_value = angle_match.group(1)
                img_name = f"{product_name}_{angle_value}.png"
            else:
                img_name = "product_unknown.jpg"

            img_path = os.path.join(download_dir, img_name)
            image_paths.append(img_path)

            with open(img_path, 'wb') as file:
                file.write(img_response.content)

            count_img_downloaded += 1
        except Exception as e:
            print(f'Failed to download {img_url}: {e}')

    zip_file_name = os.path.join(download_dir, f"{product_name}_images.zip")
    with zipfile.ZipFile(zip_file_name, 'w') as zipf:
        for img_path in image_paths:
            zipf.write(img_path, os.path.basename(img_path))

    for png_file in glob.glob(os.path.join(download_dir, '*.png')):
        try:
            os.remove(png_file)
        except Exception as e:
            print(f"Failed to delete file {png_file}: {e}")

    return zip_file_name

@app.route('/download_images', methods=['POST'])
def handle_download_images():
    data = request.json
    product_url = data['product_url']
    product_name = data['product_name']

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto(product_url)
        page.wait_for_timeout(5000)
        html = page.content()
        soup = BeautifulSoup(html, 'html.parser')
        slider = soup.find('img', class_='slider-image')
        img = slider.get('src')

        def generate_urls(img, start_angle=0, end_angle=350, step=10):
            urls = []
            for angle in range(start_angle, end_angle + 1, step):
                new_url = re.sub(r'angle/\d+', f'angle/{angle}', img)
                urls.append(new_url)
            return urls

        img_urls = generate_urls(img, start_angle=0, end_angle=360, step=10)
        zip_file_name = download_images(img_urls, download_dir, product_name)
        browser.close()

    return jsonify({"zip_file_name": zip_file_name})

@app.route('/download_zip/<filename>', methods=['GET'])
def download_zip(filename):
    return send_file(os.path.join(download_dir, filename), as_attachment=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
