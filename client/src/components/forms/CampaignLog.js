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
    user: store.user,
  };
}

  
class CampaignLog extends React.Component {
  
  componentWillMount() {
    const { campaign } = this.props
    
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
      return p && p.player._id === id;
    })
    
    if(!player) return null
      
    return player.player.name
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
        return <span key={i}> {this.getPlayerName(id)} <br/></span>
      else
        return this.getPlayerName(id)
    })}
  </div>
    
  }
  
  render() {
    const { campaign, handleSubmit, editLogEntry, onDelete, user } = this.props
    const prefix = campaign.expansion.toLowerCase().replace(/\s/g, '') || 'core'
    
    const isOwner = (campaign.created_by === user.user._id) ? true : false;
    
    const campaignPlayers = campaign.players
    .filter((player, i)=>{
      return player !== null && player !== undefined
    })
    .map((player, index)=>{
      return player.player
    }).filter((player, i, self)=>{
      return self.map(mapObj => mapObj._id).indexOf(player._id) === i;
    })
    
    const renderCampaignLog = campaign.log.map((entry, index) => {
      
      const glyph = editLogEntry.includes(index)? "primary" : "default"
      const firstCol = <td className={`scenario ${prefix}-${entry.level}`}>
        {entry.location}
        <button className={`btn btn-${glyph} btn-sm pull-right`} type="button" onClick={ () => this.toggleEdit(index) } >
          <span className={`glyphicon glyphicon-pencil`} aria-hidden="true"></span>
        </button>
      </td>
      
      if( editLogEntry.includes(index) )
        return <tr key={index}>
          {firstCol}
          <td><PlayersDropdown players={campaignPlayers} name={`log[${index}].winner`}/></td>
          <td><PlayersDropdown players={campaignPlayers} name={`log[${index}].deaths`}/></td>
          <td><PlayersDropdown players={campaignPlayers} name={`log[${index}].coins`}/></td>
          <td>{entry.hasOwnProperty('reward') && <PlayersDropdown players={campaignPlayers} name={`log[${index}].reward`} />}</td>
          <td>{entry.hasOwnProperty('title') && <PlayersDropdown players={campaignPlayers} name={`log[${index}].title`} />}</td>
        </tr>
      else
        return <tr key={index}>
          {firstCol}
          <td>{this.getPlayerName(entry.winner)}</td>
          <td>{this.getPlayerName(entry.deaths)}</td>
          <td>{this.getPlayerName(entry.coins)}</td>
          <td>{this.getPlayerName(entry.reward)}</td>
          <td>{this.getPlayerName(entry.title)}</td>
        </tr>
    })

    return <form onSubmit={handleSubmit}>
      <table className="table table-striped table-bordered table-condensed table-responsive campaign-log">
        <thead>
          <tr>
            <th className="col-md-3">Arcadia Quest: {campaign.expansion}</th>
            <th>Winner</th>
            <th>Least Deaths</th>
            <th>Most Coins</th>
            <th>Won Reward</th>
            <th>Won Title</th>
          </tr>
        </thead>
        <tbody>
          {renderCampaignLog}
        </tbody>
        <tfoot>
          <tr className="medal">
            <td className="scenario medal">Medal Winner</td>
            <td>{this.calcMedalWinner('winner')}</td>
            <td>{this.calcMedalWinner('deaths')}</td>
            <td>{this.calcMedalWinner('coins')}</td>
            <td>{this.calcMedalWinner('reward')}</td>
            <td>{this.calcMedalWinner('title')}</td>
          </tr>
        </tfoot>
      </table>
      <div className="row">
        <div className="col-md-12 campaign-log-controls">
          { editLogEntry.length > 0 && <button type="submit" className="btn btn-primary btn-lg">Save</button> }
          { editLogEntry.length > 0 &&  <button type="button" className="btn btn-warning btn-lg" onClick={ () => this.cancel() } >Cancel</button>}
          { onDelete && isOwner && <button type="button" className="btn btn-danger btn-lg" onClick={onDelete} >Delete</button> }
        </div>
      </div>
    </form>
    
  }
}

CampaignLog = reduxForm({
  form: 'campaignLog',
})(CampaignLog);

export default connect(mapStateToProps)(CampaignLog);