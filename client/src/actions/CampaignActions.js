import dispatcher from "../dispatcher";
import Client from '../Client';

export function createCampaign(data) {
    dispatcher.dispatch({
        type: "CREATE_CAMPAIGN",
        data
    });
}

export function loadCampaigns(data) {
    dispatcher.dispatch({type: "FETCH_CAMPAIGNS"});
    
    Client.search('campaigns', (data) => {
        dispatcher.dispatch({
            type: "RECEIVE_CAMPAIGNS",
            data: data 
        });
    });
    
    
    
}