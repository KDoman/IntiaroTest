from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from playwright.sync_api import sync_playwright
import requests
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import os
import glob
import zipfile

# Download Dir
download_dir = 'downloaded_images'

app = Flask(__name__)
CORS(app)

def login(page, username, password):
    page.goto("https://portal.intiaro.com/login?configuratorVersion=2.5")
    page.fill('input[name="userName"]', username)
    page.fill('input[name="password"]', password)
    page.click('button[type=submit]')

def siloshot_making(page):
    page.wait_for_timeout(5000)
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')
    slider = soup.find('img', class_='slider-image')
    img = slider.get('src')
    return img

def generate_urls(img, start_angle=0, end_angle=350, step=10):
    angle_pattern = re.compile(r'(angle/)(\d+)')
    match = angle_pattern.search(img)
    if match:
        base_url = img[:match.start(2)]  # Base URL up to the angle value

    """Generate a list of URLs with angles from start_angle to end_angle."""
    urls = []
    for angle in range(start_angle, end_angle + 1, step):
        new_url = re.sub(r'angle/\d+', f'angle/{angle}', img)
        urls.append(new_url)
    return urls

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

    return count_img_downloaded, zip_file_name

@app.route('/api/download_images', methods=['POST'])
def download_images_api():
    data = request.json
    product_url = data['product_url']
    username = data['username']
    password = data['password']
    product_name = data['product_name']

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        login(page, username, password)
        page.goto(product_url)
        img = siloshot_making(page)
        img_urls = generate_urls(img, start_angle=0, end_angle=360, step=10)
        count_img_downloaded, zip_file_name = download_images(img_urls, download_dir, product_name)

        browser.close()

    return jsonify({'count_img_downloaded': count_img_downloaded, 'zip_file_name': zip_file_name})

@app.route('/api/download_zip/<path:filename>', methods=['GET'])
def download_zip(filename):
    return send_from_directory(download_dir, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
