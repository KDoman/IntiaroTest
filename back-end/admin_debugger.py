from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import json
import re

# Files Import
import pc_debugger
import var_debugger
from pc_debugger import main
from var_debugger import main

def freeze_page(page):
    # Intercept and abort all network requests
    def handle_request(route, request):
        route.abort()

    page.route("**/*", handle_request)

    # Pause JavaScript execution
    page.evaluate("() => { debugger; }")


def login(page, username, password):
    page.goto("https://intiaro.agitest.pl/admin/login/?next=/admin/catalog_catalog/productsystem/")
    page.fill('input#id_username', username)
    page.fill('input#id_password', password)
    page.click('input[type=submit]')


def get_ps_data(page, product_url):
    # Entry Point
    base_link = 'https://intiaro.agitest.pl'
    page.goto(product_url)

    # Waiting for crucial selectors
    page.wait_for_selector('#product_configurations_dynamic_raw_id_label')
    page.wait_for_selector('#product_elements_dynamic_raw_id_label')
    page.wait_for_selector('.object-tools')

    # Load HTML data
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')

    # Find the elements
    pc_element = soup.find('span', id='product_configurations_dynamic_raw_id_label')
    pe_element = soup.find('span', id='product_elements_dynamic_raw_id_label')

    if pc_element and pe_element:

        # Find the <a> element inside the found <span> element
        pc_a_element = pc_element.find('a')
        pe_a_element = pe_element.find('a')

        if pc_a_element and pe_a_element:
            pc_href = pc_a_element.get('href')
            pe_href = pe_a_element.get('href')
            print(f"Found PC href: {pc_href} \nFound PE href: {pe_href}")
        else:
            return None
    else:
        return None

    # Searching for Variables Link
    ul = soup.find('ul', class_ = 'object-tools')
    if ul:
        li = ul.find_all('li')[2]
        a_tag = li.find('a')
        variables_href = a_tag.get('href')
        print(f"Found Variables href: {variables_href}")
    else:
        return None

    hrefs = make_hrefs(pc_href, pe_href, variables_href, base_link)

    # Save hrefs to a JSON file
    with open('hrefs.json', 'w') as f:
        json.dump(hrefs, f)

    #page.goto(base_link+href)
    #freeze_page(page)

def make_hrefs(pc_href, pe_href, variables_href, base_link):

    pc_link = base_link + pc_href
    pe_link = base_link + pe_href
    var_link = base_link + variables_href

    # Created links to use
    hrefs = {
        "pc": f"{base_link}{pc_href}",
        "pe": f"{base_link}{pe_href}",
        "variables": f"{base_link}{variables_href}"
    }
    return hrefs

def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        username = 'karol.kruszynski.automat@intiaro.com'
        password = 'ydjP5aZECJbQXhy'

        # Log in to the site
        login(page, username, password)

        # Get the product link from user input
        product_url = input("Pass the product link: ")

        # Select the product and freeze the page
        get_ps_data(page, product_url)

        # DEBUG PC
        pc_debugger.main(page)

        # DEBUG VARIABLES
        var_debugger.main(page)

        # Keep the browser open for inspection
        input("Press Enter to close the browser...")
        browser.close()


if __name__ == "__main__":
    main()
