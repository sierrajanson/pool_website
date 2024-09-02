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
            features: {
                fountains: false,
                bubbles: false,
                lights: false,
                heater: false,
                is_smart: false
            },

            landscaping: {
            grill: false,
            plants: false
            },
            sanitation_system: null
        }
    );
    const navigate = useNavigate();

    const formQuery = async (event) => {

        console.log('form query activated');

        event.preventDefault();
        console.log('request going out to db');
         
        let results = [{'company_id': 3, 'shape': 'Lagoon', 'size': 22, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'None', 'price': 5623.56, 'issue_date': '31 August 2024'},        
            {'company_id': 3, 'shape': 'Oval', 'size': 43, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 9443.4, 'issue_date': '31 August 2024'},
            {'company_id': 3, 'shape': 'Circular', 'size': 50, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 7716.04, 'issue_date': '31 August 2024'},  
            {'company_id': 3, 'shape': 'Natural', 'size': 10, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 3302.6, 'issue_date': '31 August 2024'},   
            {'company_id': 3, 'shape': 'Rectangular', 'size': 34, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'None', 'price': 5776.41, 'issue_date': '31 August 2024'},   
            {'company_id': 3, 'shape': 'None', 'size': 12, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 1058.87, 'issue_date': '31 August 2024'},      
            {'company_id': 3, 'shape': 'Oval', 'size': 11, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'Chlorine', 'price': 8071.87, 'issue_date': '31 August 2024'},      
            {'company_id': 3, 'shape': 'Oval', 'size': 43, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 2805.18, 'issue_date': '31 August 2024'},     
            {'company_id': 4, 'shape': 'Oval', 'size': 45, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 8138.37, 'issue_date': '31 August 2024'},
            {'company_id': 4, 'shape': 'Geometric', 'size': 37, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'Chlorine', 'price': 10112.86, 'issue_date': '31 August 2024'},
            {'company_id': 4, 'shape': 'Oval', 'size': 46, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 1, 'grill': 1, 'sanitation_system': 'None', 'price': 6114.19, 'issue_date': '31 August 2024'},
            {'company_id': 4, 'shape': 'Circular', 'size': 36, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 10016.54, 'issue_date': '31 August 2024'},       
            {'company_id': 4, 'shape': 'Rectangular', 'size': 37, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 0, 'sanitation_system': 'UV', 'price': 9997.96, 'issue_date': '31 August 2024'},     
            {'company_id': 4, 'shape': 'None', 'size': 35, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 1, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'UV', 'price': 1672.67, 'issue_date': '31 August 2024'},
            {'company_id': 4, 'shape': 'Geometric', 'size': 42, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 835.01, 'issue_date': '31 August 2024'},  
            {'company_id': 4, 'shape': 'L or T shaped', 'size': 42, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 8355.33, 'issue_date': '31 August 2024'},
            {'company_id': 4, 'shape': 'Lagoon', 'size': 45, 'fountains': 0, 'bubbles': 0, 'lights': 0, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 8427.46, 'issue_date': '31 August 2024'},   
            {'company_id': 4, 'shape': 'Oval', 'size': 29, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'None', 'price': 3201.53, 'issue_date': '31 August 2024'},
            {'company_id': 5, 'shape': 'L or T shaped', 'size': 11, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 2909.76, 'issue_date': '31 August 2024'},
            {'company_id': 5, 'shape': 'Geometric', 'size': 27, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 5430.82, 'issue_date': '31 August 2024'},
            {'company_id': 5, 'shape': 'Circular', 'size': 26, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 1, 'heater': 0, 'plants': 1, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 4375.42, 'issue_date': '31 August 2024'}, 
            {'company_id': 5, 'shape': 'Natural', 'size': 39, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'None', 'price': 980.59, 'issue_date': '31 August 2024'},        
            {'company_id': 5, 'shape': 'None', 'size': 40, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 8011.91, 'issue_date': '31 August 2024'},      
            {'company_id': 5, 'shape': 'Custom-shaped', 'size': 19, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 10033.51, 'issue_date': '31 August 2024'},
            {'company_id': 5, 'shape': 'Oval', 'size': 34, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 9759.58, 'issue_date': '31 August 2024'},
            {'company_id': 5, 'shape': 'Custom-shaped', 'size': 24, 'fountains': 0, 'bubbles': 0, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'UV', 'price': 1270.36, 'issue_date': '31 August 2024'},   
            {'company_id': 5, 'shape': 'Geometric', 'size': 28, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 9898.44, 'issue_date': '31 August 2024'},
            {'company_id': 5, 'shape': 'Rectangular', 'size': 49, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 1490.53, 'issue_date': '31 August 2024'},     
            {'company_id': 6, 'shape': 'Natural', 'size': 22, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 1, 'sanitation_system': 'None', 'price': 3200.03, 'issue_date': '31 August 2024'},       
            {'company_id': 6, 'shape': 'None', 'size': 43, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'None', 'price': 5781.17, 'issue_date': '31 August 2024'},
            {'company_id': 6, 'shape': 'None', 'size': 34, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'Chlorine', 'price': 8660.17, 'issue_date': '31 August 2024'},      
            {'company_id': 6, 'shape': 'Geometric', 'size': 48, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 1156.94, 'issue_date': '31 August 2024'},       
            {'company_id': 6, 'shape': 'Geometric', 'size': 20, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 0, 'sanitation_system': 'UV', 'price': 2781.49, 'issue_date': '31 August 2024'},       
            {'company_id': 6, 'shape': 'Circular', 'size': 14, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 1, 'sanitation_system': 'UV', 'price': 1311.47, 'issue_date': '31 August 2024'},        
            {'company_id': 6, 'shape': 'Lagoon', 'size': 31, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'UV', 'price': 2432.31, 'issue_date': '31 August 2024'},
            {'company_id': 6, 'shape': 'Oval', 'size': 33, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 0, 'sanitation_system': 'UV', 'price': 4473.6, 'issue_date': '31 August 2024'},
            {'company_id': 6, 'shape': 'Geometric', 'size': 23, 'fountains': 0, 'bubbles': 0, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'None', 'price': 8289.12, 'issue_date': '31 August 2024'},     
            {'company_id': 6, 'shape': 'L or T shaped', 'size': 19, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 5268.86, 'issue_date': '31 August 2024'},
            {'company_id': 7, 'shape': 'Oval', 'size': 18, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 6915.09, 'issue_date': '31 August 2024'},      
            {'company_id': 7, 'shape': 'Geometric', 'size': 29, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'None', 'price': 5568.04, 'issue_date': '31 August 2024'},     
            {'company_id': 7, 'shape': 'Oval', 'size': 50, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'None', 'price': 8097.12, 'issue_date': '31 August 2024'},
            {'company_id': 7, 'shape': 'Natural', 'size': 25, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 5600.17, 'issue_date': '31 August 2024'},   
            {'company_id': 7, 'shape': 'None', 'size': 14, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'UV', 'price': 8853.51, 'issue_date': '31 August 2024'},
            {'company_id': 7, 'shape': 'Rectangular', 'size': 16, 'fountains': 0, 'bubbles': 1, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 9635.91, 'issue_date': '31 August 2024'},
            {'company_id': 7, 'shape': 'Circular', 'size': 33, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'UV', 'price': 5788.85, 'issue_date': '31 August 2024'},        
            {'company_id': 7, 'shape': 'Rectangular', 'size': 47, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'UV', 'price': 6045.23, 'issue_date': '31 August 2024'},     
            {'company_id': 7, 'shape': 'None', 'size': 13, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'UV', 'price': 2676.85, 'issue_date': '31 August 2024'},
            {'company_id': 7, 'shape': 'Natural', 'size': 27, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 6975.78, 'issue_date': '31 August 2024'},  
            {'company_id': 8, 'shape': 'Oval', 'size': 15, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 6526.42, 'issue_date': '31 August 2024'},     
            {'company_id': 8, 'shape': 'L or T shaped', 'size': 28, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'Chlorine', 'price': 5968.01, 'issue_date': '31 August 2024'},
            {'company_id': 8, 'shape': 'None', 'size': 36, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 1, 'grill': 0, 'sanitation_system': 'UV', 'price': 7604.58, 'issue_date': '31 August 2024'},
            {'company_id': 8, 'shape': 'Oval', 'size': 15, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 5122.37, 'issue_date': '31 August 2024'},     
            {'company_id': 8, 'shape': 'Custom-shaped', 'size': 33, 'fountains': 0, 'bubbles': 0, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 2735.44, 'issue_date': '31 August 2024'},
            {'company_id': 8, 'shape': 'L or T shaped', 'size': 50, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 1, 'sanitation_system': 'Chlorine', 'price': 5854.83, 'issue_date': '31 August 2024'},
            {'company_id': 8, 'shape': 'Lagoon', 'size': 50, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 6250.83, 'issue_date': '31 August 2024'},   
            {'company_id': 8, 'shape': 'Rectangular', 'size': 38, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 9015.48, 'issue_date': '31 August 2024'},
            {'company_id': 8, 'shape': 'Natural', 'size': 19, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 1389.04, 'issue_date': '31 August 2024'},
            {'company_id': 8, 'shape': 'Geometric', 'size': 36, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 4259.03, 'issue_date': '31 August 2024'}, 
            {'company_id': 9, 'shape': 'Rectangular', 'size': 11, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 1340.85, 'issue_date': '31 August 2024'},
            {'company_id': 9, 'shape': 'None', 'size': 48, 'fountains': 1, 'bubbles': 1, 'lights': 0, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 3364.18, 'issue_date': '31 August 2024'},      
            {'company_id': 9, 'shape': 'None', 'size': 26, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 949.88, 'issue_date': '31 August 2024'},       
            {'company_id': 9, 'shape': 'Oval', 'size': 34, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 1, 'grill': 1, 'sanitation_system': 'UV', 'price': 523.15, 'issue_date': '31 August 2024'},
            {'company_id': 9, 'shape': 'Circular', 'size': 19, 'fountains': 1, 'bubbles': 0, 'lights': 1, 'is_smart': 1, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 8090.72, 'issue_date': '31 August 2024'}, 
            {'company_id': 9, 'shape': 'Lagoon', 'size': 10, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 0, 'heater': 1, 'plants': 0, 'grill': 0, 'sanitation_system': 'None', 'price': 9498.58, 'issue_date': '31 August 2024'},        
            {'company_id': 9, 'shape': 'Oval', 'size': 50, 'fountains': 1, 'bubbles': 0, 'lights': 0, 'is_smart': 1, 'heater': 0, 'plants': 1, 'grill': 0, 'sanitation_system': 'Saltwater', 'price': 10460.03, 'issue_date': '31 August 2024'},    
            {'company_id': 9, 'shape': 'Lagoon', 'size': 34, 'fountains': 1, 'bubbles': 1, 'lights': 1, 'is_smart': 0, 'heater': 0, 'plants': 0, 'grill': 0, 'sanitation_system': 'Chlorine', 'price': 6666.93, 'issue_date': '31 August 2024'},    
            {'company_id': 9, 'shape': 'None', 'size': 42, 'fountains': 0, 'bubbles': 0, 'lights': 1, 'is_smart': 0, 'heater': 1, 'plants': 1, 'grill': 1, 'sanitation_system': 'Saltwater', 'price': 9021.48, 'issue_date': '31 August 2024'},     
            {'company_id': 9, 'shape': 'None', 'size': 40, 'fountains': 0, 'bubbles': 1, 'lights': 1, 'is_smart': 1, 'heater': 0, 'plants': 0, 'grill': 1, 'sanitation_system': 'UV', 'price': 3924.82, 'issue_date': '31 August 2024'},];
            
            
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
            console.log('request flattened:');
            console.log(flat_req);
            let flat_req_keys = Object.keys(flat_req).sort();

            // create relevance ordereing
            let relevance_dict = {}

            let req_in = 0;
            for (let i = 0; i < results.length; i++){
                if (i < 2){
                console.log(results[i]);
                let result = results[i];
                let keys = Object.keys(results[i]).sort();
                let count = 0;
                
                for (let j = 0; j < keys.length; j++){
                    if (keys[j] != 'company_id' && keys[j] != 'issue_date' && keys[j] != 'price'){
                        if (result[keys[j]] === flat_req[flat_req_keys[req_in]]){
                            count +=1
                        }
                        req_in += 1
                    }
                }
                console.log('count', count);
                // add to dictionary here
                if(!relevance_dict[`${count}`]){
                    relevance_dict[`${count}`] = [];
                }
                relevance_dict[`${count}`].push(result);
            }
            }
            console.log(relevance_dict);
        // axios.post('http://localhost:8081/form',request)
        // .then(res => {
        //     console.log('new results');
        //     // console.log(res['data']);
        //     let results = res['data'];

        //     for (let i = 0; i < results.length; i++){
        //         if (i === 0){
        //             console.log(results[i]['bubbles']);
        //         }

        //     }
        //     // navigate('/');
        // })
        
        // .catch(err => console.log(err));
    }

    
    const checkboxChange = (keyword, category) => {
        var tempRequest = request;
        tempRequest['features'][keyword] = !request['features'][keyword];
        console.log(tempRequest);
        setRequest({
            ...request,
            features: tempRequest['features']
        });
    }

    const checkboxChange2 = (keyword, category) => {
        var tempRequest = request;
        tempRequest['landscaping'][keyword] = !request['landscaping'][keyword];
        console.log(tempRequest);
        setRequest({
            ...request,
            landscaping: tempRequest['landscaping']
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
        </div>
    );
}

export default Form;