import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from "../actions/auth";


export const LoginPage = ({startLogin})=> {

       return(
           <div className="box-layout">
               <div className="box-layout__box">
                   <h1 className="box-layout__title">Boiler Plate</h1>
                   <p>Use me to start your application</p>
                   <button  className="button" onClick={startLogin}>Google Login</button>
               </div>
           </div>
       );

};

const mapDispatchToProps =  (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})


export default connect(undefined,mapDispatchToProps)(LoginPage);


