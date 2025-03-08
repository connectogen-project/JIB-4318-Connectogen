# Connectogen

Connectogen is a platform designed to enhance collaboration among healthcare and biomedical researchers. Initially supported by Emory University's School of Medicine (SOM) leadership, the platform is currently used by researchers and students at Emory University, Georgia Tech, and Morehouse. Connectogen allows users to create profiles, post and join research projects, manage tasks, and engage in mentorship activities. The platform is essential for connecting researchers and facilitating impactful collaborations.

# Release Notes

## Technology

For the Connectogen rebuild, we have decided to go with the MERN tech stack which consists of MongoDB for databases, Express as a framework, React for frontend, and Node.js for backend. Not only is MERN a very popular tech stack that has plenty of documentation, but MERN fits our needs for the Connectogen rebuild.

## v0.3.0  
We’re excited to release version **0.3.0** of our mentorship platform! This update enhances user interactions with new features, including mentor/mentee pairing, interaction logging, and improved connection request management. Additionally, we’ve made significant **frontend reworks**, backend improvements, and addressed some usability issues.  

### Features Implemented  
We’ve introduced new functionalities to streamline mentorship tracking and communication. These enhancements make it easier for users to manage their mentorship connections and log their progress.  

- **Mentor/Mentee Pairing**:  
  Users can now establish formal mentorship connections through the **Connectogen** system.  
  - **Backend Enhancements**:  
    - Added `mentorConnectogen` and `menteeConnectogen` fields to the database.  
    - Implemented a request system for users to initiate mentorship connections.  
  - **Frontend Features**:  
    - Users can request mentorship through a structured UI.  
    - Confirmation message displayed upon successful connection.  
    - **Updated Mentor/Mentee Pairings**: Once paired, mentors and mentees are now properly displayed in their respective sections.  

- **Interaction Logging & Management**:  
  Users can now **log, edit, and delete** their mentorship interactions, providing a detailed record of their progress.  
  - **Backend Enhancements**:  
    - Created API endpoints for logging, editing, and deleting interaction records.  
    - Implemented authentication to ensure secure logging per user.  
  - **Frontend Features**:  
    - New **Edit Log** component allows users to modify existing interaction logs.  
    - Added a **Delete Log** button for removing outdated or irrelevant logs.  
    - Improved **GUI for logging mentor interactions**.  

- **Search & Filter Interaction Logs**:  
  Users can now search through their logs to quickly find specific information.  
  - **Backend Enhancements**:  
    - Optimized queries for efficient log retrieval.  
  - **Frontend Features**:  
    - Integrated **dynamic search functionality** within the interaction log interface.  
    - Fixed scrollbar issues for better navigation.  

- **Connection Request Management**:  
  Users can now review and respond to incoming mentorship requests.  
  - **Backend Enhancements**:  
    - Fully integrated **endpoints to accept or decline mentorship requests**.  
  - **Frontend Features**:  
    - **Functioning Accept/Deny Requests**: Users can now successfully accept or decline mentorship requests.  
    - Improved **UI for connection request management**.  

### Technical Improvements  
To enhance performance and security, we introduced several backend and frontend optimizations:  
- **Frontend Reworks**: Improved **UI for better user experience** across mentorship pairing, connection requests, and interaction logging.  
- **Authentication Update**: Migrated from **JWT to cookie-based authentication**.  
- **Data Storage Enhancements**: Institution and degree data are now stored in the **database for improved onboarding**.  
- **Logging & Monitoring**: Expanded **system monitoring for stability tracking**.  

### Known Issues  
- **Incorrect Timestamps in Logs**: Some logs display **incorrect dates depending on the viewport**.  
- **Non-Functional Buttons**: Certain buttons remain **unresponsive in specific scenarios**. These will be addressed in future updates.  

This release significantly enhances mentorship tracking, authentication security, and request management while improving the overall UI experience. Stay tuned for upcoming fixes and refinements! 🚀  

## v0.2.0  
We're excited to introduce version **0.2.0** of our mentorship platform! This update brings foundational features that enhance user interactions, including browsing mentors and mentees, filtering and sorting capabilities, sending connection requests, and real-time notifications.  

### Features Implemented  
We’ve added core functionalities to help users seamlessly discover and connect with mentors and mentees. These features ensure a structured and intuitive mentorship experience.  

- **Browse Mentors and Mentees**:  
  Users can now explore available mentors and mentees through a structured list with sorting and filtering options.  
  - **Backend Enhancements**:  
    - Updated the `Users` schema to include `isMentor` and `isMentee` flags.  
    - Integrated **dynamic search, pagination, filtering, and sorting**.  
    - Added **unit tests** for filtering and sorting functionalities.  
  - **Frontend Features**:  
    - Created **Mentors List** with fields: Name, Institution, Affiliation, Field, Subspecialty, Position.  
    - Designed **Mentees List** using ShadCN Data Table.  
    - Implemented a **Sidebar Component** for sorting and filtering.  
    - Developed a **Mentorship Page** with tabs for easy navigation.  

- **Filter and Sort Mentors/Mentees**:  
  Users can refine their search using advanced sorting and filtering options.  
  - **Backend Enhancements**:  
    - `/api/users` now supports **sorting and filtering** based on user preferences.  
  - **Frontend Features**:  
    - Integrated **dynamic search functionality** from `logs-list.tsx`.  
    - Arranged all components for a streamlined user experience.  

- **Send Connection Requests**:  
  Users can now send and manage mentorship requests directly within the platform.  
  - **Backend Enhancements**:  
    - Created `ConnectionRequests` schema to store connection requests.  
  - **Frontend Features**:  
    - Added **"Send Connection Request"** button next to each mentor/mentee entry.  
    - Implemented a **Pop-up Form** for users to include a personalized message.  
    - Designed an **Expanded Profile View** for more user details.  

- **Notifications for Connection Requests and Profile Updates**:  
  Users will now receive real-time notifications for connection requests and profile updates.  
  - **Backend Enhancements**:  
    - Created `Notifications` schema for tracking alerts.  
    - Integrated **WebSockets** for real-time updates.  
    - Implemented a **Notification Cleanup Task** for expired/read notifications.  
  - **Frontend Features**:  
    - Added a **Notifications Icon** in the navbar.  
    - Designed a **Notifications Dropdown** with links and non-functional Accept/Deny buttons.  

### Technical Improvements  
To enhance performance and reliability, we introduced several backend and frontend optimizations:  
- **Documented all API endpoints** for ease of use.  
- Implemented **robust error handling** for all new functionalities.  
- Added **logging and monitoring** to track system stability.  
- **Secured all endpoints** with authentication to protect user data.  

### Known Issues  
- Some buttons may be non-functional, and are placeholders for future developments. 
This release lays the foundation for an interactive and engaging mentorship experience. Stay tuned for more updates in the next version! 🚀  


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
