# <a name="_efr7fk7izzwd"></a>**Documentation Viewer & Editor**
This project is a web application that allows users to load JSON documentation, navigate between pages, edit content, and export the updated documentation. It is built with **React** and **Material-UI**, ensuring a responsive and intuitive user interface.

**Inital Brainstorming**
<img width="669" alt="brainstroming" src="https://github.com/user-attachments/assets/764b7857-b878-482b-ba4a-1fca2a99faa8" />



-----
## <a name="_q8zyzshsimmg"></a>**Features**
- **Load Documentation**: Input a URL to load documentation in JSON format.
- **Sidebar Navigation**: Quickly navigate between different pages of the documentation.
- **Content Display**: View content in a well-structured and scrollable main content area.
- **Edit Functionality**: Edit the page title and content using a form with live updates.
- **Export Feature**: Download the updated documentation as a JSON file.
- **Responsive Design**: Works seamlessly across different screen sizes.
-----
## <a name="_j6gwch21r1p"></a>**Installation and Setup**
Follow these steps to run the project locally:
### <a name="_foi228r9e27n"></a>**Prerequisites**
- **Node.js** (v16 or later)
- **npm** or **yarn**
### <a name="_1e91xhk237k0"></a>**Steps to Run**

**Clone the Repository**

`git clone <https://github.com/RMTabish/ViewEdit>`

`cd ViewEdit`

`cd viewedit`

**Install Dependencies**

`npm install`

**Run the Application**

`npm start`

Open the application in your browser:

`http://localhost:3000`

-----
## <a name="_uthynhim3hks"></a>**Deployment**
The application is deployed on **GitHub Pages**. You can view the live version here.
### <a name="_lg8p8pjnt8xb"></a>**Note for GitHub Pages**
- If navigating directly to a route (e.g., /page1), a 404 error may occur. This is due to GitHub Pages' limitations with client-side routing. To resolve this, a 404.html fallback has been implemented to handle routing correctly.
-----
## <a name="_wsg0kbhhfsv2"></a>**How to Use**
1. **Load Documentation**:
   1. Enter the URL of a valid JSON file containing documentation.
   1. Click "Load Data" to display the documentation in the sidebar and main content area.
1. **Navigate Between Pages**:
   1. Use the sidebar to select and switch between documentation pages.
1. **Edit Content**:
   1. Click "Edit" to switch to editing mode.
   1. Update the page title and content as needed.
   1. Click "Save" to save your changes.
1. **Export Updated Documentation**:
   1. Click the "Export" button to download the updated JSON file.
-----
## <a name="_izi67erb0p9d"></a>**Project Structure**
The project is divided into modular components for clarity and reusability:

scss

```
src/

`  `├── pages/

`  `│   ├── MainWindow.tsx      // Sidebar navigation

`  `├── App.tsx              // Root component

`  `├── index.tsx            // Application entry point

```
-----
## <a name="_50zxibsejwem"></a>**Built With**
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React UI framework for components and styling.
- **TypeScript**: Superset of JavaScript for type safety and better developer experience.
-----
## <a name="_s9g23k9np5ds"></a>**JSON Schema Example**

Example link:
```
https://gist.githubusercontent.com/thehappybug/65a466dcdb0908767057b80f0cb7ea5d/raw/6f10747c5feb7ce91b83392f2cee23ae06b20fe6/doc.json

```
The application expects a JSON file with the following structure:
```
{

  "Pages": [

    {

     "title": "Page 1",

      "bodyText": "This is the content of Page 1."

    },

    {

      "title": "Page 2",

      "bodyText": "This is the content of Page 2."

    }

`  `]

}


