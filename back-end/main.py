from playwright.sync_api import sync_playwright
import requests
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import os
import zipfile

# Download Dir
download_dir = 'downloaded_images'

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
        current_angle = int(match.group(2))  # Current angle value
        print(base_url)

    """Generate a list of URLs with angles from start_angle to end_angle."""
    urls = []
    for angle in range(start_angle, end_angle + 1, step):
        new_url = re.sub(r'angle/\d+', f'angle/{angle}', img)
        urls.append(new_url)
    return urls


def download_images(img_urls, download_dir):
    # Ensure the download directory exists
    os.makedirs(download_dir, exist_ok=True)

    # Regular expression to find the angle value in the URL
    angle_pattern = re.compile(r'angle/(\d+)')

    # Download each image
    # Downloaded IMG counter
    count_img_downloaded = 0
    # Name of files
    product_name = input("Pass a file name: ")
    # List to store img paths data
    image_paths = []
    for img_url in img_urls:
        try:
            # Fetch the image
            img_response = requests.get(img_url)
            img_response.raise_for_status()  # Check for request errors

            # Extract the angle value from the URL
            angle_match = angle_pattern.search(img_url)
            if angle_match:
                angle_value = angle_match.group(1)
                img_name = f"{product_name}_{angle_value}.png"
            else:
                img_name = "product_unknown.jpg"

            # Create a full path for saving the image
            img_path = os.path.join(download_dir, img_name)
            image_paths.append(img_path)

            # Write the image content to a file
            with open(img_path, 'wb') as file:
                file.write(img_response.content)

            print(f'Downloaded: {count_img_downloaded}/36 as {img_name}')
            count_img_downloaded += 1

        except Exception as e:
            print(f'Failed to download {img_url}: {e}')

    # Pack images into a zip file
    zip_file_name = os.path.join(download_dir, f"{product_name}_images.zip")
    with zipfile.ZipFile(zip_file_name, 'w') as zipf:
        for img_path in image_paths:
            zipf.write(img_path, os.path.basename(img_path))

    print(f"Packed images into {zip_file_name}")

def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        username = 'lee_industries@intiaro.com'
        password = r"hj@$NyhH5\>S9p&#Q"

        # Log in to the site
        login(page, username, password)

        # Freeze Site for 30sec
        product = input("Enter your product link: ")
        page.goto(product)
        img = siloshot_making(page)
        img_urls = generate_urls(img, start_angle=0, end_angle=360, step=10)
        download_images(img_urls, download_dir)

        browser.close()


if __name__ == "__main__":
    main()