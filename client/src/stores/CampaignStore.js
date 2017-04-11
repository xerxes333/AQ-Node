import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class CampaignStore extends EventEmitter {
    constructor() {
        super();
        this.campaigns = [];
    }
    
    loadCampaigns() {
        console.log("loadCampaigns");
        return this.campaigns;
    }
    
    getAll() {
        return this.campaigns;
    }
    
    createCampaign(data){
        // do stuff
        this.emit("change");
    }
    
    receiveCampaigns(data){
        this.campaigns = data;
        this.emit("change");
    }
    
    handleActions(action){
        switch (action.type) {
            case 'CREATE_CAMPAIGN':
                this.createCampaign(action.data);
                break;
            case 'FETCH_CAMPAIGNS_FULFILLED':
            case 'FETCH_CAMPAIGN_FULFILLED':
            case 'RECEIVE_CAMPAIGNS':
                this.receiveCampaigns(action.data);
            default:
                break;
        }
    }
}

const campaignStore = new CampaignStore();
dispatcher.register(campaignStore.handleActions.bind(campaignStore));

export default campaignStore;