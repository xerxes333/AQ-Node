import React from "react";
import { connect } from "react-redux";
import { reduxForm, reset } from 'redux-form';

import PlayersDropdown from './fields/PlayersDropdown'
import { Core } from '../../CampaignData'

function mapStateToProps(store) {
  return { 
    campaign: store.campaigns.campaign,
    isUpdated: store.campaigns.updated,
    editLogEntry: store.campaigns.editLogEntry || [],
  };
}

  
class CampaignLogSmall extends React.Component {
  
  componentWillMount() {
    const { campaign } = this.props
    
    // TODO: calc medal winner values
    
    if(!campaign.log || !campaign.log.length)
      this.props.initialize({log: Core});
    else
      this.props.initialize({log: campaign.log});
  }
  
  
  componentWillUnmount() {
    this.toggleEdit()
  }
  
  toggleEdit(index = -1){
    
    var editLogEntry = this.props.editLogEntry.slice()
    
    if(index >= 0){
      const i = editLogEntry.indexOf(index)
      
      if(i >= 0)
        editLogEntry.splice(i,1)
      else
        editLogEntry.push(index)
        
    } else
      editLogEntry = []
    
    
    this.props.dispatch( {type: 'EDIT_LOG_ENTRY', payload: editLogEntry} );
    
  }
  
  cancel(){
    this.props.dispatch(reset('campaignLog'))
    this.toggleEdit()
  }
  
  getPlayerName(id){
    
    if(!id) return null
      
    const player = this.props.campaign.players.find((p)=>{
      return p._id === id;
    })
    
    return player.name
  }
  
  calcMedalWinner(column){
    const { campaign } = this.props
    
    var arr = campaign.log.map((entry,index)=>{
      return entry[column]
    })
    .filter((value, i)=>{
      return value !== "" && value !== null && value !== undefined
    })
    .reduce((acc, curr)=>{
      if (acc[curr] === undefined) {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
      return acc;
    },{})
    
    var most = []
    var max = 0

    for (var prop in arr) {
      if(arr[prop] > max){
        max = arr[prop]
        most = [prop]
      } else if(arr[prop] === max){
        most.push(prop)
      }
    }
  
  return <div>
    {most.length > 0 && most.map((id,i)=>{
      if(most.length > 1 && most.length !== i+1)
        return this.getPlayerName(id) + ', '
      else
        return this.getPlayerName(id)
    })}
  </div>
    
  }
  
  render() {
    const { campaign, handleSubmit, editLogEntry, onDelete } = this.props

    const renderCampaignLog = campaign.log.map((entry, index) => {
      
      const glyph = editLogEntry.includes(index)? "primary" : "default"
      
      var winner = this.getPlayerName(entry.winner)
      var deaths = this.getPlayerName(entry.deaths)
      var coins  = this.getPlayerName(entry.coins)
      var reward = this.getPlayerName(entry.reward)   
      var title  = this.getPlayerName(entry.title)
      
      if( editLogEntry.includes(index) ){
        winner = <PlayersDropdown players={campaign.players} name={`log[${index}].winner`}/>
        deaths = <PlayersDropdown players={campaign.players} name={`log[${index}].deaths`}/>
        coins  = <PlayersDropdown players={campaign.players} name={`log[${index}].coins`}/>
        reward = entry.hasOwnProperty('reward') && <PlayersDropdown players={campaign.players} name={`log[${index}].reward`}/>
        title  = entry.hasOwnProperty('title') && <PlayersDropdown players={campaign.players} name={`log[${index}].title`}/>
      }
    
      return <table className="table table-striped table-condensed" key={index}>
        <thead>
          <tr>
            <th className={`core-${entry.level}`} colSpan="2">
              {entry.location}
              <button className={`btn btn-${glyph} btn-sm pull-right`} type="button" onClick={ () => this.toggleEdit(index) } >
                <span className={`glyphicon glyphicon-pencil`} aria-hidden="true"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Winner</td><td>{winner}</td></tr>
          <tr><td>Least Deaths</td><td>{deaths}</td></tr>
          <tr><td>Most Coins</td><td>{coins}</td></tr>
          <tr><td>Won Reward</td><td>{reward}</td></tr>
          <tr><td>Won Title</td><td>{title}</td></tr>
        </tbody>
      </table>
    })
    
    return <form onSubmit={handleSubmit}>
      <br/>
      {renderCampaignLog}
      
      <table className="table table-striped table-condensed">
        <thead>
          <tr><th className="core-medal" colSpan="2">Medal Winner</th></tr>
        </thead>
        <tbody>
          <tr><td>Winner</td><td>{this.calcMedalWinner('winner')}</td></tr>
          <tr><td>Least Deaths</td><td>{this.calcMedalWinner('deaths')}</td></tr>
          <tr><td>Most Coins</td><td>{this.calcMedalWinner('coins')}</td></tr>
          <tr><td>Won Reward</td><td>{this.calcMedalWinner('reward')}</td></tr>
          <tr><td>Won Title</td><td>{this.calcMedalWinner('title')}</td></tr>
        </tbody>
      </table>
      
       { editLogEntry.length > 0 &&
        <div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-warning" onClick={ () => this.cancel() } >Cancel</button>
        </div>
      }
      
      { onDelete && <button type="button" className="btn btn-danger" onClick={onDelete} >Delete</button> }
      
    </form>

  }
}

CampaignLogSmall = reduxForm({
  form: 'campaignLog',
})(CampaignLogSmall);

export default connect(mapStateToProps)(CampaignLogSmall);