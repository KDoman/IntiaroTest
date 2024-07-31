from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import json
import re

def read_hrefs():
    # Read hrefs from the JSON file
    with open('hrefs.json', 'r') as f:
        hrefs = json.load(f)
    return hrefs

def main(page):
    hrefs = read_hrefs()
    pc_link = hrefs['pc']
    page.goto(pc_link)

    # Wait for crucial selectors
    page.wait_for_selector('p.file-upload')

    # Load HTML data
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')

    # Finding File Upload Selector
    file_upl = soup.find('p', class_ ='file-upload')
    icon_link = file_upl.find('a')
    if icon_link:
        icon_href = icon_link.get('href')
        print(f"Icon link: {icon_href}")
    else:
        return None

    # Finding Class Definition ID
    class_def = soup.find('input', id='id_class_definition')
    value = class_def.get('value')
    print(f"Class Definiton ID: {value}")

    # Finding Product Configuration Instance
    # Pattern for All of PC Instances
    pattern = re.compile(r'id_ProductConfiguration_element_instances-\d+-productconfigurationelementinstance')

    pc_instance = soup.find_all('input', id=pattern)
    for element in pc_instance:
        value = element.get('value')
        if value:
            print(f"Element ID: {value}")
        else:
            return None


if __name__ == "__main__":
    main()