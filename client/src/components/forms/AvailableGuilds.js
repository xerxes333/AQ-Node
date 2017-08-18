import React from 'react'
import { connect } from "react-redux";
import { reduxForm } from 'redux-form'
import { fetchGuild, fetchGuilds } from '../../actions/guildActions'
import GuildsDropdown from './fields/GuildsDropdown'

function mapStateToProps(store) {
  return {
    guilds: store.guilds.guilds,
  };
}

class AvailableGuilds extends React.Component {
  
  componentWillMount() {
    this.props.dispatch( fetchGuilds({available: true}) )
  }
  
  handleChange = (e,p) => {
    this.props.dispatch(fetchGuild(e.target.value));
  }

  render(){
    
    const { handleSubmit, guilds } = this.props;
    return (
      <form onSubmit={handleSubmit}>
      
        <div className="form-group">
          <label htmlFor="guild" > Add My Guild </label>
          <GuildsDropdown guilds={guilds} index={1} onChange={ (event)=>{this.handleChange(event, this.props)} }/>
        </div>
        <button type="submit" className="btn btn-success btn-block btn-lg" >Add</button>
        
      </form>
    );
    
  }

}

AvailableGuilds = reduxForm({
  form: 'availableGuilds'
})(AvailableGuilds);

export default connect(mapStateToProps)(AvailableGuilds);
