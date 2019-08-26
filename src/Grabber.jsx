import React, { useEffect } from "react";
import axios from 'axios';

import restURL from './helpers/restURL';


function Grabber() {
    useEffect(() => {
        grab();
    }, [])
    
    function grab() {
        axios(`${restURL}/celebrations/grab/?locale=ru`)
            .then(resp => {
            })
            .catch(err => {
                console.error(err);
            });
    }
    
    return (
        <div>123</div>
    )
}

export default Grabber;
