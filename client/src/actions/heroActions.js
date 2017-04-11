// import dispatcher from "../dispatcher";
import Client from '../Client';

export function fetchHeroes() {
    return function(dispatch) {
        dispatch({type: "FETCH_HEROES"});
        Client.search('heroes', (data) => {
            dispatch({
                type: "FETCH_HEROES_FULFILLED",
                payload: data 
            });
        });
    }
}
export function fetchHero(id) {
    return function(dispatch) {
        dispatch({type: "FETCH_HERO"});
        Client.search(`heroes/${id}`, (data) => {
            dispatch({
                type: "FETCH_HERO_FULFILLED",
                payload: data 
            });
        });
    }
}