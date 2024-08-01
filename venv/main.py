from playwright.sync_api import sync_playwright
import requests
import re
from bs4 import BeautifulSoup
import os
import zipfile
import gradio as gr

# Download Dir
download_dir = 'downloaded_images'

def login(page, username, password):
    page.goto("https://portal.intiaro.com/login?configuratorVersion=2.5")
    page.fill('input[name="userName"]', username)
    page.fill('input[name="password"]', password)
    page.click('button[type=submit]')

def siloshot_making(page):
    page.wait_for_timeout(10000)
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')
    print(soup)
    slider = soup.find('img', class_='slider-image')
    print(slider)
    img = slider.get('src')
    return img

def generate_urls(img, start_angle=0, end_angle=360, step=10):
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

    return zip_file_name

def process_images(username, password, product_url, product_name):
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        login(page, username, password)

        page.goto(product_url)
        img = siloshot_making(page)
        img_urls = generate_urls(img, start_angle=0, end_angle=360, step=10)
        zip_file_name = download_images(img_urls, download_dir, product_name)

        browser.close()

        return zip_file_name

def gradio_interface(username, password, product_url, product_name):
    # Validate all inputs
    if not (username and password and product_url and product_name):
        return "Please provide all required inputs."

    # Process images and return the file path
    return process_images(username, password, product_url, product_name)

def main():
    iface = gr.Interface(
        fn=gradio_interface,
        inputs=[
            gr.Textbox(label="Username", placeholder="Enter your username"),
            gr.Textbox(label="Password", type="password", placeholder="Enter your password"),
            gr.Textbox(label="Product URL", placeholder="Enter the product URL"),
            gr.Textbox(label="Product Name", placeholder="Enter the product name")
        ],
        outputs=gr.File(label="Download ZIP"),
        live=False  # Disable live updates
    )
    iface.launch()

if __name__ == "__main__":
    main()
