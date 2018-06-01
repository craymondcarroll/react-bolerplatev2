import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import {login,logout} from "./actions/auth";
import {Provider} from 'react-redux';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage'

const expStore = configureStore();



expStore.subscribe( () =>{
    const state = expStore.getState();

});

let hasRendered = false;
const renderApp = () => {

    if(!hasRendered) {
        ReactDOM.render(jsx,document.getElementById('app'));
        hasRendered = true;
    }

};



const jsx = (
    <Provider store={expStore}>
        <AppRouter />
    </Provider>
);


    //----------------------------------
    // Let user know we are trying to
    // get data
    //----------------------------------
    ReactDOM.render(<LoadingPage />,document.getElementById('app'));



    //-----------------------------------
    // Create Firebase Auth callback to
    // when a user logs in or logs out
    //-----------------------------------

   firebase.auth().onAuthStateChanged( (user)=>{

        if(user) {

            expStore.dispatch(login(user.uid));
            console.log("uid",user.uid);

            renderApp();

            if (history.location.pathname === '/' ){
                history.push("/dashboard");
            }


        }else {
            expStore.dispatch(logout({}))
            renderApp();
            history.push('/');
        }

    });



