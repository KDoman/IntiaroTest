import streamlit as st
from playwright.async_api import async_playwright
import asyncio
import requests
import re
import os
import zipfile
from bs4 import BeautifulSoup
import nest_asyncio

# Apply nest_asyncio
nest_asyncio.apply()

# Download Dir
download_dir = 'downloaded_images'

# Funkcja logowania
async def login(page, username, password):
    await page.goto("https://portal.intiaro.com/login?configuratorVersion=2.5")
    await page.fill('input[name="userName"]', username)
    await page.fill('input[name="password"]', password)
    await page.wait_for_timeout(1500)
    await page.click('button[type=submit]')

# Funkcja siloshot_making do przetwarzania obrazów
async def siloshot_making(page):
    await page.wait_for_timeout(10000)
    html = await page.content()
    soup = BeautifulSoup(html, 'html.parser')
    slider = soup.find('img', class_='slider-image')
    img = slider.get('src') if slider else None
    return img

# Funkcja do generowania URL-i
def generate_urls(img, start_angle=0, end_angle=360, step=10):
    angle_pattern = re.compile(r'(angle/)(\d+)')
    match = angle_pattern.search(img)
    if match:
        base_url = img[:match.start(2)]
    urls = [re.sub(r'angle/\d+', f'angle/{angle}', img) for angle in range(start_angle, end_angle + 1, step)]
    return urls

# Funkcja do pobierania obrazów
def download_images(img_urls, download_dir, product_name):
    os.makedirs(download_dir, exist_ok=True)
    angle_pattern = re.compile(r'angle/(\d+)')
    image_paths = []
    for img_url in img_urls:
        try:
            img_response = requests.get(img_url)
            img_response.raise_for_status()
            angle_match = angle_pattern.search(img_url)
            img_name = f"{product_name}_{angle_match.group(1)}.png" if angle_match else "product_unknown.jpg"
            img_path = os.path.join(download_dir, img_name)
            image_paths.append(img_path)

            with open(img_path, 'wb') as file:
                file.write(img_response.content)

        except Exception as e:
            st.error(f'Failed to download {img_url}: {e}')

    zip_file_name = os.path.join(download_dir, f"{product_name}_images.zip")
    with zipfile.ZipFile(zip_file_name, 'w') as zipf:
        for img_path in image_paths:
            zipf.write(img_path, os.path.basename(img_path))

    return zip_file_name

# Funkcja przetwarzania obrazów
async def process_images(username, password, product_url, product_name):
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)  # Ustaw headless na True
        context = await browser.new_context()
        page = await context.new_page()

        await login(page, username, password)
        await page.wait_for_timeout(2000)
        await page.goto(product_url)
        await page.wait_for_timeout(2000)
        img = await siloshot_making(page)

        if img:
            img_urls = generate_urls(img, start_angle=0, end_angle=360, step=10)
            zip_file_name = download_images(img_urls, download_dir, product_name)
        else:
            st.error("No image found on the provided URL.")
            return None

        await browser.close()
        return zip_file_name

def main():
    st.title("Image Downloader")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    product_url = st.text_input("Product URL")
    product_name = st.text_input("Product Name")

    if st.button("Download Images"):
        if username and password and product_url and product_name:
            with st.spinner("Processing..."):
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                zip_file = loop.run_until_complete(process_images(username, password, product_url, product_name))
                if zip_file:
                    with open(zip_file, "rb") as f:
                        st.download_button("Download ZIP", f, file_name=os.path.basename(zip_file))
        else:
            st.error("Please provide all required inputs.")

if __name__ == "__main__":
    main()
