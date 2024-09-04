Content Sharing Web Application - Front-End

Overview

Welcome to the Content Sharing Web Application! This repository contains the front-end code for a modern content-sharing platform, designed to provide users with an intuitive interface for creating, browsing, interacting with, and managing content. The application is built using React.js and styled with Bootstrap, offering a responsive design that works seamlessly across various devices.

Features

User Registration and Authentication

User Signup: Allows new users to register by providing their name, email, and password. User passwords are securely hashed before storage.

User Login: Registered users can log in using their email and password, receiving a secure authentication token for subsequent requests.

User Authentication: The application ensures that only authenticated users can create, edit, or delete content. Session management is handled using JWT tokens stored in local storage.

Content Management

Create Content: Authenticated users can create new posts, including text, images, and categories. The rich text editor supports formatting options to enhance content presentation.

Read Content: Browse through a wide variety of user-generated content. Posts are displayed in a card format with options for users to interact (vote, comment).

Edit Content: Content creators can edit their existing posts. The edit interface preserves the original content structure, allowing for easy updates.

Delete Content: Users have the ability to delete their own posts, with a confirmation prompt to prevent accidental deletions.

Interaction Features

Commenting: Users can leave comments on posts. The comment section is threaded, allowing for replies to specific comments.

Voting: Posts can be upvoted or downvoted by users, influencing the content's visibility and ranking on the platform.

Following Users: Users can follow others to receive updates on their latest posts. The followers and following lists are displayed on the user profile.

Search and Filtering

Search by Username: Quickly find content from specific users by searching for their username.

Filter by Popularity: Sort content based on the number of likes or votes received.

Filter by Date Created: View the most recent or the oldest content by filtering posts based on their creation date.

Search by Title and Keywords: Locate posts by searching for specific titles or keywords within the content.

Filter by Category: Narrow down content by selecting specific categories, making it easier to find relevant posts.

Responsive Design

Bootstrap Integration: The entire application is built using Bootstrap to ensure a responsive and visually consistent design.

Mobile-First Approach: The layout adapts to different screen sizes, providing an optimal viewing experience on mobile devices, tablets, and desktops.

Custom Bootstrap Overrides: Custom styles are applied to enhance the default Bootstrap look and feel, aligning with the application's branding.

Getting Started

Prerequisites

Ensure you have the following software installed on your development machine:

Node.js (version 14.x or higher): Required to run the development server and manage dependencies.

npm (Node Package Manager): Comes with Node.js and is used to install dependencies.

Installation

1. Clone the Repository
To get started, clone this repository to your local machine using Git:

bash
Copy code

git clone https://github.com/Masxshaqir/socialmediaclone.git
cd socialmediaclone
2. Install Dependencies
Next, install the necessary dependencies by running:

bash
Copy code

npm install
This command installs all the packages listed in the package.json file.

Configuration
Before running the application, you need to update the configuration settings:

Navigate to the src/config.js file.
Update the API_BASE_URL with the URL of your backend server.
Add any other environment-specific configurations as needed.
Running the Development Server
To start the development server, execute the following command:

bash
Copy code

npm run dev
The application will be compiled and served locally at http://localhost:3000. You can now open this URL in your web browser to view the application.

Project Structure
The project is organized as follows:

src/: Contains all source code files.
components/: Reusable React components such as buttons, forms, and modals.
pages/: Page components that correspond to different routes, such as Home, Profile, Login, and Signup.
services/: API service functions for interacting with the backend, such as fetching posts, submitting comments, and user authentication.
styles/: Custom stylesheets and Bootstrap overrides, primarily contained in the index.css file.
hooks/: Custom React hooks for handling logic and state management across the application.
context/: Context providers for global state management, such as user authentication and theme settings.
public/: Static files such as index.html, images, and fonts.
package.json: Contains project metadata, scripts, and dependencies.
README.md: This file, providing an overview and instructions for the project.
Building for Production
To create a production build of the application, run:

bash
Copy code

npm run build
This will compile the application into optimized static files in the build/ directory. These files can be deployed to any static hosting service, such as Netlify, Vercel, or GitHub Pages.

Contributing
We welcome contributions to improve this project! Here's how you can get involved:

Submit Issues: If you encounter bugs or have feature requests, please submit an issue on GitHub.
Pull Requests: If you'd like to contribute code, fork the repository, create a new branch, and submit a pull request. Make sure to follow the project's coding standards and include tests where applicable.

Screenshots

Here are some screenshots of the application to give you a better idea of its look and feel:

Login Page:

![alt text](login-1-1.png)

Signup Page:

![alt text](signup-1.png)

Home Page:

![alt text](home-1.png)

User Profile:

![alt text](profile-1.png)

Content Filtering:

![alt text](searchfilter.png)

Comments Section:

![alt text](comment-1.png)

Followers Page:

![alt text](following.png)

Voting Section:

![alt text](voting.png)

Responsive User Profile:

![alt text](responsive_profile-1.png)

