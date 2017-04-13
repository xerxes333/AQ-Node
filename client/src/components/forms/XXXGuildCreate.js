import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form';
// import HeroesDropdown from './fields/HeroesDropdown';
import HeroesDropdown from './fields/HeroesDropdown2';
import ItemsDropdown from './fields/ItemsDropdown';


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

const renderItems = ({ fields, meta: { error } }) => (
  <ul className="list-unstyled">
    <li>
      <button type="button" className="btn btn-success btn-sm" onClick={() => fields.push({})}>Add Item</button>
    </li>
    {fields.map((item, index) =>
      <li key={index}>
        <ItemsDropdown name={`${item}.id`} index={index} key={index} onClick={() => fields.remove(index)}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

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
            <div className="col-md-3" key={seq} style={{border: "1px solid #CCCCCC"}}>
              <HeroesDropdown form={form} name={`${hero}.id`} index={seq} key={seq} />
              <FieldArray name={`${hero}.items`} component={renderItems} />
            </div>
          )})
        }
      </div>
    ))
  
  return <fieldset>
    <legend>
      Heroes
      <button type="button" className="btn btn-success" disabled="" onClick={() => fields.push({})}>Add Hero</button>
      {touched && error && <span>{error}</span>}
    </legend>
    {rows}
  </fieldset>
};

const GuildCreateForm = (props) => {
    
    const { handleSubmit } = props;
    const animals = ["Lion","Panda","Fox","Eagle","Tiger","Crow","Serpent","Shark"]
    
    // validation rules
    const required = value => value ? undefined : 'Required'
    const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
    const maxLength15 = maxLength(15)
    
    return (
      <form onSubmit={handleSubmit}>
        
        <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <label > Logo </label>
              <Field name="guildAnimal" component="select" className="form-control">
                <option value="">-- Select --</option>
                {animals.map( (animal, index) => {return <option value={animal} key={index}> {animal} </option>} )}
              </Field>
            </div>
          </div>
          <div className="col-md-5">
            <Field name="guildName" type="text" component={renderField} validate={[ required, maxLength15 ]} label="Name" />
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="guildDescription">Description</label>
              <Field name="guildDescription"  component="input" type="text" className="form-control" placeholder="Description" />
            </div>
          </div>
        </div>
        
        <FieldArray name="heroes" component={renderHeroes} />
        
        <button type="submit" className="btn btn-primary">Save</button>
        
      </form>
    );
}



export default reduxForm({
  form: 'guildCreate',
  initialValues: {
    heroes: [{},{},{},{}]
  }
})(GuildCreateForm)