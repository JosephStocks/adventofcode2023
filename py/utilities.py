def read_text_file(file_name):
    """
    Reads the content of a text file and returns it as a multiline string.

    Parameters:
    - file_path: A string containing the path to the text file.

    Returns:
    A string with the content of the file or an error message if an exception is raised.
    """
    try:
        with open(file_name, "r", encoding="utf-8") as file:
            content = file.read()
            return content
    except FileNotFoundError:
        return "Error: The file was not found."
    except PermissionError:
        return "Error: You do not have permissions to read the file."
    except Exception as e:
        return f"An error occurred: {e}"
