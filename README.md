## Expenify App,  ##

**I use this to as a template when creating and re-factoring React Applications** 

- **Modules of note we installed through out the project**, this is not the complete list and some may only been used for a little while.
- I just wanted a place to store them for easy reference
 
	 + **Yarn**
	 + **Babel Core, Cli, Loader, Preset-Env, Reset-React, Transform Class Properties**
	 + **Webpack Core, Cli, Dev-Server, css-loader**
	 + **Live Server -- but Webpack Dev-Server Preferred**
	 + **Node-Sass**
	 + **Normalize.css**
	 + **React-dom, Modal**
	 + **React-dates, react-redux, react-router,react-router-dom**
	 + **redux-mock-store**
	 + **style-loader**
	 + **Validator**
	 + **uuid** 
	 + **babel-plugin-transform-object-rest-spread**
	 + **numeral**
	 + **express**
	 + **sass-loader**
	 + **redux**
	 + **redux-thunk**
	 + **firebase**
	 + **moment**
	 + **node-sass**  
	 + **yarn add history**
	 + **babel polyfill** 

- Development Dependencies

	 + **enzyme** 
	 +  **enzyme-adapter-react-16**
	 +  **enzyme-to-json**
	 +  **jest**
	 +  **live-server**
	 +  **raf"**
	 +  **react-test-renderer**
	 +  **webpack-dev-server**
	 +  

- Initial application created using defaults of **React Boilerplate**. I copied the ReadMe and put it on the bottom of this README

- install **npm's uuid** for unique numbers until accessing database, this can be used to create unique ids

- install the **Object spead operator plugin** for babel, similar to array spread operator expect we have to install plugin because it is not part of es6 yet as is the **array spread operator** 

 + yarn add babel-plugin-transform-object-rest-spread
 + add to .babelrc 
 
```
{
  "presets":["env","react"],
  "plugins": ["transform-class-properties","transform-object-rest-spread"]
}
```

- **Object spread Operator**, similar to array spread operator, but more 
useful

```
//-------------------
// Test Object Spread Operator, which need babel plugin,
// more used than array spread operator
//-------------------

const user = {
    name: 'jen',
    age: 24
};


console.log({

...user

});


//------- Add new element to the array
console.log({

    ...user,
    location: "Stafford va"

});

//---- Override element value, it needs to
//---- come  after the spread, look at other example

console.log({

    ...user,
    location: "Stafford va",
    age: 40

});


//---- This example we add age before spread so spread object overright
//---- the age: 40 and it's back as ordinal
console.log({
    age: 40,
    ...user,
    location: "Stafford va"

});

```


**HIGHER ORDER COMPONENTS (HOC)**

- Higher Order Component (HOC) - A component (HOC) that renders another component
- HOC created to Reuse Code
- Render hijacking
- Prop manipulation
- Abstract state


**Example:**

```markdown

import React from 'react';
import ReactDOM from 'react-dom';


//---------------------------------------
// Standard React Component, not HOC
//---------------------------------------

const Info = (props) => (

   <div>
       <h1>Info</h1>
       <p>The info is {props.info}</p>
   </div>


);


//-----------------------------------------
// Standard function, not react component
// Since we pass in a Component we need to
// follow Uppercase first Letter
//-----------------------------------------

const withAdminWarning = (WrappedComponent) => {

    //--- This is where we are returning HOC
    //--- We also need to pass in any props to
    //--- acomplish this we will use the object spread operator
    return (props) => (
      <div>
          <p>This is private info, please don't share</p>
          
          <WrappedComponent {...props} />
      </div>
    );

};

//----------------------------------------------
// We get back a higher order component (HOC)
//----------------------------------------------
const AdminInfo = withAdminWarning(Info);




ReactDOM.render(<AdminInfo info="This are the details" />,document.getElementById('app'));

```

- **Install Redux Chrome Extension** 
 + After install there is just a little change we have to make
 + View the [Github](https://github.com/zalmoxisus/redux-devtools-extension)
 
 ```markdown
 const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
```

#### Testing ####

- **Install Jest** for unit testing
 + **yarn add jest**
 + Create a package.json script called **test** with the command **jest**
 ```markdown
  "scripts": {
    "serve-not-used": "live-server public/",
    "build-babel-not-used": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch",
    "build-not-used": " webpack --watch",
    "build": "webpack --mode development",
    "dev-server": "webpack-dev-server  --mode development",
    "test": "jest"
  },

```

- Install react-test-renderer to help create snapshots
- Below is how to test a component before the use of Enzyme
```markdown
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', () => {
     const renderer = new ReactShallowRenderer();

    renderer.render(<Header />)
    expect(renderer.getRenderOutput()).toMatchSnapshot();

});

```

**Install Enzyme** 

There are a couple of things we have to do to install enzyme to work with React 16
- yarn add enzyme enzyme-adapter-react-16 raf --dev
 + **raf** polyfill request animation frame 
 
- To get Enzyme setup we will create a single file called **setupTest.js** and add:

```markdown

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
   adapter: new Adapter()
});

``` 
- to get more information go to Airbnb Enzyme page.
- Now we have to configure Jest to work with Enzyme. [Facebook Jest](https://facebook.github.io/jest/docs/en/configuration.html) The idea is to have **Jest** run the **Enyme** setup file before running. 
- We will setup a  json file for the jest setup in the root of the project called **jest.config.json**
```markdown
{
  "setupFiles": [
    "raf/polyfill",
    "<rootDir>/src/tests/setupTests.js"
  ]

}

```
- We now have to update the package.json file and change the test script with ***"test": "jest --config=jest.config.json"***
- Enzyme snapshot add a lot of Enzyme stuff that we really don't want so we want to install a utility wrapper that helps make it more like the React snapshot
- **yarn add enzyme-to-json --dev** 
- Example, toJSON will take enzyme snapshot and return a snapshot with just our component 
```  expect(toJSON(wrapper)).toMatchSnapshot();```

- We can make it so we don't have to add **toJSON(wrapper) every time by adding some configuration in the  **jest.config.json** we created
```markdown
{
  "setupFiles": [
    "raf/polyfill",
    "<rootDir>/src/tests/setupTests.js"
   ],

  "snapshotSerializers": [
    "enzyme-to-json/serializer"
    ]
}

```
- Now all we have to do is run a test like below 

```markdown
import React from 'react';
import {shallow} from  'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});

```




#### Preparing App for Production ####

- Modified Webpack to export configuration as a function [Webpack Configuration Types] (https://webpack.js.org/configuration/configuration-types/) this allows for determining if we are using development or production 
```markdown

    "build:dev": "webpack --mode development --env development",
    "build:prod": "webpack --mode production --env production",
```

- We can tell webpack to break out CSS into its own files using the [Text Extract Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
 + **yarn add extract-text-webpack-plugin**
 
- We now want to install **express**
 + **yarn add express** 

- create a server/server.js with 

```
const express = require('express');
const path = require('path');

//------------------------------
// Create path to application
// -----------------------------
const publicPath = path.join(__dirname,'..','public');

//-----------------------
// Create Express object
//-----------------------
const app = express();

//------------------------------------------
// Tell express to use this path for docroot
//-------------------------------------------
 app.use( express.static(publicPath) );


//--------------------------------
// React is using a software router
// and we need to tell express to
// intercept and files/paths not found
// and send to index.html and let React
// handle it
//---------------------------------------
 app.get('*',(req, res) =>{
  res.sendFile(path.join(publicPath, 'index.html'));
 });


//---------------------
// Listen on port
//---------------------
app.listen(3000, () =>{
   console.log("Server is up and running");
   console.log("Document root is ", publicPath);
});


```

- Install heroku cli, just google heroku cli.
 + to test just type in **heroku --version**
 + login from the terminal **heroku login**
- Once authenticated we can create an app
 + **heroku create <name of app>** 
 + **heroku create my-expenses-app** This will also create a new git remote called **heroku**
 + run git remote you will see 

 ```markdown
~/git/react/expensify-app$ git remote
heroku
origin
raymond@
```
- We will use git remote to deploy to Heroku 
- To run our app in Heroku we have to make some changes like telling Heroku how to start up the app
- **Heroku will look in the package.json looking for a **start** script we have to create
```markdown

start: "node server/server.js" 
```
- We also need to create a couple of scripts that Heroku will look for in the package.json file 
 + heroku-postbuild - this is where we will get heroku to run webpack
 + heroku-prebuild - we will not take advantage of this
 
```markdown

  "scripts": {
    "serve-not-used": "live-server public/",
    "build-babel-not-used": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch",
    "build-not-used": " webpack --watch",
    "build:dev": "webpack --mode development --env development",
    "build:prod": "webpack --mode production --env production",
    "dev-server": "webpack-dev-server  --mode development",
    "start": "node server/server.js",
    "heroku-postbuild": "yarn run build:prod",
    "test": "jest"
  },

```
- we also want to add a couple of files to the .gitignore file
 + public/bundle.js
 + public/bundle.js.map
 + public/styles.css
 + public.style.css.map
 
- Now we have to push git to Heroku
  + git push heroku master

- we will now get a url 
 +  https://my-expenses-app.herokuapp.com/ 
 + this is our app url on heruko  
 + we can look at logs **heruko logs** this is useful for debugging
  

- We are now going to break-up package.json dependencies into **production** and **development**
- If the node_modules folder is not there we can type **yarn install --production** and this will only install production dependencies.


- Add **Numeral JS** [Numeral JS] (http://numeraljs.com/)
 + **yarn add numeral**   
  




###Firebase Google Database###
- [firebase.google.com](firebase.google.com)
- yarn add firebase@4.2.0 ``I added the laested  5.x but it was throwing errors on windows 7, but worked fine on Mac High Sierra``  

- Below is the basic setup of Firebase
```markdown
import * as firebase from 'firebase';



const config = {
    apiKey: "#####",
    authDomain: "expense-tracker-b9209.firebaseapp.com",
    databaseURL: "https://expense-tracker-b9209.firebaseio.com",
    projectId: "expense-tracker-b9209",
    storageBucket: "expense-tracker-b9209.appspot.com",
    messagingSenderId: "####"
};

firebase.initializeApp(config);

const database = firebase().database();


database().ref().set({
    name: 'Johnny Quest',
    age: 65,
    isSingle: false,
    location: {
        city: 'Washington',
        state: 'DC',
        country: 'United States'

    }

});

```

- **database().ref()** mean the reference to a certain part of the database **similiar to tables** is a sql database.
 + with **ref()** being empty mean the root of the firebase database
- **.set() can take an **object** or just a **simple string** **.set("hi")** or **.set({name:raymond,age:45})**
 + **.set() will over write data not update it. To update the data you need to get a ref to the data.
 
 **Example**
```
 import * as firebase from 'firebase';


firebase.initializeApp(config);
const database = firebase().database();
database().ref().set({
    name: 'Johnny Quest',
    age: 65,
    isSingle: false,
    location: {
        city: 'Washington',
        state: 'DC',
        country: 'United States'

});

database().ref().set({
 age:41
});
 
```
- **The above will remove the entire object and we left with just age**

- **To update just age we have to get a reference, look at below**

```
database().ref(age).set(41);
```
  
- **We can get update other elements like below**

```
database.ref('age').set(41);

database.ref('location/city').set('stafford');
database.ref('location/state').set('VA');
```

#### ES6 Promises ####
- The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
- We will usually used Promises not create them.

- Example of a Promises

```
const promise = new Promise( (resolve, reject) =>{
    setTimeout( ()=> {
        resolve('This is my resolved data');

    },5000)
});

const promise2 = new Promise( (resolve, reject) =>{
    setTimeout( ()=> {
        resolve( {
            name: 'Raymond',
            age: 22,
            shoesize: 12
        });

    },5000)
});


console.log('before');
promise.then((data) => {
    console.log(data);
});
console.log('after');

```


- Exmaple of Update 

```

database.ref().update({
   job: 'Manager',
   'location/city': 'Boston'
}).then( ()=>{
    console.log("Update Worked");
}).catch( (error) =>{
    console.log("Dude, we have an error");

});

```

- Firebase doesn't support list based objects, to get around this will will use **push**
```
database.ref().push({
   tite: "my title",
   body: "My body"
})

```


- **Install Redux-Thunk** which will allow redux to dispatch function not just objects. By default Redux can only dispatch objects. But if want to use Firebase we want to dispatch functions.


- Install **history** this is needed to redirect to different pages that are not using react components. It we are just using components there is no need for this.


<br/><br/><br/>

- Install **babel-polyfill** to support older browers.

-------

## React Boiler Plate ##


### Use this for new React Projects ###


**Packages**

- **Yarn**
- **Babel Core, Cli, Loader, Preset-Env, Reset-React, Transform Class Properties**
- **Webpack Core, Cli, Dev-Server, css-loader**
- **Live Server -- but Webpack Dev-Server Preferred**
- **Node-Sass**
- **Normalize.css**
- **React Dom, Modal**
- **Validator**


**Scripts**

- **"serve-not-used":** "live-server public/",
- **"build-babel-not-used":** "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch",
- **"build-not-used":** "webpack --watch",
- **"build":** "webpack --mode development",
- **"dev-server":** "webpack-dev-server  --mode development"



**Using to create new project and put new project in Git**

- Download 
- Rename Directory name from **React-Boilerpage** to your project
- Remove **.git** directory inside project 
- Inside run **git init**
- After run **git remote add origin <name of git project"**  
- Then run 
 + **git add.**  
 + **git commint -m "My new project"**
 + **git push --set-upstream origin master**
- Project is now in git


**Run for the first time**

- Run **yarn install** - to install all Node dependencies
 + If you like **NPM** you can use that instead
- Change **name** varible in **package.json**
- Change **title* in **public/index.html**
- Run **yarn run dev-server** This will start the webpack dev server along with converting ES6 to ES6 and running SASS
- Goto localhost:8080 to see changes, anytime you add something webpack will run 



**Notes**

- The only script you need to run is the **yarn run dev-server** The others are there if you want.
yar






 



