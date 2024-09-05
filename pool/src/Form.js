import React, { useState } from "react";
import './App.css';
import './output.css';
import Item from './Item';
import axios from 'axios';
import {quickSort,formFeature, formLandscaping,outputQuery} from "./helper";

const Form = () => {
    const [view, setView] = useState(true);
    const [res, setResults] = useState(); 
    const [otherOptions, setOther] = useState();
    const [showOther, setShowOther] = useState(false);
    const [request,setRequest] = useState(
        {
            shape: null,
            size: null,
            features: {
                fountains: false,
                bubbles: false,
                lights: false,
                heater: false,
                is_smart: false
            },
            price_range: null,
            landscaping: {
            grill: false,
            plants: false
            },
            sanitation_system: null
        }
    );

    let results = [];
    const formQuery = async (event) => {
        
        event.preventDefault();
        console.log('Querying...');
        
        axios.post('http://localhost:8081/form',request)
        .then(res => {
            console.log('new results');
            // console.log(res['data']);
            results = res['data'];
            console.log(results);
                   
            // .catch(err => console.log(err));
            // flatten request 
            let flat_req = {}
            const req_keys = Object.keys(request);
            for (let z = 0; z < req_keys.length; z++){
                if (req_keys[z] === "landscaping" || req_keys[z] === "features"){
                    let mini_dict = request[req_keys[z]]
                    let min_key = Object.keys(mini_dict);
                    for (let y=0;y < min_key.length; y++){
                        flat_req[min_key[y]] = mini_dict[min_key[y]]
                    }
                } else {
                flat_req[req_keys[z]] = request[req_keys[z]];
                }
            }

            let flat_req_keys = Object.keys(flat_req).sort();
            console.log('flat keys:');
            console.log(flat_req_keys.length);
            // create relevance ordereing
            let relevance_dict = {}
            let req_in = 0;
            var count = 0;
            for (let i = 0; i < results.length; i++){
                let result = results[i];
                let keys = Object.keys(results[i]).sort();
                    
                for (let j = 0; j < keys.length; j++){
                    if (keys[j] != 'company_id' && keys[j] != 'issue_date' && keys[j] != 'price'){
                        let val = result[keys[j]];

                        if (result[keys[j]] === 1){
                            // console.log(val,1);
                            val = true; 
                        } 
                        if (result[keys[j]] === 0){
                            val = false;
                            // console.log(val,0);
                        }
                        if (val === flat_req[flat_req_keys[req_in]]){
                            count +=1
                        }
                        req_in += 1
                    }
                }
                // add to dictionary here
                if(!relevance_dict[`${count}`]){
                    relevance_dict[`${count}`] = [];
                }
                relevance_dict[`${count}`].push(result);
                count = 0;
                req_in = 0;
            }
            console.log('relevance dict here:')
            console.log(relevance_dict);
            // picking top few to display
            let keys = Object.keys(relevance_dict).sort();
            let max = 10;
            let idx = 0;

            let output = [];
            let otherOptions = [];
            // iterating through each of the keys backwards
            for (let i = keys.length-1; i >= 0; i--){
                if (idx >= max) break;
                let freq = keys[i];
                let obj_list = relevance_dict[freq];

                // iterating through each row stored in frequency bucket
                for (let j = 0; j < obj_list.length;j++){
                    if (idx >= max) break;
                    if(relevance_dict[freq][j]["sanitation_system"] === request["sanitation_system"] && relevance_dict[freq][j]["shape"] === request["shape"] ){
                        output.push(relevance_dict[freq][j]);
                        idx+=1;
                    } else{
                        otherOptions.push(relevance_dict[freq][j]);
                    }
                }
            }

            
            setResults(quickSort(output));
            setOther(quickSort(otherOptions).slice(0,10-idx));
            setView(false);
        });  
    }

    const fetchResults = () => {
        return res;
    }

    const fetchOther = () => {
        return otherOptions;
    }
    
    const otherHeader = () => {
        if (res.length < 10){
            return "More Results";
        } else{
            return "";
        }
    }

    const checkboxChange = (keyword, category) => {
        var tempRequest = request;
        tempRequest['features'][keyword] = !request['features'][keyword];
        setRequest({
            ...request,
            features: tempRequest['features']
        });
    }

    const checkboxChange2 = (keyword, category) => {
        var tempRequest = request;
        tempRequest['landscaping'][keyword] = !request['landscaping'][keyword];
        setRequest({
            ...request,
            landscaping: tempRequest['landscaping']
        });
    }
    return (
        <div>
            {view ? <div className="scroll-smooth container grid content-center">
                <div class="isolate px-6 pt-14 lg:px-6">
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
                            <option value="none" selected disabled hidden>--Select--</option>
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
                            <option value="none" selected disabled hidden>--Select--</option>
                            <option>Chlorine</option>
                            <option>Saltwater</option>
                            <option>UV</option>
                        </select>
                        
                        <label for="pricerange" class="mt-5 block text-sm font-medium leading-6 text-gray-900">Price Range</label>
                        <select 
                            value={request.price_range}
                            onChange={e => {
                            setRequest({
                            ...request,
                            price_range: e.target.value
                            });
                            }
                            } name="pricerange" autocomplete="pricerangepricerange" class="mt-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value="none" selected disabled hidden>--Select--</option>
                            <option>$0-$15000</option>
                            <option>$15000-$25000</option>
                            <option>$25000-$35000</option>
                            <option>$35000-$45000</option>
                            <option>$45000-$55000</option>
                            <option>$55000+</option>



                        </select>

                        <label for="size" class="mt-5 block text-sm font-medium leading-6 text-gray-900">Pool Size (ft²) </label>
                            <label for="volume" class="text-gray-900">Size: </label>
                            <input onChange={e => {
                                setRequest({
                                ...request,
                                size: Number(e.target.value)
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
                                <label for="lights" class="font-medium text-gray-900"> Lights</label>
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
                            <input id="plants" name="plants" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"onChange={e => checkboxChange2("plants", "landscaping")}></input>
                            <label for="plants" class="font-medium text-gray-900"> Plants</label>
                            <br></br>
                            <input id="grill" name="comments2" type="checkbox" class="h-4 w-4 mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" onChange={e => checkboxChange2("grill", "landscaping")}></input>
                            <label for="grill" class="font-medium text-gray-900"> Outdoor Grill</label>
                            </div>
                        </div>

                        <div class="mt-10 gap-x-6">
                            <a href="#" onClick={(e) => formQuery(e)} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</a>
                        </div>
                    </form>
            </div>
            </div>: <div class="text-center pt-20 pb-20">
            <h1 class="text-2xl font-bold tracking-tight text-indigo-900 sm:text-4xl"> Estimates for Your Pool</h1>
            <p class="mt-3 text-base leading-8 text-gray-600">{outputQuery(request)}</p>
            {/* <h1 class="text-1xl text-left font-bold tracking-tight text-gray-900 sm:text-2xl"> Exact Matches</h1> */}
            {/* <p class="mt-3 text-base leading-8 text-gray-600">{apologize()}</p> */}

            {/* <h1 class="text-1xl text-left font-bold tracking-tight text-gray-900 sm:text-2xl"> Close Options</h1> */}
            <div className="resultsTable">
                <div class="relative overflow-x-auto">
                    <table class="w-full mt-10 text-xs text-left rtl:text-right text-gray-400 dark:text-gray-300">
                        <thead class="text-xs text-indigo-700 uppercase bg-gray-50 dark:bg-indigo-700 dark:text-indigo-400">
                            <tr>
                                <th scope="col" class="px-5 py-3">
                                    Company
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Pool Type
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Sanitation
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Features
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Landscaping
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Size 
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Issue Date
                                </th>
                                <th scope="col" class="px-5 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchResults().slice(0,10).map((row) => (
                                <Item
                                    name={row['company_id']}
                                    sanitation={row['sanitation_system']}
                                    type={row['shape']}
                                    size={row['size']}
                                    features={formFeature(row)}
                                    landscaping={formLandscaping(row)}
                                    date={row['issue_date']}
                                    price={row['price']}
                                />    
                            )
                            )
                            }                    
                        </tbody>
                    </table>
                </div>
                <div class="mt-16 text-2xl font-bold tracking-tight text-indigo-900 sm:text-2xl">
                    {otherHeader()}
                </div>

                <div class="relative overflow-x-auto"></div>
                <table class="w-full mt-6 text-xs text-left rtl:text-right text-gray-400 dark:text-gray-300">
                    <tbody>
                            {fetchOther().slice(0,10).map((row) => (
                                <Item
                                    name={row['company_id']}
                                    sanitation={row['sanitation_system']}
                                    type={row['shape']}
                                    size={row['size']}
                                    features={formFeature(row)}
                                    landscaping={formLandscaping(row)}
                                    date={row['issue_date']}
                                    price={row['price']}
                                />    
                            )
                            )
                            }                    
                        </tbody>
                </table>
                {/* <h1 class="mt-2 text-right cursor-pointer">More Results <span aria-hidden="true">&#709;</span></h1> */}
                <div class="mt-10">
                <a onClick={(e) => setView(true)} class="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Take Form Again</a>
                </div>
            </div>
        </div>

            }
        </div>
    );
}

export default Form;