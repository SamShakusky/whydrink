import React from "react";
import Calendar from './Calendar';
import Monetisation from './Monetisation';
import Grabber from './Grabber';

import "./scss/index";


const { pathname, search } = window.location;
const isMonetisation = pathname.includes('beer');
const isGrabbing = search.includes('grab');

function App() {
    if (isMonetisation) {
        return <Monetisation />;
    }
    if (isGrabbing) {
        return <Grabber />;
    }
    return <Calendar />;
}

export default App;
