# DoDue

## Specification Deliverable

### Elevator Pitch

We've all used to-do lists in our lives, whether it's on paper, on an app, or maybe just in our mind. In college one might use a to-do list to keep track of homework and when assignments are due, or make a list of reminders or chores to get done. This to-do list, unlike most others, lets you plan out your days while referencing a list of undated reminders and assignments with due dates. It lets you differentiate between when an assignment is due, and when you want to work on it.

### Design

![application design including 4 main html pages](specificationDesign.pdf)

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


## HTML deliverable

For this deliverable I built out the structure of my application using HTML.

- [x] **HTML pages** - Four HTML pages that represent the ability to login, the dated to-do list ("Today"), and the undated to-do list ("To Do") and also a page for creating a new task, or viewing the details of a task.
- [x] **Links** - The login page links to the today page from the login button. All the other pages have links to all pages. There is also a button that leads to the create task page.
- [x] **Text** - The lists are made up of text.
- [X] **Images** - There is an image on the login page to make it more interesting. I can get a random image from a 3rd party service if I don't find a service that's more applicable.
- [x] **DB/Login** - Input box and submit button for login and creating a new task. The login info as well as all the lists are stored in a database.
- [x] **WebSocket** - A list can be editted on a different device and show up in realtime through websockets. I may also add a way to share tasks with others, but I'm not sure about that idea yet, so for now this is enough I think.


## CSS deliverable

For this deliverable I properly styled the application into its current appearance.

- [x] **Header, footer, and main content body** - Yep, I've got those and they work well.
- [x] **Navigation elements** - The menu links in the top are white to look better with the background, and they are responsive to resizing.
- [x] **Responsive to window resizing** - My website looks great on all window sizes and devices. The menu items shorten to only the necessary parts when the window is thinner, and the main to-do list section only shows one side when the window is small. Once I add javascript I will find a way to switch between which side of the to-do list is visible.
- [x] **Application elements** - The website looks good and has to-do lists. It also has buttons in headers to create new tasks, and the buttons only appear when you hover over the heading.
- [x] **Application text content** - Consistent and simple font and color scheme throughout the website.
- [X] **Application images** - Styled the image.


## React deliverable

For this deliverable I used JavaScript and React so that the application works for a single user. I also added placeholders for future technology.

- [x] **Bundled and transpiled** - done finally!
- [x] **Components** - Login, Lists, UndatedList, DatedList, EditTask, NewTask, NewTaskButton, Task, and more are all working components.
  - [x] **login** - This one is a little wonky right now but I think it works the same as the startup react. It's just weird without databases. The important part is it logs you in when you enter a username and denies you access without that.
  - [x] **database** - Both lists and the username are stored in localStorage in preparation for storing them in a database.
  - [x] **WebSocket** - I will use websockets to update the lists automatically if a list or task was changed on a different device.
  - [x] **application logic** - I worked hard to make it possible to add tasks to lists and then edit or delete those tasks. Tasks can be edited by clicking on them. The dated task is sorted and grouped by dates. Adding or removing the date by editing it will cause the task to switch to the other list. Changing the date will cause it to reorder itself.
- [x] **Router** - Routing between login, list view, newTask, and editTask components.
- [x] **Hooks** - I used `UseState` to track changes in task data while editing or creating. I also used useEffect to retrieve the list data from LocalStorage.

## Service deliverable

For this deliverable I added backend endpoints to get lists, get task info, add a task to a list, edit a task, and delete a task

- [x] **Node.js/Express HTTP service** - done!
- [x] **Static middleware for frontend** - done!
- [X] **Calls to third party endpoints** - get's a random image for the login page using the same api as simon
- [x] **Backend service endpoints** - Placeholders for login that stores the current user on the server. Endpoints for getting lists and adding and editing tasks.
- [x] **Frontend calls service endpoints** - I did this using the fetch function.

## DB/Login deliverable

For this deliverable I store and validate user information using the database, and I store each user list seperately in the database

- [x] **MongoDB Atlas database created** - done!
- [x] **Stores data in MongoDB** - done! Stores list data and user login data
- [x] **User registration** - Creates a new account in the database.
- [x] **existing user** - Stores lists under the correct user if the user exists.
- [x] **Use MongoDB to store credentials** - Stores both user and their lists/tasks.
- [X] **Restricts functionality** - You cannot access any lists or make any tasks until you have logged in.

## WebSocket deliverable

For this deliverable I used webSocket to update the list in realtime if you're editing the list from multiple devices.

- [x] **Backend listens for WebSocket connection** - done!
- [x] **Frontend makes WebSocket connection** - done!
- [X] **Data sent over WebSocket connection** - after editing or creating a task, the client websocket sends a message that goes to all other connections from that same user telling lists to reload
- [X] **WebSocket data displayed** - As the lists reload a small message appears saying it's reloading. A message also appears when the websocket connects.




## Things to be added in the future
- [ ] unify and betterify error handling
- [ ] include labels in newtask form? (for accessability and stuff)  
- [ ] make tasks look nicer (css)
- [ ] make login image scale better at different sizes
- [ ] reformat dates and times to be better (Mon, Oct 1 or something)
- [ ] make it nicer for phones?
- [ ] ability to check off tasks instead of just deleting
- [ ] ability to move tasks by dragging
- [ ] repeating tasks
- [ ] due date vs do date
- [ ] rerouting to login when not logged in
- [ ] figure out how url query things work so I can include the id in the url for editing tasks?


