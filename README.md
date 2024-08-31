# Welcome to the Chatfolio Conversation Project

## Project Information

**Project**: chatfolio-conversation

## How can I edit this code?

There are several ways to edit your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repository and push changes. Changes made will be reflected in the repository.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
git clone https://github.com/YourUsername/chatfolio-conversation.git
cd chatfolio-conversation
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used in this project?

This project is built with:

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I set up EmailJS?

To set up EmailJS, follow the steps below:

1. Create an account on [EmailJS](https://www.emailjs.com/).
2. Create a new email service and a new email template.
3. Add the EmailJS credentials to your project's configuration file.

Copy the `.env.example` file to `.env` and set the following variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
VITE_ABOUT_URL=https://example.com
VITE_GITHUB_USERNAME=luandro
```

## How can I connect to GitHub?

To connect to GitHub, follow the steps below:

1. Create a repository on GitHub.
2. Add the remote repository to your local project:
    ```sh
    git remote add origin https://github.com/YourUsername/chatfolio-conversation.git
    ```
3. Commit and push your changes:
    ```sh
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    ```

## How can I add an "aboutme" page from my website?

To add an "aboutme" page, follow the steps below:

1. Create a new React component for the "aboutme" page.
2. Add the content of the "aboutme" page from your website.
3. Import and use the component in your application.

## Documentation in Portuguese

For documentation in Portuguese, please refer to [LEIAME.md](./LEIAME.md).
