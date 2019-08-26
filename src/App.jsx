import React from "react";
import Calendar from './Calendar';
import Grabber from './Grabber';

import "./scss/index";


const { search } = window.location;
const isGrabbing = search.includes('grab');

function App() {
    if (isGrabbing) {
        return <Grabber />
    }
    return <Calendar />;
}

export default App;
