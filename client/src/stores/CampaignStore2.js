import { extendObservable } from "mobx";

class CampaignStore2 {
    constructor() {
        extendObservable(this, {
            todo: ["thing 1", "thing 2"],
            campaigns: []
        })
    }
}

export default new CampaignStore2();