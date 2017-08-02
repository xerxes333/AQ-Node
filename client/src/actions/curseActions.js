import Client from '../Client';

export function fetchCurses() {
    return function(dispatch) {
        dispatch({type: "FETCH_CURSES"});
        Client.search('curses', (data) => {
            dispatch({
                type: "FETCH_CURSES_FULFILLED",
                payload: data 
            });
        });
    }
}
export function fetchCurse(id) {
    return function(dispatch) {
        dispatch({type: "FETCH_CURSE"});
        Client.search(`curses/${id}`, (data) => {
            dispatch({
                type: "FETCH_CURSE_FULFILLED",
                payload: data 
            });
        });
    }
}