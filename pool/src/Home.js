import './output.css';
import './App.css'
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from './Form';
function Home() {

  return (
    <div>
    <div id="home" class="bg-white scroll-smooth min-h-screen">
      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Instant Placer County pool quotes</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Simplifying the pool purchasing process by bringing Placer company quotes <b>to you.</b></p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a href="#form" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
              <a href="/login" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
    <div id="form" class="isolate form bg-gradient-to-r from-pink-100 via-indigo-100 to-indigo-200" >
    
    </div>

    <div id="form" class="isolate form bg-gradient-to-r from-pink-100 via-indigo-100 to-indigo-200" >
      <Form/>
      <div id="footer" class="relative isolate mt-10 px-6 pt-14 lg:px-8 bg-indigo-600 min-h-64">
        <div class="mt-10">
          <div className="flex justify-around footerFlex">
            <div>
                <h1 class="text-xl font-bold tracking-tight text-gray-200 sm:text-3xl">Contact Us</h1>
                <p class="mt-2 text-lg leading-8 text-gray-300">Coming soon...</p>
            </div>
            <a href="#home"><h1 class="text-xl ml-60 font-bold tracking-tight text-gray-200 sm:text-xl">HOME</h1></a>
            <a href="#form"><h1 class="text-xl font-bold tracking-tight text-gray-200 sm:text-xl">FORM</h1></a>
            <a href="#home"><h1 class="text-2xl font-bold tracking-tight text-gray-200 sm:text-xl">ABOUT</h1></a>

            <Link to="/login"><button class="hover:bg-indigo-500 border border-indigo-300 text-white font-bold py-0.5 px-4 rounded-full max-h-8">Log in <span aria-hidden="true">&rarr;</span></button></Link>
            
          </div>
          <hr class="footerLine"></hr>
          <p class="mt-20 pb-10 text-sm text-center leading-8 text-gray-300">© 2024, All rights reserved.</p>
        </div>
      </div>
    </div>

  </div>
  );
}

export default Home;
