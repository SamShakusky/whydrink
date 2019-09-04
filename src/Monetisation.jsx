import React, { useEffect } from "react";


export default function Monetisation() {
    useEffect(() => {
        document.title = "Зачем пить одному?";
    }, [])
    
    return (
        <div className="container">
            <div className="monetisation">
                <h1 className="header-bright">Ты можешь налить и&nbsp;мне</h1>
                <iframe src="https://money.yandex.ru/quickpay/shop-widget?writer=buyer&targets=&targets-hint=%D0%A3%D0%BA%D0%B0%D0%B6%D0%B8%20%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BA%20%D0%B8%D0%BB%D0%B8%20%D1%80%D0%B5%D0%B0%D0%B1%D0%B8%D0%BB%D0%B8%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B9%20%D1%86%D0%B5%D0%BD%D1%82%D1%80&default-sum=50&button-text=12&hint=&successURL=https%3A%2F%2Fwhydrink.today&quickpay=shop&account=410015276074429" width="100%" height="227" frameBorder="0" allowtransparency="true" scrolling="no"></iframe>
            </div>
        </div>
    );
}
