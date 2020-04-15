
# POS-SCRIPT-NODE
pos-script-node is a Node based script to execution pOS graphQL statements locally by utilizing the `pos-cli gui serve` port. This also allows the developers to chain or invoke graphQL queries multiply times through scripting.


## Installation

### Step 1
Install [Node](https://nodejs.org/en/) in your machine, to have NPM

### Step 2
Using NPM, install `pos-kit` CLI
Start your command-line tool (e.g. Terminal on a Mac, or Git Bash on Windows), and enter:

```bash
npm install -g @platform-os/pos-cli
```
If your Node.js is installed for all users you might need to use `sudo` to install NPM packages globally:
```bash
sudo npm install -g @platform-os/pos-cli
```

### Step 3
You have to get access to [Partner Portal](https://portal.apps.near-me.com/)

```bash
pos-cli env add [environment] --email [your email] --url [your Instance URL]
```

### Step 4
Navigate to root directory of the project on the your command-line tool and install dependencies using the following command:

```bash
npm install
```
> **NOTE:**  Depending on how you setup your machine, you might need to use `sudo` to perform this operation


## Usage

### Setup Environment Variables
Copy the content of the `.env-sample` and save it as `.env`. The content should be the same as below.
```env
POS_DIRECTORY=path-to-pos-project-directory
ENVIRONMENT=staging
PORT=3333
PER_PAGE=20
SERVER_PORT=4700
```
* **POS_DIRECTORY** - the path to the pOS project or directory which contains the `.pos` or .`marketplace-kit` file
* **ENVIRONMENT** - the name of the pOS environment (instance) for the graphQL queries to be executed.
* **PORT** - the graphQL gui port to serve. (optional | default: 3333)
* **PER\_PAGE** - the default per_page value when running the build-in `models.get` function of the graphQL instance/class. (optional | default: 20)
* **SERVER\_PORT** - the port in which the public content will be loaded. Initially this contains the formatted `README.md` content. (optional | default: 4700)

### Development
Create and save the graphQL file(s) under `app/graphql`. Open `index.js` and modify the file unto the desired output and behaviour, use `graphQL.execute` to invoke graphQL statements. 

> **NOTE:** The content of the graphQL files (query statements) would be available on the script via GrahphQL class instance property `query` (ex. `graphQL.query.filename`). 

### Execution
Navigate to root directory of the project on your command-line tool and enter the following command:

```bash
npm start
```