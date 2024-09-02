import React, { useState } from "react";
import './App.css';
import './output.css';
import {useNavigate } from "react-router-dom";

import axios from 'axios';
const Form = () => {
    const [request,setRequest] = useState(
        {
            shape: null,
            size: null,
            landscaping: {
            grill: false,
            plants: false
            },
            features: {
            fountains: false,
            bubbles: false,
            lights: false,
            heater: false,
            is_smart: false
            },
            sanitation_system: null
        }
    );
    const navigate = useNavigate();

    const formQuery = async (event) => {
        console.log('form query activated');
        console.log(request);
        console.log(request['shape']);
        console.log(request['features']);
        event.preventDefault();
        axios.post('http://localhost:8081/form',request)
        .then(res => {
            console.log(res['data']);
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    
    const checkboxChange = (keyword, category) => {
    var tempRequest = request;
    tempRequest[category][keyword] = !request[category][keyword];
    setRequest({
        ...request,
        features: tempRequest[category]
    });
    }

    return (
        <div className="scroll-smooth bg-white container grid content-center">
            <div class="mt-7 isolate px-6 pt-14 lg:px-6">
                <div class="text-center">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tell Us About Your Dream Pool</h1>
                    <p class="mt-3 text-base leading-8 text-gray-600">Fill out the form below to help us provide you with an instant quote:</p>
                </div>
                    <form class="mt-6 mx-30 sm:col-span-3 formContainer">

                        <label for="poolshape" class="block text-sm font-medium leading-6 text-gray-900">Pool Shape</label>
                        <select 
                            value={request.shape}
                            onChange={e => {
                            setRequest({
                            ...request,
                            shape: e.target.value
                            });
                            }
                            } name="pool" autocomplete="pool-name" class="mt-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Rectangular</option>
                            <option>Geometric</option>
                            <option>Circular</option>
                            <option>L or T shaped</option>
                            <option>Custom-shaped</option>
                            <option>Natural</option>
                            <option>Lagoon</option>
                            <option>Oval</option>
                        </select>


                        <label for="sanitation" class="mt-5 block text-sm font-medium leading-6 text-gray-900">Sanitation System</label>
                        <select 
                            value={request.sanitation_system}
                            onChange={e => {
                            setRequest({
                            ...request,
                            sanitation_system: e.target.value
                            });
                            }
                            } name="sanitation_system" autocomplete="sanitation_system-name" class="mt-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Chlorine</option>
                            <option>Saltwater</option>
                            <option>UV</option>
                        </select>
                        
                        <label for="size" class="mt-5 block text-sm font-medium leading-6 text-gray-900">Pool Size (ft^3) </label>
                            <label for="volume" class="text-gray-900">Volume: </label>
                            <input onChange={e => {
                            setRequest({
                            ...request,
                            size: e.target.value
                            });
                            }} type="text" id="volume" name="volume" class="rounded-md border-0 px-3.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input> 

                        <div class="mt-4">
                            <legend class="text-sm font-semibold leading-6 text-gray-900">Features</legend>
                            <div class="mt-2 text-left">
                                <input id="fountains" name="fountains" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange("fountains","features")}></input>
                                <label for="fountains" class="font-medium text-gray-900"> Fountains</label>
                                <br></br>
                                <input id="bubbles" name="comments" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange("bubbles","features")}></input>
                                <label for="bubbles" class="font-medium text-gray-900"> Bubbles</label>
                                <br></br>
                                <input id="lights" name="lights" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange("lights","features")}></input>
                                <label for="lights" class="font-medium text-red-900"> Lights</label>
                                <br></br>
                                <input id="smart" name="smart" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange("is_smart", "features")}></input>
                                <label for="smart" class="font-medium text-gray-900"> "Smart" Pool</label>
                                <br></br>
                                <input id="heater" name="heater" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange("heater", "features")}></input>
                                <label for="heater" class="font-medium text-gray-900"> Heater </label>
                            </div>
                        </div>

                        <div class="mt-4">
                            <legend class="text-sm font-semibold leading-6 text-gray-900"> Landscaping</legend>
                            <div class="mt-2 text-left">
                            <input id="plants" name="plants" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"onChange={e => checkboxChange("plants", "landscaping")}></input>
                            <label for="plants" class="font-medium text-gray-900"> Plants</label>
                            <br></br>
                            <input id="grill" name="comments" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange("grill", "landscaping")}></input>
                            <label for="grill" class="font-medium text-gray-900"> Outdoor Grill</label>
                            </div>
                        </div>

                        <div class="mt-10 gap-x-6">
                            <a href="#" onClick={(e) => formQuery(e)} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</a>
                        </div>
                    </form>
            </div>
        </div>
    );
}

export default Form;