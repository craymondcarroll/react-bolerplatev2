import React from 'react'
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import Header from '../components/Header'



/**
 *
 * The props passed in from connect are all the properties from appRouter PrivateRoute
 * which are the need props from Route which we plan to return plus the state from Redux Auth
 *
 * If we pass in props without destructuring it and use a console.log(props) you will see all of these properties
 *
 *At the botton of this page I put the console.log(props) output just to jog my memory.
 *
 *We now plan to destructors the object to make thing easier. We take out isAuthenticated and component, which we
 * convert to an uppercase Component because JSX expects this (Why it is not like that in the props, i dont know)
 * and the ...rest just mean the rest of the properties excluding what we past in. IT can be any name but rest makes
 * sense to me.
 *
 * The idea behind this is we are still going to return <Route  but checking if the user is Autheticated before
 * doing so
 *
 *
 *
 *
 * @param props
 * @returns {*}
 * @constructor
 */

export const PrivateRoute = ({isAuthenticated, component:Component, ...rest}) =>{

   // console.log({...props});

    return(

         <Route {...rest} component={ (props)=>(

             isAuthenticated ?
                 ( <div> <Header /> <Component {...props}/> </div>)
                     :
                 (<Redirect to="/" />)

         )}/>

    );
};

const mapStateToProps = (state) => ({

    //-- The !! indicates by boolean if value exists or not.
    // If state.auth.uid have a value a true is returned if
    // it is undefined a false is returned.
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps,undefined)(PrivateRoute);




/**
 {path: "/dashboard", component: ƒ, location: {…}, computedMatch: {…}, isAuthenticated: false, …}
 component
 :
 ƒ ExpenseDashboardPage()
 computedMatch
 :
 {path: "/dashboard", url: "/dashboard", isExact: true, params: {…}}
 dispatch
 :
 ƒ (t)
 isAuthenticated
 :
 false
 location
 :
 {pathname: "/dashboard", search: "", hash: "", state: undefined, key: "wvo5zm"}
 path
 :
 "/dashboard"
 __proto__
 :
 Object

 **/
