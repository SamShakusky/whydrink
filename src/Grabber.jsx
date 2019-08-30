import React, { useState, useEffect } from "react";
import axios from 'axios';

import restURL from './helpers/restURL';

import "./scss/grabber";


function Grabber() {
    const [ celebrations, setCelebrations ] = useState([]);
    
    useEffect(() => {
        grab();
    }, [])
    
    function grab() {
        axios(`${restURL}/celebrations/grab/?locale=ru`)
            .then(resp => {
                setCelebrations(resp.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    if (!celebrations.length) {
        return null;
    }
    
    return (
        celebrations.map((el) => (
            <div className="grabber__item">{el}</div>
        ))
    )
}

export default Grabber;
