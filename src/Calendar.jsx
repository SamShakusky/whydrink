import React, { useState, useEffect } from "react";
import axios from 'axios';

import restURL from './helpers/restURL';

import './scss/calendar';


export default function Calendar() {
    const [ celebrations, setCelebrations ] = useState([]);
    const [ current, setCurrent ] = useState(0);
    const [ isErrorVisible, setErrorVisibility ] = useState(false);
    
    useEffect(() => {
        getAllCelebrations();
    }, [])
    
    function getAllCelebrations() {
        axios(`${restURL}/celebrations/?locale=ru`)
            .then(resp => {
                setCelebrations(resp.data);
                setErrorVisibility(false);
            })
            .catch(err => {
                console.error(err);
                
                setErrorVisibility(true);
            });
    }
    
    function getNextCelebration() {
        let newIndex = +current + 1;
        
        if (newIndex > celebrations.length - 1) {
            newIndex = 0;
        }
        
        setCurrent(newIndex);
    }
    
    if (isErrorVisible) {
        return (
            <div className="calendar">
                <p className="calendar__you-may">Что-то пошло не так</p>
                <h1 className="calendar__celebration">Наверное, сегодня стоит воздержаться</h1>
                <button onClick={getAllCelebrations} className="calendar__reload">(или нажми сюда, вдруг повезёт)</button>
            </div>
        );
    }
    
    if (!celebrations.length) {
        return null;
    }
    
    return (
        <div className="calendar" onClick={getNextCelebration}>
            <p className="calendar__you-may">Можно выпить, ведь сегодня</p>
            <h1 className="calendar__celebration">{celebrations[current]}!</h1>
        </div>
    );
}
