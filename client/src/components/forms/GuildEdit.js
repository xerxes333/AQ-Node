import React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import { Field, FieldArray, reduxForm, arrayPush} from 'redux-form';
import { fetchGuild, updateGuild } from '../../actions/guildActions'
import { fetchCampaigns, updateCampaign } from '../../actions/campaignActions';

import HeroesDropdown from './fields/HeroesDropdown';
import PetsDropdown from './fields/PetsDropdown';
import ItemsDropdown from './fields/ItemsDropdown';
import CursesDropdown from './fields/CursesDropdown';
import HeroSetDropdown from './fields/HeroSetDropdown'
import ItemSetDropdown from './fields/ItemSetDropdown'

function mapStateToProps(store) {
  return { 
    guild: store.guilds.guild,
    guildFetched: store.guilds.guildFetched,
    isEditing: store.guilds.isEditing,
    campaigns: store.campaigns.campaigns,
    campaignsFetched: store.campaigns.fetched,
    editGuildForm: store.form.editGuild,
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

const renderFieldGuildAnimal = ({input, label, type, meta: { touched, error, warning } }) => {
  
  const animals = ["Lion","Panda","Fox","Eagle","Tiger","Crow","Serpent","Shark"] // TODO: move this to backend DB
  const hasError = touched && error ? "has-error" : "";
  const imgName = (input.value)? input.value.toLowerCase() : 'none'
  
  return (
    <div className={`form-group ${hasError}`}>
      <label className="control-label"> Logo </label>
      <div className="input-group">
        <Field name="guildAnimal" component="select" className="form-control" >
          <option value="">-- Select --</option>
          {animals.map( (animal, index) => {return <option value={animal} key={index} > {animal} </option>} )}
        </Field>
        <span className="input-group-addon guild-icon-addon">
          <img src={require(`../../../public/images/guilds/${imgName}.png`)} className="img-responsive guild-name-icon-32" alt="logo"/>
        </span>
      </div>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>              
  );
}

const renderItems = ({ fields, filter, meta: { error } }) => {
  return (
    <ul className="list-unstyled">
      <li>
        <button type="button" className="btn btn-success btn-block btn-add-item" onClick={() => fields.push({})}>
          <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Item
        </button>
      </li>
      
      {fields.map((item, index) =>
        <li key={index}>
          <ItemsDropdown name={`${item}.id`} index={index} key={index} itemId={fields.get(index).id} onClick={() => fields.remove(index)} filter={filter.items}/>
        </li>
      )}
      {error && <li className="error">{error}</li>}
    </ul>
  )
}

const renderCurses = ({ fields, filter, meta: { error } }) => {
  return (
    <ul className="list-unstyled">
      <li>
        <button type="button" className="btn btn-curse btn-block btn-add-item" onClick={() => fields.push({})}>
          <span className="glyphicon glyphicon-flash" aria-hidden="true"></span> Add Curse
        </button>
      </li>
      {fields.map((curse, index) =>
        <li key={index}>
          <CursesDropdown name={`${curse}.id`} index={index} key={index} curseId={fields.get(index).id} onClick={() => fields.remove(index)} filter={filter.items}/>
        </li>
      )}
      {error && <li className="error">{error}</li>}
      
    </ul>
  )
}

const renderHeroes = ({ fields, form, filter, meta: { touched, error } }) => {
  /* This part is pretty convoluted so here is whats going on:
   * We begin by reducing the fields into multiple chunks (arrays) that are
   * no longer than HEROES_PER_ROW. Next we map each chunk into a row of heroes
   * but we have to do some math (seq) to keep the hero number sequential
   * across all chunks.
   */
  const HEROES_PER_ROW = 4
  var rows = fields.reduce((chunk, field, index) => {
    if(index % HEROES_PER_ROW === 0) 
      chunk.push([]);
    chunk[chunk.length - 1].push(field);
    return chunk;
  }, [])
  .map((chunk, i) => (
      <div className="row guild-hero-section" key={i}>
        {chunk.map((hero, j) => {
          var seq = i * HEROES_PER_ROW + j
          return (
            <div className="col-md-3 guild-hero-info" key={seq} >
              <HeroesDropdown name={`${hero}.id`} index={seq} key={seq} removeHero={()=>{fields.remove(seq)}} filter={filter.heroes}/>
              <FieldArray name={`${hero}.items`} component={renderItems} filter={filter} />
              <FieldArray name={`${hero}.curses`} component={renderCurses} filter={filter} />
            </div>
          )})
        }
      </div>
    ))
  
  return <div> {rows} </div>
  
};

const renderPets = ({ fields, form, filter, meta: { touched, error } }) => {
  const PETS_PER_ROW = 4
  var rows = fields.reduce((chunk, field, index) => {
    if(index % PETS_PER_ROW === 0) 
      chunk.push([]);
    chunk[chunk.length - 1].push(field);
    return chunk;
  }, [])
  .map((chunk, i) => (
      <div className="row guild-hero-section" key={i}>
        {chunk.map((pet, j) => {
          var seq = i * PETS_PER_ROW + j
          return (
            <div className="col-md-3 guild-hero-info" key={seq} >
              <PetsDropdown name={`${pet}.id`} index={seq} key={seq} removePet={()=>{fields.remove(seq)}} filter={filter.pets}/>
              <FieldArray name={`${pet}.items`} component={renderItems} filter={filter} />
            </div>
          )})
        }
      </div>
    ))
  
  return <div> {rows} </div>
  
};

const validate = values => {
  const errors = {}
  
  if (!values.guildName) {
    errors.guildName = 'Required'
  } else if (values.guildName.length > 30) {
    errors.guildName = 'Must be 30 characters or less'
  }
  
  if (!values.guildAnimal || values.guildAnimal === "") {
    errors.guildAnimal = 'Required'
  }
  
  return errors
}

class GuildEdit extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      newGuild: false,
      invitations: [],
      filterHeroes: false,
      filterItems: false,
      filterPets: "1",
    }
  }
  
  filterHeroSet(event) {
    if(event.target.value === "" || !event.target.value)
      this.setState({filterHeroes: false});
    this.setState({filterHeroes: event.target.value})
  }
  
  filterItemSet(event) {
    if(!event.target.value)
      this.setState({filterItems: false});
    this.setState({filterItems: event.target.value});
  }
  
  filterPetLevel(event) {
    if(!event.target.value)
      this.setState({filterPets: false});
    this.setState({filterPets: event.target.value});
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
      guildCoin: guild.coin ? 1 : 0,
      heroes: guild.heroes.map((hero) => {
        return {
          id: hero.hero_id._id,
          items: hero.items.map((item) => {
            return {id: item._id}
          }),
          curses: (hero.curses)? hero.curses.map((curse) => {
            return {id: curse._id}
          }) : []
        }
      }),
      pets: (guild.pets) ? guild.pets.map((pet) => {
        return {
          id: pet.pet_id._id,
          items: pet.items.map((item) => {
            return {id: item._id}
          })
        }
      }) : [],
      // attempting to combine heroes + pets so we only have to render one FieldArray
      // concat: guild.heroes.concat(guild.pets)
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
    
    if(confirm("Are you sure you want to leave the Campaign?")) {  
      this.props.dispatch( updateGuild(guild._id, {campaign: "LEAVE"}) );
      this.props.dispatch( updateCampaign(guild.campaign._id, {guilds: removedGuild, players: removedPlayer}) );
    }
    
  }
  
  renderCampaignField(){
    
    const { guild } = this.props;

    if(guild && guild.campaign)
      return <button type="button" className="btn btn-warning btn-block btn-leave-campaign" onClick={ () => this.leaveGuild() } >Leave Campaign</button>
 
    return <div className="form-group">
      <label htmlFor="guildCamapignCode">Campaign</label>
      <Field name="guildCamapignCode"  component="input" type="text" className="form-control" placeholder="Share Code"/>
    </div>
    
  }
  
  appendHero(){
    this.props.dispatch(arrayPush('editGuild', 'heroes', {}))
  }
  
  appendPet(){
    this.props.dispatch(arrayPush('editGuild', 'pets', {}))
  }
  
  render() {
    
    const { handleSubmit, onDelete, editGuildForm } = this.props;
    
    // validation rules
    // const required = value => value ? undefined : 'Required'
    // const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
    // const maxLength30 = maxLength(30)
    
    const imgName = (editGuildForm && editGuildForm.values.guildAnimal)?
      editGuildForm.values.guildAnimal.toLowerCase()
      : 'none'
    
    return (
      <div className="row guild-info-edit">
        <div className="col-md-12 col-xs-12">
        
          <form onSubmit={handleSubmit}>  
            <div className="row">
            
              <div className="col-md-2">
                <Field name="guildAnimal" type="text" component={renderFieldGuildAnimal} label="Logo" imgName={imgName} />
              </div>
              
              <div className="col-md-3">
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
              
              <div className="col-md-1">
                <div className="form-group">
                  <label htmlFor="guildCoin">Coin</label>
                  <Field name="guildCoin" component="select" className="form-control">
                    <option />
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Field>
                </div>
              </div>
            </div>
            
            <FieldArray name="heroes" component={renderHeroes} filter={{heroes: this.state.filterHeroes, items: this.state.filterItems, curses: this.state.filterItems}}/>
            <FieldArray name="pets" component={renderPets} filter={{pets: this.state.filterPets, items: this.state.filterItems}}/>
            
            <div className="row guild-controls"> 
              <div className="col-md-12">
                <div className="well">

                  <div className="row">
                    <div className="col-md-2">
                      <button type="button" className="btn btn-success btn-block btn-add-hero" onClick={ () => this.appendHero() }>
                        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Hero
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-success btn-block btn-add-pet" onClick={ () => this.appendPet() }>
                        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Pet
                      </button>
                    </div>
                    <div className="col-md-2">
                      <HeroSetDropdown handleChange={this.filterHeroSet.bind(this)}/>
                    </div>  
                    <div className="col-md-2">
                      <ItemSetDropdown handleChange={this.filterItemSet.bind(this)}/>
                    </div>  
                    <div className="col-md-2">
                      <div className="form-group">
                        <select className="form-control" onChange={this.filterPetLevel.bind(this)} >
                          <option value="1">Pet Level 1</option>
                          <option value="2">Pet Level 2</option>
                          <option value="3">Pet Level 3</option>
                        </select>
                      </div>
                    </div>  
                  </div>
            
                </div>
              </div>
            </div>

            
            <div className="row guild-edit-buttons">
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