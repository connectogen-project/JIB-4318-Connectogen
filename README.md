# Connectogen

Connectogen is a platform designed to enhance collaboration among healthcare and biomedical researchers. Initially supported by Emory University's School of Medicine (SOM) leadership, the platform is currently used by researchers and students at Emory University, Georgia Tech, and Morehouse. Connectogen allows users to create profiles, post and join research projects, manage tasks, and engage in mentorship activities. The platform is essential for connecting researchers and facilitating impactful collaborations.

# Release Notes

## Technology

For the Connectogen rebuild, we have decided to go with the MERN tech stack which consists of MongoDB for databases, Express as a framework, React for frontend, and Node.js for backend. Not only is MERN a very popular tech stack that has plenty of documentation, but MERN fits our needs for the Connectogen rebuild.

## v0.1.0
We're excited to announce the first release of our project! This version introduces foundational features and improvements to enhance user experience and functionality. Below are the details of what's included in this release:

### Features Implemented
We’ve implemented a suite of authentication pages to provide users with a secure and intuitive way to manage their accounts. These pages are designed to be user-friendly while ensuring robust security practices. The following pages are now available:  

- **Login Page**:  
  Users can now log in to their accounts using their email and password. The page includes validation for empty fields and incorrect credentials, as well as a "Remember Me" option for convenience.  

- **Signup Page**:  
  New users can create an account by providing essential details such as name, email, and password. The form includes real-time validation for password strength and email format.  

- **Reset Password Page**:  
  Users who forget their passwords can request a reset link via email. This page integrates with our backend to securely handle password reset requests.  

- **Forgot Password Page**:  
  This page allows users to initiate the password reset process by entering their registered email address. A confirmation message is displayed once the request is successfully submitted.  

These pages are fully responsive and designed to work seamlessly across devices, ensuring a consistent experience for all users.

### Bug Fixes
We identified and resolved a critical issue where database items were not displaying correctly in the Mentorship Log Interaction forms. This bug caused inconsistencies in how data was presented, leading to potential confusion for users.  

- **What Was Fixed**:  
  - Database items are now correctly fetched and displayed in the forms.  
  - Improved the rendering logic to ensure that all fields populate as expected.  
  - Added error handling to prevent display issues when data is missing or incomplete.  

- **Impact**:  
  This fix ensures that users can view and interact with mentorship logs accurately, improving the overall usability of the feature.
  
### Known Issues
- **No Known Issues**:  
  At this time, there are no known issues to report.

## v0.0.0

### Features

Our team will implement two main features: the Mentorship Interaction List and Extended View.

The Mentorship Interaction List presents users with a user-friendly interface where they can view a history of logged mentorship interactions, each displaying relevant details such as interaction date, meeting title, mentor, and description. The list is designed for easy navigation and allows users to quickly access and review past mentorship sessions.

We chose to implement the Mentorship Interaction List and Extended View for our first semester Project Artifact Implementation because these two features would allow us to test our full range of development (database, frontend, backend, and server framework) while being relatively straightforward. These features should give us an idea of whether or not our proposed tech stack is the correct implementation approach for the project. 

### Bug Fixes

Not applicable.

### Known Issues

Not applicable.


# Developer Documentation

### Setting Up For The First Time
Please run the following command to ensure you've downloaded all the required dependencies:
```
npm install
``` 


To ensure backend and front end compatibility, run the following command:

```
npm install cors
```
To install the necessary libraries for UI implementations, run the following command:

```
npm install react-toastify swr framer-motion
```


### Build

To build all apps and packages, run the following command:

```
turbo build
```

### Develop

To develop all apps and packages, run the following command:

```
turbo dev
```

### Prerequisites

To develop locally:

- must have Node.js installed
- must have MongoDB installed and configuration of Docker Desktop

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Test again
Test 2
