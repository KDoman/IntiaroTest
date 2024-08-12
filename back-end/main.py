from playwright.sync_api import sync_playwright
import glob
def login(page, username, password):
    page.goto("https://intiaro.agitest.pl/admin/products/matrix/")
    page.fill('input#id_username', username)
    page.fill('input#id_password', password)
    page.click('input[type=submit]')
def parse_txt_to_transforms(file_path):
    transforms = {}
    current_transform = None
    current_section = None
    transform_counter = 0
    for file_path in file_paths:
        with open(file_path, 'r') as file:
            for line in file:
                # Usuń zbędne białe znaki z początku i końca linii
                line = line.strip()

                # Pomiń puste linie
                if not line:
                    continue

                # Sprawdzaj, czy linia zawiera nazwę sekcji
                if "Position" in line:
                    transform_counter += 1
                    current_transform = f"Transform {transform_counter}"
                    transforms[current_transform] = {}
                    current_section = 'Position'
                    transforms[current_transform][current_section] = []
                elif "Rotation" in line:
                    current_section = 'Rotation'
                    transforms[current_transform][current_section] = []
                elif "Scale" in line:
                    current_section = 'Scale'
                    transforms[current_transform][current_section] = []
                elif current_section and ("X:" in line or "Y:" in line or "Z:" in line):
                    # Wyodrębnij wartość po dwukropku i konwertuj ją na float
                    value = float(line.split(":")[1].strip())
                    transforms[current_transform][current_section].append(value)

    return transforms

# Zbierz wszystkie pliki .txt z danego katalogu
file_paths = glob.glob('*.txt')  # Zakładając, że pliki są w tym samym katalogu co skrypt

def insert_transforms(transforms, page):
    # Add new transform
    page.goto('https://intiaro.agitest.pl/admin/products/matrix/add/')
    page.wait_for_timeout(1000)

    # Wyświetlenie wynikowego słownika
    #print(transforms)
    #print(transforms['Transform 1'])
    #print(transforms['Transform 1']['Position'])
    #print(transforms['Transform 1']['Position'][1])
    for transform in transforms.keys():
        print(transforms[transform])
        for params in transforms[transform].keys():
            if params == 'Position':
                # Odpowiednie pola formularza dla pozycji
                form_fields = ['position_x', 'position_y', 'position_z']

                # Iteracja po wartościach i przypisanie ich do odpowiednich pól formularza
                for index, value in enumerate(transforms[transform][params]):
                    form_field_name = form_fields[index]  # Wybierz odpowiednie pole formularza
                    print(f"Setting {form_field_name} to {value}")
                    # Tutaj możesz wpisać kod wypełniający formularz
                    page.fill(f"input[name='{form_field_name}']", str(value))
            if params == 'Rotation':
                # Odpowiednie pola formularza dla pozycji
                form_fields = ['rotation_x', 'rotation_y', 'rotation_z']

                # Iteracja po wartościach i przypisanie ich do odpowiednich pól formularza
                for index, value in enumerate(transforms[transform][params]):
                    form_field_name = form_fields[index]  # Wybierz odpowiednie pole formularza
                    print(f"Setting {form_field_name} to {value}")
                    # Tutaj możesz wpisać kod wypełniający formularz
                    page.fill(f"input[name='{form_field_name}']", str(value))

            if params == 'Scale':
                # Odpowiednie pola formularza dla pozycji
                form_fields = ['scale_x', 'scale_y', 'scale_z']

                # Iteracja po wartościach i przypisanie ich do odpowiednich pól formularza
                for index, value in enumerate(transforms[transform][params]):
                    form_field_name = form_fields[index]  # Wybierz odpowiednie pole formularza
                    print(f"Setting {form_field_name} to {value}")
                    # Tutaj możesz wpisać kod wypełniający formularz
                    page.fill(f"input[name='{form_field_name}']", str(value))
        page.wait_for_timeout(5000)
        page.click('input[type=submit][name=_addanother]')


def main():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        username = ''
        password = ''

        # Parsowanie pliku .txt
        transforms = parse_txt_to_transforms(file_paths)
        print(transforms)

        # Log in to the site
        login(page, username, password)

        insert_transform = insert_transforms(transforms, page)



if __name__ == "__main__":
    main()