import React from 'react'
import { connect } from "react-redux";
import { reduxForm } from 'redux-form'
import { fetchGuilds } from '../../actions/guildActions'
import GuildsDropdown from './fields/GuildsDropdown'
import CampaignGuild from '../CampaignGuild'

function mapStateToProps(store) {
  return {
    guilds: store.guilds.guilds,
    guild: store.guilds.guild || {},
    guildsFetched: store.guilds.fetched,
  };
}

class AvailableGuilds extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      selectedGuildID: null,
      localGuild: {}
    }
  }
  
  componentWillMount() {
    if(!this.props.guilds)
      this.props.dispatch( fetchGuilds({available: true}) )
  }
  
  handleChange = (e,p) => {
    this.setState((prevState) => {
      return {
        selectedGuildID: e.target.value,
        localGuild: this.props.guilds.find((guild)=>{
          return guild._id === e.target.value
        }),
      }
    })
  }

  render(){
    
    const { handleSubmit, guilds, index, guildsFetched } = this.props;
    
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="guild" > Add My Guild </label>
          <GuildsDropdown guilds={guilds} index={index} onChange={ (event)=>{this.handleChange(event, this.props)} }/>
        </div>
        <button type="submit" className="btn btn-success btn-block btn-lg" >Add</button>
        {this.state.selectedGuildID && guildsFetched && <CampaignGuild guild={this.state.localGuild} isPreview="1" />}
      </form>
    );
    
  }

}

AvailableGuilds = reduxForm({
  // form: 'availableGuilds'
})(AvailableGuilds);

export default connect(mapStateToProps)(AvailableGuilds);
