import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./Auth/Login";
import Quora from "./Components/Quora";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.signOut();
  }, []);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);


  

  return <div className="App">{user ? <Quora /> : <Login />}</div>;
}

export default App;
