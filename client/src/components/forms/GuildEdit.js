import React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import { Field, FieldArray, reduxForm, arrayPush } from 'redux-form';
import { fetchGuild, updateGuild } from '../../actions/guildActions'
import { fetchCampaigns, leaveCampaign } from '../../actions/campaignActions';

import HeroesDropdown from './fields/HeroesDropdown';
import PetsDropdown from './fields/PetsDropdown';
import ItemsDropdown from './fields/ItemsDropdown';
import CursesDropdown from './fields/CursesDropdown';
import HeroSetDropdown from './fields/HeroSetDropdown'
import ItemSetDropdown from './fields/ItemSetDropdown'
import PetLevelDropdown from './fields/PetLevelDropdown'

function mapStateToProps(store) {
  return { 
    guilds: store.guilds,
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
    <div className={`form-group form-group-fat ${hasError}`}>
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
      <div className="input-group input-group-fat">
        <Field name="guildAnimal" component="select" className="form-control" >
          <option value="">-- Select --</option>
          {animals.map( (animal, index) => {return <option value={animal} key={index} > {animal} </option>} )}
        </Field>
        <span className="input-group-addon guild-icon-addon">
          <img src={require(`../../../public/images/guilds/${imgName}.png`)} className="img-responsive foo2" alt="logo"/>
        </span>
      </div>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>              
  );
}

const renderItems = ({ fields, filter, meta: { error } }) => {
  return (
    <ul className="list-unstyled hero-item-list">
      <li>
        <button type="button" className="btn btn-success btn-block btn-add-item btn-lg" onClick={() => fields.push({})}>
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
    <ul className="list-unstyled hero-curse-list">
      <li>
        <button type="button" className="btn btn-curse btn-block btn-add-item btn-lg" onClick={() => fields.push({})}>
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
      browserHistory.push(`/guilds/`)
    window.scrollTo(0, 0)
  }

  initializeForm(){
    const guild = this.props.guild
    
    return {
      guildAnimal: guild.type,
      guildName: guild.name,
      guildDescription: guild.description,
      guildCampaign: guild.campaign ? guild.campaign._id : null,
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
    
    if(confirm("Are you sure you want to leave the Campaign?")) {  
      this.props.dispatch( updateGuild(guild._id, {campaign: "LEAVE"}) );
      this.props.dispatch( leaveCampaign(guild) );
    }
  }
  
  renderCampaignField(){
    
    const { guild } = this.props;
    
    // WARNING: This is a dirty hack to show the Campaign Code errors
    // I tried to throw a submissionError in handleSubmit but could not get it working properly
    // due to using async functions with redux thunks.  I've been stuck for over a week
    // trying to get it working so this is fine for now.
    const campaignErrorHack = (this.props.guilds.error) ? {error: this.props.guilds.errorMessage, touched: true} : {}
    
    if(guild && guild.campaign)
      return <button type="button" className="btn btn-warning btn-block btn-fat btn-leave-campaign" onClick={ () => this.leaveGuild() } >Leave Campaign</button>

    return <Field name="guildCamapignCode" type="text" component={renderField} label="Campaign" meta={campaignErrorHack}/>
    
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
                <Field name="guildDescription" type="text" component={renderField} label="Description" />
              </div>
              
              <div className="col-md-2">
                {this.renderCampaignField()}
              </div>
              
              <div className="col-md-1">
                <div className="form-group form-group-fat">
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
                      <button type="button" className="btn btn-success btn-block btn-fat" onClick={ () => this.appendHero() }>
                        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Hero
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-success btn-block btn-fat" onClick={ () => this.appendPet() }>
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
                      <PetLevelDropdown handleChange={this.filterPetLevel.bind(this)}/>
                    </div>  
                  </div>
            
                </div>
              </div>
            </div>

            
            <div className="row guild-edit-buttons">
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={this.props.guilds.updating}>Save</button>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-warning btn-lg btn-block" onClick={ () => this.cancel() } >Cancel</button>
              </div>
              <div className="col-md-2">
                { onDelete && <button type="button" className="btn btn-danger btn-lg btn-block" onClick={onDelete} >Delete</button> }
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