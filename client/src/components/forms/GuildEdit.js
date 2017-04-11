import React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { fetchGuild, updateGuild } from '../../actions/guildActions'
import { fetchCampaigns, updateCampaign } from '../../actions/campaignActions';

import HeroesDropdown from './fields/HeroesDropdown2';
import ItemsDropdown from './fields/ItemsDropdown';

function mapStateToProps(store) {
  return { 
    guild: store.guilds.guild,
    guildFetched: store.guilds.guildFetched,
    isEditing: store.guilds.isEditing,
    campaigns: store.campaigns.campaigns,
    campaignsFetched: store.campaigns.fetched
  };
}

const renderField = ({input, label, type, meta: { touched, error, warning } }) => {
  const hasError = touched && error ? "has-error" : "";
  return (
    <div className={`form-group ${hasError}`}>
      <label htmlFor={input.name} className="control-label">{label}</label>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
}

const renderItems = ({ fields, meta: { error } }) => {
  return (
    <ul className="list-unstyled">
      <li>
        <button type="button" className="btn btn-success btn-sm" onClick={() => fields.push({})}>
          <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Item
        </button>
      </li>
      {fields.map((item, index) =>
        <li key={index}>
          <ItemsDropdown name={`${item}.id`} index={index} key={index} onClick={() => fields.remove(index)}/>
        </li>
      )}
      {error && <li className="error">{error}</li>}
    </ul>
  )
}

const renderHeroes = ({ fields, form, meta: { touched, error } }) => {
  
  /* This part is pretty convoluted so here is whats going on:
   * We begin by reducing the fields into multiple chunks (arrays) that are
   * no longer than HEROES_PER_ROW. Next we map each chunk into a row of heroes
   * but we have to do some math (seq) to keep the hero number sequential
   * across all chunks.
   */
  const HEROES_PER_ROW = 4
  var rows = fields.reduce((chunk, field, index) => {
    if(index % HEROES_PER_ROW === 0) chunk.push([]);
    chunk[chunk.length - 1].push(field);
    return chunk;
  }, [])
  .map((chunk, i) => (
      <div className="row" key={i}>
        {chunk.map((hero, j) => {
          var seq = i * HEROES_PER_ROW + j
          return (
            <div className="col-md-3" key={seq} >
              <HeroesDropdown name={`${hero}.id`} index={seq} key={seq} removeHero={()=>{fields.remove(seq)}}/>
              <FieldArray name={`${hero}.items`} component={renderItems} />
            </div>
          )})
        }
      </div>
    ))
  
  return <fieldset>
    <legend>
      Heroes
      <button type="button" className="btn btn-success" disabled="" onClick={() => fields.push({})}>
        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Hero
      </button>
      {touched && error && <span>{error}</span>}
    </legend>
    {rows}
  </fieldset>
};

const validate = values => {
  const errors = {}
  
  if (!values.guildName) {
    errors.guildName = 'Required'
  } else if (values.guildName.length > 30) {
    errors.guildName = 'Must be 30 characters or less'
  }
  
  // if (!values.guildAnimal || values.guildAnimal === "") {
  //   errors.guildAnimal = 'Required'
  // }
  
  return errors
}

class GuildEdit extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      newGuild: false,
      invitations: []
    };
  }
  
  componentWillMount() {
    
    if(!this.props.campaignsFetched)
      this.props.dispatch(fetchCampaigns());
    
    if(this.props.id === undefined || this.props.id === ""){
      // Creating new guild so initialize default empty form
      this.props.initialize( { heroes: [{},{},{},{}] } );
      this.setState({newGuild: true});
    } else {
      // Make sure the Guild we are editing is the guild in the store
      if(this.props.id !== this.props.guild._id)
        this.props.dispatch(fetchGuild(this.props.id));
      this.props.initialize(this.initializeForm());
    }
    
    
  }
  
  cancel() {
    const { isEditing } = this.props;
    if(isEditing)
      this.props.dispatch({type: "EDIT_GUILD", payload: !this.props.isEditing})
    else
      browserHistory.push(`/guilds/`);
  }

  initializeForm(){
    const guild = this.props.guild
    return {
      guildAnimal: guild.type,
      guildName: guild.name,
      guildDescription: guild.description,
      heroes: guild.heroes.map((hero) => {
        return {
          id: hero.hero_id._id,
          items: hero.items.map((item) => {
            return {id: item._id}
          })
        }
      })
    }
  }
  
  leaveGuild(){
    const { guild } = this.props
    const campaign = guild.campaign
    
    const removedGuild = campaign.guilds.filter(function(g) { return g !== guild._id })
    const removedPlayer = campaign.players.filter(function(p) { 
      if(p === campaign.created_by) // the creator of the campaign can NOT leave
        return p
      else
        return p !== guild.user_id._id 
    })
    
    
    this.props.dispatch( updateGuild(guild._id, {campaign: "LEAVE"}) );
    this.props.dispatch( updateCampaign(guild.campaign._id, {guilds: removedGuild, players: removedPlayer}) );
  }
  
  renderCampaignField(){
    
    const { guild } = this.props;

    if(guild && guild.campaign)
      return <button type="button" className="btn btn-warning" onClick={ () => this.leaveGuild() } >Leave Campaign</button>
 
    return <div className="form-group">
      <label htmlFor="guildCamapignCode">Campaign</label>
      <Field name="guildCamapignCode"  component="input" type="text" className="form-control" placeholder="Share Code"/>
    </div>
    
  }

  
  render() {
    
    const { handleSubmit, onDelete } = this.props;
    const animals = ["Lion","Panda","Fox","Eagle"]; // TODO: move this to backend DB
    
    // validation rules
    // const required = value => value ? undefined : 'Required'
    // const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
    // const maxLength30 = maxLength(30)
    
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12">
        
          <form onSubmit={handleSubmit}>  
            <div className="row">
              <div className="col-md-2">
                <div className="form-group">
                  <label > Logo </label>
                  <Field name="guildAnimal" component="select" className="form-control" >
                    <option value="">-- Select --</option>
                    {animals.map( (animal, index) => {return <option value={animal} key={index} > {animal} </option>} )}
                  </Field>
                </div>
              </div>
              <div className="col-md-4">
                <Field name="guildName" type="text" component={renderField} label="Name" />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="guildDescription">Description</label>
                  <Field name="guildDescription"  component="input" type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-2">
                {this.renderCampaignField()}
              </div>
            </div>
            
            <FieldArray name="heroes" component={renderHeroes} />
            
            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-warning" onClick={ () => this.cancel() } >Cancel</button>
                { onDelete && <button type="button" className="btn btn-danger" onClick={onDelete} >Delete</button> }
              </div>
            </div>
            
          </form>
    
        </div>
      </div>
      
    );
    
  }
}

GuildEdit = reduxForm({
  form: 'editGuild',
  validate
})(GuildEdit);

export default connect(mapStateToProps)(GuildEdit);