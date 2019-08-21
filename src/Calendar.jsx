import React from 'react';
import axios from 'axios';

import restURL from './helpers/restURL';
import './scss/calendar';


export default class Calendar extends React.PureComponent {
    
    state = {
        celebrations: [],
        current: 0,
        isErrorVisible: false,
    }
    
    componentDidMount() {
        this.getAllCelebrations();
    }
    
    getAllCelebrations = () => {
        axios(`${restURL}/celebrations/?locale=ru`)
            .then(resp => {
                this.setState({
                    celebrations: resp.data,
                    isErrorVisible: false,
                });
            })
            .catch(err => {
                console.error(err);
                
                this.setState({ isErrorVisible: true });
            });
    }
    
    getNextCelebration = () => {
        const { celebrations, current } = this.state;
        let newIndex = +current + 1;
        
        if (newIndex > celebrations.length - 1) {
            newIndex = 0;
        }
        
        this.setState({ current: newIndex });
    }
    
    render() {
        const { celebrations, current, isErrorVisible } = this.state;
        
        if (isErrorVisible) {
            return (
                <div className="calendar" onClick={this.getNextCelebration}>
                    <p className="calendar__you-may">Что-то пошло не так</p>
                    <h1 className="calendar__celebration">Наверное, сегодня стоит воздержаться</h1>
                    <button onClick={this.getAllCelebrations} className="calendar__reload">(или нажми сюда, вдруг повезёт)</button>
                </div>
            );
        }
        
        return (
            <div className="calendar" onClick={this.getNextCelebration}>
                <p className="calendar__you-may">Можно выпить, ведь сегодня</p>
                <h1 className="calendar__celebration">{celebrations[current]}</h1>
            </div>
        );
    }
}
