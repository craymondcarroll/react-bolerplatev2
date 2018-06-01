import {firebase, googleAuthProvider} from "../firebase/firebase";

export const startLogin = () => {
    return () =>{
        //-------------------------------------------
        // The reason we have a return keyword is
        // to allow chaining of the promise, if
        // we didn't care there would be not reason
        // to use the return keyword here
        //-------------------------------------------
         return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};


export const login = (uid) => ({
    type: 'LOGIN',
    uid

});


export const startLogout = () => {

  return () => {
      //--------------------
      //Read comment above
      //--------------------
     return firebase.auth().signOut();
  };


};


export const logout =() => ({
    type: 'LOGOUT'
});
