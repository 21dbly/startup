# To Due

## Specification Deliverable

### Elevator Pitch

We've all used to-do lists in our lives, whether it's on paper, on an app, or maybe just in our mind. In college one might use a to-do list to keep track of homework and when assignments are due, or make a list of reminders or chores to get done. This to-do list, unlike most others, lets you plan out your days while referencing a list of undated reminders and assignments with due dates. It lets you differentiate between when an assignment is due, and when you want to work on it.

### Design

![application design including 4 main html pages](21dbly/startup/specificationDesign.pdf)

### Key features

- Secure login
- Ability to create new tasks
- Ability to give tasks a due date and/or a do date
- Existing tasks are displayed in order
- Tasks are saved in a database
- Ability to create repeating tasks
- Ability to edit tasks
- Ability to attach information and images to tasks

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I will structure my application using HTML. 4 simple HTML pages: one to login, one to view dated tasks, one to view undated tasks, and one for editing and creating tasks
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **REACT** - Allowes the technologies to work together.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving existing tasks
  - making and editing tasks
  - ability to connect an email to a task using gmail api and outlook api
  - ability to add images
  - ability to connect to google calendar using google calendar api
- **DB/Login** - Store users and tasks in database. Register and login users. Credentials securely stored in database. Can't view/access tasks unless authenticated.
- **WebSocket** - ability to share a task with another user
