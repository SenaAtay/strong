# Application Architecture

## Decision I: SvelteKit for Front-end Framework

Summary
In order to create our front-end, we decided on the use of SvelteKit as our front-end framework.

### Problem

- How to route to pages?
- How to get and display info from the back-end ? How to make it reactive to changes?
- How do we keep this simple and organized ?

### Constraints

We all know HTML, CSS, and JS and one of our member knows React and Svelte

### Options

React:

- Pros: Large community | Can do anything front-end | Makes hard to fail
- Cons: JSX | Import libraries for basic use cases | Syntax can get complex
  Svelte:
- Pros: Very similar to HTML,CSS,JS | Small learning curve | Simple syntax
- Cons: Less documentation |
  Rationale
  We chose Svelte over React because it has the same functionality as React but it is less verbose, easier to learn, and resembles regular HTML, CSS, JS. This will allow us to more quickly learn, iterate, and develop than using React

## Decision II: Express for Back-end

Summary
In order to have communication between front-end and database, we decided on Express.JS

### Problem

How do we create a rest API ?

### Constraints

Want to use the same language for the entire project

### Options

- Fastify: promises faster performance than Express with low overhead
- Express: Does it’s job, is ubiquitous with Node, and is well document on youtube and text

### Rationale

We chose Express over Fastify because there is more documentation on Express online if we run into problems and Fastify seems to be more so if you're looking for better performance and Express already has great performance speeds.
Decision III: Postgresql for Database
Summary
In order to store data persistently, we decided to use PostgreSQL.

### Problem

- How to store user data so we can use it to display UI ?
- What database is compatible with JS ?

### Constraints

Want to use same language for entire project

### Options

- MongoDB: Lots of online videos | Already deployed to cloud |
- PostgreSQL: Lots of documentation | Have to deploy to cloud | Uses SQL |

### Rationale

We decided to use PostgreSQL because we are all familiar with SQL and it has a lot of documentation and community

## Decision IV: Heroku for Deployment

### Summary

In order to provide a complete version of our project to our client, we have decided to use Heroku for deployment

### Problem

As we get started on the project, it is necessary to deploy it to help visualize and debug our progress. Additionally, the client is able to give us feedback we can use as we continue the project. Deployment will enable us to complete a walking skeleton that will give us a barebones representation of our project.

### Constraints

A useful deployment service would be one that is free to use without limiting essential features. Essentially, we want to be able to effectively deploy our site while being able to change the site whenever. There should be no limit based on commits or deployments of our site because we are likely to utilize it throughout the semester. Our site should also be able to support hosting for a backend server or database.

### Options

- Netlify: Allows users to “build, develop, and scale modern web projects”. Netlify is optimal for static sites as it is feature packed without significant limitations. However, since our project requires us to make api calls, several of our pages are dynamic. Therefore, netlify probably is not the best option.
- Heroku: Similar to Netlify it is a reliable deployment service which supports dynamic web features. Heroku is simple, scalable, and secure making it a viable option for deployment of our project.
- AWS: Powerful hosting service for larger scale projects. Companies such as Netflix, Samsung, and Unilever use AWS for their services. Although it is powerful, AWS is not the most intuitive at times.

### Rationale

For our project, we have decided to use Heroku for our application. Because our project relies on pages that are dynamic, we cannot use Netlify. Since our project is not large, AWS is probably not the most optimal solution. Heroku is fast and easy to deploy overall.
