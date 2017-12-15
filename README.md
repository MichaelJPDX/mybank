# myBank
Banking app code challenge for AltSource

This is the initial complete code sample for the AltSource banking ledger challenge. I believe it fulfulls all the requirements stated. As requested, there are two ways to access the program: through a command line/console interface as well as through a web app.

## Requirements

Both versions are built on node.js, so this is required to use the sample. All other dependencies are included in the repository. The technology stack is probably a little bloated for such a small application, but I didn't want to spend extra time trying to reduce it.

## Installation

You should be able to unzip the file (or pull from Github) to any folder on your computer. After unpacking the files there is no other installation required.

## Usage

### Command Line

To use the console interface, simply change into the installtion directory and enter:

    node bank.js

You will be shown a list of options that will guide you through the program. Use the up and down arrow keys to select options and then answer any questions as needed.

### Web Interface

To access the web app, first navigate to the installtion folder in a terminal or console window, then enter:

    node server.js

This will start the server, which is using the Express framework. Once the server starts, you will see the following line confirming this:

    Server started and listening on port 3000!

Now you can open a web browser and point to:

    http://localhost:3000

You should see the page for the "myBank" application. Select the menu items to login or create an account. The options should all be self explanatory.

Per the requirements, data is only retained as long as the application is running. You can login and logout, create added accounts, etc. and all the data will be retained so long as you do not quite the program or stop the server.

Data conditioning is minimal but should be sufficient for demonstration purposes.
