# your-future-property
## Table of Contents:
* [Overview](#overview)
* [Technologies Used](#technologies-used)
* [Features](#features)
+ [Setup And Installation](#setup-and-installation)
* [Deployment](#deployment)

<a id="overview"></a>
## Overview
Future Estate is a comprehensive real estate platform designed to connect potential property buyers and renters with their next home. The application is structured into two main directories: api for backend services and client for frontend interface, ensuring a clear separation of concerns and scalability.

Link to live site: https://future-estate.onrender.com/

<a id="technologies-used"></a>
## Technologies Used
### Backend
The backend of Future Estate is built using Node.js and several supportive libraries to handle requests, authentication, and database operations:

+ Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
+ Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js that manages relationships between data, provides schema validation, and is used to translate between objects in code and their representation in MongoDB.
+ Bcryptjs: A library to hash passwords.
+ Cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by cookie names.
+ Dotenv: Loads environment variables from a .env file into process.env.
+ jsonwebtoken (JWT): Used for generating JWT tokens for authentication.
+ Nodemon: A utility that monitors for any changes in your source and automatically restarts your server.
### Frontend
The frontend is crafted using React and various modern tools and libraries to create a seamless user experience:

+ React: A JavaScript library for building user interfaces.
+ Redux Toolkit & React Redux: State management libraries that allow managing the state of the React app with efficiency.
+ Firebase: Utilized for user authentication and storage.
React Router Dom: Enables navigation among views of various components in a React Application, allowing the application to be single page.
+ Swiper: A powerful slider for easy implementation of responsive sliders.
+ Tailwind CSS: A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.
+ Vite: A modern frontend build tool that significantly improves the frontend development experience.

<a id="features"></a>
## Features
### Home Page: 
Displays various property listings and provides quick access to detailed views.
### About Page:
 Gives insights into Future Estate’s mission and vision.
### Profile:
 Allows users to update their profile, manage listings (create, edit, and delete), and upload profile pictures.
### Header: 
Integrates search functionalities along with navigation links to different parts of the application.
### Listing Item:
 Provides a detailed view of each property, including images, descriptions, features, and pricing.
### Authentication:
 Includes SignIn and SignUp functionalities with comprehensive error handling for a smooth user experience.

<a id="setup-and-installation"></a>
## Setup and Installation
To get Future Estate running locally, you'll need to follow these steps:

### Backend Setup
Navigate to the api directory and install dependencies:
```bash
cd api
npm install
```
Ensure you have a .env file in your api directory with all the required environment variables set (e.g., database URI, secret keys).

### Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd client
npm install
```
Start the development server:
```bash
npm run dev
```
Running the Application
In the root directory, you can start both frontend and backend using:
```bash
npm start
```
This will concurrently run both parts of the application if set up in package.json under scripts.

<a id="deployment"></a>
## Deployment
Make sure to build your frontend application before deployment:
```bash
cd client
npm run build
```
Configure your production environment to serve the build folder and redirect all requests to it to support client-side routing.