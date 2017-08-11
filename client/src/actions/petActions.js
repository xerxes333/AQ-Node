import Client from '../Client';

export function fetchPets() {
    return function(dispatch) {
        dispatch({type: "FETCH_PETS"});
        Client.search('pets', (data) => {
            dispatch({
                type: "FETCH_PETS_FULFILLED",
                payload: data 
            });
        });
    }
}
export function fetchPet(id) {
    return function(dispatch) {
        dispatch({type: "FETCH_PET"});
        Client.search(`pets/${id}`, (data) => {
            dispatch({
                type: "FETCH_PET_FULFILLED",
                payload: data 
            });
        });
    }
}