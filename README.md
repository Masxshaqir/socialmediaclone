# Content Sharing Web Application - Frontend

## Overview

Welcome to the **Content Sharing Web Application**! This repository hosts the frontend code for a modern content-sharing platform, designed to provide users with an intuitive interface for creating, browsing, interacting with, and managing content. Built with **React.js** and styled with **Bootstrap**, this application offers a responsive design that works seamlessly across all devices.

## Features

### User Registration and Authentication

- **User Signup**: New users can register by providing their name, email, and password. Passwords are securely hashed before storage.
- **User Login**: Registered users can log in using their email and password, receiving a secure authentication token for subsequent requests.
- **User Authentication**: The application ensures that only authenticated users can create, edit, or delete content. Session management is handled using JWT tokens stored in local storage.

### Content Management

- **Create Content**: Authenticated users can create new posts, including text, images, and categories. A rich text editor with formatting options enhances content presentation.
- **Read Content**: Users can browse a wide variety of user-generated content. Posts are displayed in a card format, with options to interact (vote, comment).
- **Edit Content**: Content creators can easily edit their posts, with the original structure preserved for seamless updates.
- **Delete Content**: Users can delete their posts, with a confirmation prompt to prevent accidental deletions.

### Interaction Features

- **Commenting**: Users can comment on posts, with a threaded comment section that allows for replies to specific comments.
- **Voting**: Posts can be upvoted or downvoted, influencing visibility and ranking on the platform.
- **Following Users**: Users can follow others to receive updates on their latest posts. Followers and following lists are displayed on user profiles.

### Search and Filtering

- **Search by Username**: Quickly find content from specific users by searching for their username.
- **Filter by Popularity**: Sort content based on the number of likes or votes received.
- **Filter by Date Created**: View content based on creation date, from the most recent to the oldest.
- **Search by Title and Keywords**: Locate posts by searching for specific titles or keywords.
- **Filter by Category**: Narrow down content by selecting specific categories, making it easier to find relevant posts.

### Responsive Design

- **Bootstrap Integration**: The application is fully built with Bootstrap, ensuring a responsive and visually consistent design.
- **Mobile-First Approach**: The layout adapts to different screen sizes, providing an optimal viewing experience on mobile devices, tablets, and desktops.
- **Custom Bootstrap Overrides**: Custom styles are applied to enhance Bootstrap's default look and feel, aligning with the application's branding.

## Getting Started

### Prerequisites

Ensure you have the following software installed on your development machine:

- **Node.js** (version 14.x or higher): Required to run the development server and manage dependencies.
- **npm** (Node Package Manager): Comes with Node.js and is used to install dependencies.

### Installation

1. **Clone the Repository**  
   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Masxshaqir/socialmediaclone.git
   cd socialmediaclone
    ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
### Configuration

Before running the application, update the configuration settings:
  1. Navigate to src/config.js.
  2. Update API_BASE_URL with your backend server URL.
  3.Add any other environment-specific configurations as needed. 
  
### Running the Development Server

To start the development server, execute:
  ```bash
  npm run dev
  ```
The application will be compiled and served locally at http://localhost:3000. Open this URL in your web browser to view the application.

### Screenshots

Here are some screenshots of the application to give you a better idea of its look and feel:
1. Rsponsive View:
![smartmockups_m0o6pyxz](https://github.com/user-attachments/assets/63772103-f4cc-4248-94b6-7a640f170ad4)
![smartmockups_m0o6vs2x](https://github.com/user-attachments/assets/1243ac6b-bd92-46f4-b46e-886bb4022673)

2. Login Page:

![alt text](login-1-1.png)

3. Signup Page:

![alt text](signup-1.png)

4. Home Page:

![alt text](home-1.png)

5. User Profile:

![alt text](profile-1.png)

6. Content Filtering:

![alt text](searchfilter.png)

7. Comments Section:

![alt text](comment-1.png)

8. Followers Page:

![alt text](following.png)

9. Voting Section:

![alt text](voting.png)

10. Responsive User Profile:

![alt text](responsive_profile-1.png)

