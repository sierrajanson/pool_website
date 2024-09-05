import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import './App.css'
const Navbar= () =>{
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const hasRedirected = localStorage.getItem('redirected');
  //   if (hasRedirected) {
  //     setLoggedIn(true);
  //   }
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       // console.log("User is signed in:", uid);
  //       setLoggedIn(true);
  //     } else {
  //       // console.log("User is signed out");
  //       setLoggedIn(false);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [auth, navigate]);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('redirected');
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  <div className="link_container">
    <li>
      <Link to="/"className="link">Home</Link>
    </li>
    <li>
      <Link to="/login"className="link">Login</Link>
    </li>
    <li className="login">
      {loggedIn ? (<Link to="/profile"className="link">Profile</Link>): (<p></p>)}
    </li>
    <li className="login">
      {loggedIn ? (<button className="logOutBut" onClick={handleSignOut}>Sign Out</button>): (<Link to="/login" className="link">Login</Link>)}
    </li>
  </div>

  return (
    <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Place Pool Estimates</span>
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <Link to="/" class="text-sm font-semibold leading-6 text-gray-900">Home</Link>
        <a href="#form" class="text-sm font-semibold leading-6 text-gray-900">Form</a>
        <a href="#footer" class="text-sm font-semibold leading-6 text-gray-900">Contact</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <Link to="/login" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
      </div>
    </nav>
    <div class="lg:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50"></div>
      <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Placer Pool Estimates</span>
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
            <Link to="/"class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</Link>
            <a href="#form" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Form</a>
            <a href="#footer" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact</a>
            </div>
            <div class="py-6">
            <Link to="/login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>  
  );
}
export default Navbar;