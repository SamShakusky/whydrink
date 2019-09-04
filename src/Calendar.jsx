import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import axios from 'axios';

import restURL from './helpers/restURL';

import './scss/calendar';

const allowedWordLength = 40;
const currentTime = Date.now();


export default function Calendar() {
    const [ celebrations, setCelebrations ] = useState([]);
    const [ current, setCurrent ] = useState(0);
    const [ fontSize, setFontSize ] = useState(56);
    const [ isErrorVisible, setErrorVisibility ] = useState(false);
    
    useEffect(() => {
        getAllCelebrations();
    }, [])
    
    function getAllCelebrations() {
        axios(`${restURL}/celebrations/?locale=ru&time=${currentTime}`)
            .then(resp => {
                setCelebrations(resp.data.data);
                adjustFontSize(resp.data.data, 0);
                setErrorVisibility(false);
                
                const date = new Date(+resp.data.date);
                const servDate = new Date(+resp.data.serverTime);
                console.log(date);
                console.log(servDate);
            })
            .catch(err => {
                console.error(err);
                
                setErrorVisibility(true);
            });
    }
    
    function adjustFontSize(celebs, curr) {
        let fontSize = 56;
        const allowedCharAmount = window.innerWidth / allowedWordLength;
        
        const longestWordLength = celebs[curr]
            .split(' ')
            .reduce((a, b) => (a.length > b.length ? a : b))
            .length;
        
        if (longestWordLength > allowedCharAmount) {
            const diff = longestWordLength - allowedCharAmount;
            fontSize = fontSize - diff * 7;
        }
        
        setFontSize(fontSize);
    }
    
    function getNextCelebration() {
        let newIndex = +current + 1;
        
        if (newIndex > celebrations.length - 1) {
            newIndex = 0;
        }
        
        adjustFontSize(celebrations, newIndex);
        setCurrent(newIndex);
    }
    
    function getStyle() {
        return { fontSize };
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
            <h1 style={getStyle()} className="calendar__celebration">{celebrations[current].trim()}!</h1>
        </div>
    );
}
