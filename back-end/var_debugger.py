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
    var_link = hrefs['variables']
    page.goto(var_link)

    # Wait for crucial selectors
    page.wait_for_selector('div.colM')
    page.wait_for_selector('div.user_selection_data')
    page.wait_for_timeout(5000)

    # Load HTML data
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')

    # Check the parsed HTML content
    #print(soup.prettify())

    # Find Partial Selected Variables
    par_sel_var = soup.find('form', class_='form')
    #pattern = re.compile(r'choice-checkbox')

    # Finding Selected Variables
    finding_selected_variable = par_sel_var.find_all('div', class_=['partial_selected', 'fully_selected'])
    selected_var_slug = []
    for element in finding_selected_variable:
        var_slug = element.find('div', attrs={'data-type': 'group'})
        if var_slug:
            slug = var_slug.get('slug')
            if slug:
                # Remove numbers at the start of the slug
                clean_slug = re.sub(r'^\d+', '', slug)
                selected_var_slug.append(clean_slug)
    print(f"Active Variables in Product by SLUG: {selected_var_slug}")

    # Finding Selected Choices
    finding_included_choices = par_sel_var.find_all('div', class_='choice included')
    selected_choices_slug = []
    for element in finding_included_choices:
        choice_exact_slug = element.find('span', class_='choice-slug').get_text()
        selected_choices_slug.append(choice_exact_slug)
    print(f"Active Choices in Product by SLUG: {selected_choices_slug}")

