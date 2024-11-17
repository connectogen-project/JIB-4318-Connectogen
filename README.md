# Connectogen

Connectogen is a platform designed to enhance collaboration among healthcare and biomedical researchers. Initially supported by Emory University's School of Medicine (SOM) leadership, the platform is currently used by researchers and students at Emory University, Georgia Tech, and Morehouse. Connectogen allows users to create profiles, post and join research projects, manage tasks, and engage in mentorship activities. The platform is essential for connecting researchers and facilitating impactful collaborations.

# Release Notes

## Technology

For the Connectogen rebuild, we have decided to go with the MERN tech stack which consists of MongoDB for databases, Express as a framework, React for frontend, and Node.js for backend. Not only is MERN a very popular tech stack that has plenty of documentation, but MERN fits our needs for the Connectogen rebuild.

## Features

Our team will implement two main features: the Mentorship Interaction List and Mentorship Interaction Creation.

The Mentorship Interaction List presents users with a user-friendly interface where they can view a history of logged mentorship interactions, each displaying relevant details such as interaction date, meeting title, mentor, and topics discussed. The list is designed for easy navigation and allows users to quickly access and review past mentorship sessions.
The Mentorship Interaction Creation feature enables users to log new mentorship interactions via a form-based interface. Users can input text details, including the interaction date, meeting title, mentor, and topics discussed. Upon submission, the interaction data is stored and automatically added to the Mentorship Interaction List.
These features require backend functionality, including database integration for data storage and retrieval, as well as efficient querying mechanisms to support fast loading and real-time updates. The system architecture will focus on a seamless user experience, with data consistently synchronized between the front end and back end.

We chose to implement the Mentorship Interaction List and Mentorship Interaction Creation for our first semester Project Artifact Implementation because these two features would allow us to test our full range of development (database, frontend, backend, and server framework) while being relatively straightforward. These features should give us an idea of whether or not our proposed tech stack is the correct implementation approach for the project. 

## v0.0.0

### Bug Fixes

Not applicable.

### Known Issues

Not applicable.

# Developer Documentation

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
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
