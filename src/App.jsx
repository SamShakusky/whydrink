import React, { Suspense } from "react";

const Calendar = React.lazy(() => import('./Calendar'));
const Monetisation = React.lazy(() => import('./Monetisation'));
const Grabber = React.lazy(() => import('./Grabber'));

import "./scss/index";

const { pathname, search } = window.location;
const isMonetisation = pathname.includes('beer');
const isGrabbing = search.includes('grab');


function App() {
    if (isMonetisation) {
        return (
            <Suspense fallback={<div>Загрузка...</div>}>
                <Monetisation />
            </Suspense>
        )
    }
    if (isGrabbing) {
        return (
            <Suspense fallback={<div>Загрузка...</div>}>
                <Grabber />
            </Suspense>
        )
    }
    
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Calendar />
        </Suspense>
    );
}

export default App;
