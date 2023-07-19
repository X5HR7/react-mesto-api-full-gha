const Form = props => {
  return (
    <form name={`form-${props.name}`} className={`form form_type_${props.name}`} onSubmit={props.onSubmit}>
      {props.children}
      <button className='form__button-submit' type='submit'>
        {props.buttonText}
      </button>
    </form>
  );
};

export default Form;
