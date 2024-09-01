import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getDatabase } from 'firebase/database';
import app from './firebase';
import './output.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsgTxt, setErrorTxt] = useState("");
  const [seed, setSeed] = useState(1);


  const auth = getAuth();
  const db = getDatabase(app);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error creating account", error);
    }
  }
  const handleSignIn = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        if (error.code == 'auth/invalid-login-credentials'){
          console.log("invalid credential please try again");
          setErrorTxt("Invalid Credential Please Try Again");
          setSeed(2);
        }
        console.error("Error signing in with email/password:", error);
      }
  }         
  useEffect(() => {
    const hasRedirected = localStorage.getItem('redirected');
    if (hasRedirected) {
      setLoggedIn(true);
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User is signed in:", uid);
        setLoggedIn(true);
      } else {
        console.log("User is signed out");
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);
  const handleSignOut = async () => {
    try {
      localStorage.removeItem('redirected');
      navigate('/');
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const ErrorMsg = () => {
    console.log(seed);
    return(
      <h6 style={{color:'red'}}>{errorMsgTxt}</h6>
    );
  }

  useEffect(() => {
    ErrorMsg();
  },[errorMsgTxt]);

  return (
    <div class="bg-white scroll-smooth min-h-screen relative isolate px-6 pt-14 lg:px-8">
        {/* {loggedIn ? (
            <div>
              <h1> Logout</h1>
              <h3> Have a good day! </h3>
              <button class="buttonlog" onClick={handleSignOut}>Sign Out</button>
            </div>
          ): */}
          <div class="mt-12">
              <h1 class="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"> Login </h1>
              <div class="text-left mt-12 max-w-xs mx-auto">
                
                <label htmlFor="username" className="block mt-5 text-base font-medium leading-6 text-gray-900">
                  Email
                </label>
                
                <input placeholder='Email' class="w-full mt-2 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <label htmlFor="password" className="block mt-5 text-base font-medium leading-6 text-gray-900">
                  Password
                </label>
                
                <input placeholder="Password" class="w-full mt-2 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <br />

                <div class="mt-10 flex items-center justify-center gap-x-6">
                  <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign In</a>
                  <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up<span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
          {/* } */}
    </div>
  );
}
export default Login;

