# Polling App

This application allows users to create and vote on polls. It is built using React and Redux for state management.

## Features

- **Create Polls**: Authenticated users can create new polls with two options.
- **Vote on Polls**: Users can vote on existing polls.
- **View Polls**: Users can view all polls and their results.
- **User Authentication**: Users must be authenticated to create or vote on polls.


### Database Description

The application uses a simple in-memory database to store users, questions, and answers. The data is structured as follows:

- **Users**: Each user has an ID, name, avatar URL, and a list of questions they have created and answers they have given.
- **Questions**: Each question has an ID, author, timestamp, and two options. Each option contains the text of the option and a list of users who have voted for that option.
- **Answers**: Each answer links a user to a question and records the option the user has chosen.

The data is managed using Redux for state management, with actions and reducers to handle creating questions, saving answers, and retrieving users and questions.

### Application Structure

The application is structured into several key components and utilizes various technologies:

- **React**: The core library for building the user interface. Components are used to create the different parts of the application, such as forms, buttons, and lists.
- **Redux**: A state management library used to manage the application's state. It helps in maintaining the state of users, questions, and answers across the application.
- **React Router**: A library used for routing in the application. It allows for navigation between different pages, such as the home page, create poll page, and poll details page.
- **Redux Thunk**: A middleware for Redux that allows for writing action creators that return a function instead of an action. It is used for handling asynchronous operations, such as API calls.
- **CSS**: Styling is done using CSS to make the application visually appealing and user-friendly.
- **Jest**: A testing framework used to write and run tests for the application, ensuring the code is reliable and bug-free.

The application is divided into the following main directories:

- **src/components**: Contains the React components used in the application.
- **src/redux/actions**: Contains the action creators for Redux.
- **src/redux/reducers**: Contains the reducers for Redux.
- **src/api**: Contains the API functions for interacting with the in-memory database.
- **src/utils**: Contains utility functions and data for the application.

## Running the Application

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/polling-app.git
    cd polling-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Running the App

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

### Running Tests

To run the tests, use the following command:


