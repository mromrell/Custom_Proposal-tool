# The seed for the Address Book project

### Running the app during development

* Make sure that NodeJS is installed
* From the CLI, in the project directory, run `npm install`
    * Choose option four when given the prompt "Unable to find a suitable version for angular, please choose one:"

*) Inside PyCharm, set up a NodeJS configuration
    * Add the Node.js server at server/server.js to the "JavaScript file" field.
    * Add an environment variable to your Node.js configuration with name "MONGOLAB_URI". The value is the standard URI from your mongolab.com project page under "To connect using a driver via the standard URI." It looks like this:
        mongodb://<dbuser>:<dbpassword>@ds033632.mongolab.com:62234/my_project
    * In the MONGOLAB_URI, replace dbuser and dbpassword with your mongolab user password.

Then navigate your browser to `http://localhost:<port>/` to see the app running in
your browser.

### Running the app in production (Heroku)

* Create a Heroku account
* Create a MongoLab account
** In the server/server.js, replace <dbuser> and <dbpassword> with the MongoLab username and password, respectively
* Create a Heroku app from the CLI (under the project directory)
** heroku create [NAME]
* git push heroku master

This project is an application skeleton for your address book Web app.  It uses the Bower package manager to handle front-end
dependencies, Node's package manager to handle back-end dependencies, with AngularJS/NodeJS handling app logic.

The seed app shows how to wire together Angular client-side components with Express on the server.
It also illustrates writing angular partials/views with the Jade templating library.

_Note: Although Jade supports interpolation, you should be doing that mostly on the client. Mixing
server and browser templating will complicate your app. Instead, use Jade as a syntactic sugar for
HTML, and let AngularJS take care of interpolation on the browser side._

## How to use address-book-seed

- Create an empty repository at GitHub (maybe address-book)
- Open up your terminal
- Run the following commands

```
cd /tmp # make sure this is a directory that exists
git clone --bare git@github.com:DojoDevCamp/address-book-seed.git
cd address-book-seed.git
git push --mirror git@github.com:[GitHubUsername]/address-book.git # this will be different for you
cd ..
rm -rf address-book-seed.git
```

## Directory Layout
    
    developer/                  --> Should eventually house testing scripts/framework (e.g. Karma)
        .gitkeep                --> Allows this folder to be pushed to Git
    public/
        css/
            app.css             --> Project specific styles loaded after bootstrap
        img/                    --> Will eventually hold static images
            .gitkeep            --> Allows this folder to be pushed to Git
        js/
            app.js              --> AngularJS application configuration
            constants.js        --> AngularJS constant definitions
            controllers.js      --> AngularJS controller definitions
            directives.js       --> AngularJS directive definitions
            filters.js          --> AngularJS filter definitions
            services.js         --> AngularJS service definitions
        partials/
            addContact.jade     --> Exposes form for adding a contact
            contacts.jade       --> Shows all the current contacts, not filtered by the current user logged in
            index.jade          --> Shows the home page, can act as a dashboard for a logged in user
            login.jade          --> Exposes a login page
            register.jade       --> Exposes a form to create a new contact
        layout.jade             --> This is the core layout for pages in this application
    server/
        controllers/
            account.js          --> Handles business logic for logging in, creating new accounts, etc.
            contact.js          --> Handles business logic for contacts
            index.js            --> Renders the various pages
        models/
            account.js          --> Account model that is persisted to MongoLab
            contact.js          --> Contact model that is persisted to MongoLab
        routes/
            account.js          --> All routes for account-related REST calls
            contact.js          --> All routes for contact-related REST calls
            index.js            --> All other routes are defined here
        services/
            auth.js             --> Handles making sure a person is authenticated before a specific call is made
            passport.js         --> Plugin that handles authentication against MongoLab - it can also handle social media authentication
        server.js               --> NodeJS express framework initialized here with configuration, creates and starts the Web server
    .bowerrc                    --> Configures bower to install components under public/lib
    .gitignore                  --> Artifacts we do not want in our git repositories, switched based on where we are pushing changes
    .slugignore                 --> Will tell Heroku what files/folders to ignore when deploying
    bower.json                  --> Declares front-end dependencies, like angular and bootstrap
    package.json                --> Declares dev and prod dependencies, for prod it will install bower
    Procfile                    --> File required by Heroku to launch your application
    README.md                   --> This file


## Contact

For more information on AngularJS please check out http://angularjs.org/
For more on Express and Jade, http://expressjs.com/ and http://jade-lang.com/ are
your friends.
If all else fails, please contact one of the instructors or your mentor
