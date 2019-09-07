import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import ReactGA from 'react-ga';
import axios from 'axios';

import restURL from './helpers/restURL';
import setMetaTag from "./helpers/setMetaTag";

import './scss/calendar';

const allowedWordLength = 40;
const timeOffset = new Date().getTimezoneOffset();

export default function Calendar() {
    const [ celebrations, setCelebrations ] = useState([]);
    const [ current, setCurrent ] = useState(0);
    const [ fontSize, setFontSize ] = useState(56);
    const [ isErrorVisible, setErrorVisibility ] = useState(false);
    
    useEffect(() => {
        getAllCelebrations();
    }, [])
    
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    }, [])
    
    function getAllCelebrations() {
        axios(`${restURL}/celebrations/?locale=ru&offset=${timeOffset}`)
            .then(resp => {
                const { data } = resp.data;
                
                setCelebrations(data);
                adjustFontSize(data, 0);
                setMetaTags(data);
                setErrorVisibility(false);
            })
            .catch(err => {
                console.error(err);
                
                setErrorVisibility(true);
            });
    }
    
    function adjustFontSize(celebs, curr) {
        let fontSize = 52;
        const allowedCharAmount = window.innerWidth / allowedWordLength;
        
        const longestWordLength = celebs[curr]
            .split(' ')
            .reduce((a, b) => (a.length > b.length ? a : b))
            .length;
        
        if (longestWordLength > allowedCharAmount) {
            const diff = longestWordLength - allowedCharAmount;
            fontSize = fontSize - diff * 5;
        }
        
        setFontSize(fontSize);
    }
    
    function setMetaTags(celebs) {
        const value = `Потому что сегодня праздник — ${celebs[0].trim()}!`;
        setMetaTag('name="description"', value);
        setMetaTag('property="og:description"', value);
        setMetaTag('name="twitter:description"', value);
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
    
    function handleClick(e) {
        e.stopPropagation();
    }
    
    function handleLink() {
        ReactGA.event({
            category: 'User',
            action: 'Clicked a link',
            label: celebrations[current].trim(),
        });
    }
    
    if (isErrorVisible || !celebrations) {
        return (
            <div className="container" onClick={getNextCelebration}>
                <div className="calendar">
                    <p className="subheader all-caps">Что-то пошло не так</p>
                    <h1 className="header">Наверное, сегодня стоит воздержаться</h1>
                    <button onClick={getAllCelebrations} className="calendar__reload">(или нажми сюда, вдруг повезёт)</button>
                </div>
            </div>
        );
    }
    
    if (!celebrations.length) {
        return null;
    }
    
    return (
        <div className="container">
            <div className="calendar">
                <p className="subheader all-caps">Так сегодня же</p>
                <h1 style={getStyle()} className="header">
                    <a href={`//google.com/search?q=${celebrations[current].replace(/\s+/g, '+')}`} target="_blank" onClick={handleLink}>
                        {celebrations[current].trim()}!
                    </a>
                </h1>
                <button className="calendar__more" onClick={getNextCelebration} type="button">Другой повод</button>
                <a className="link" href="/beer" onClick={handleClick} >Не хочешь пить в одиночку?</a>
            </div>
        </div>
    );
}
