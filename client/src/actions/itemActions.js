import Client from '../Client';

export function fetchItems() {
    return function(dispatch) {
        dispatch({type: "FETCH_ITEMS"});
        Client.search('items', (data) => {
            dispatch({
                type: "FETCH_ITEMS_FULFILLED",
                payload: data 
            });
        });
    }
}
export function fetchItem(id) {
    return function(dispatch) {
        dispatch({type: "FETCH_ITEM"});
        Client.search(`items/${id}`, (data) => {
            dispatch({
                type: "FETCH_ITEM_FULFILLED",
                payload: data 
            });
        });
    }
}