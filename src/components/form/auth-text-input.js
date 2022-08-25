// custom style components
import './auth-text-input.css';
// custom functions components
import Validator from '../../scripts/validator.class';


// text input
const TextInput = (props) => {
  
  const clearError = () => {
    const errorElement = document.getElementById(props.id + '-error');
    if (errorElement.style.display === 'block') errorElement.style.display = 'none';
  };

  if (props.inputType === 'text') {
    return (
      <div id={props.id + '-input-container'} className="form-input text-input">     
        {/* input error message */}
        <p id={props.id + "-error"} className="input-error"></p>
        {/* input label */}
        {props.label ? <label htmlFor={props.id}>{props.label}<br /></label> : null}
        {/* text input element */}
        <input type="text" id={props.id} name={props.name} placeholder={props.placeholder} 
               onInput={event => {
                  clearError();
                  props.onInput(event.target.value);
                }} />
      </div>
    );
  }

  if (props.inputType === 'password') {

    const togglePass = (inputId) => {
      const passInput = document.getElementById(inputId);
      const passToggle = document.getElementById(inputId + '-toggle');

      passInput.type = passInput.type == 'password' ? 'text' : 'password';
      passToggle.style.backgroundImage = passInput.type == 'password' ? 'url(/img/auth/hidden.png)' : 'url(/img/auth/view.png)';
    };

    const showRequirements = () => {
      if (props.requirements) document.getElementById('user-pass-requirements').style.display = 'block';
    };
    const hideRequirements = () => {
      if (props.requirements) document.getElementById('user-pass-requirements').style.display = 'none';
    };

    const passValidation = (value) => {

      const lengthRule = document.getElementById('password-length');
      const caseRule = document.getElementById('password-letters');
      const symbolRule = document.getElementById('password-symbols');
      const alphanumericRule = document.getElementById('password-alpha-num');

      const validator = new Validator();
        
      if (validator.length(value, 8)) {
        lengthRule.style.color = 'green';
      } else {
        lengthRule.style.color = '#7e7e7e';
      }
  
      if (validator.upperLowerCase(value)) {
        caseRule.style.color = 'green';
      } else {
        caseRule.style.color = '#7e7e7e';
      }
  
      if (validator.numberSymbol(value)) {
        symbolRule.style.color = 'green';
      } else {
        symbolRule.style.color = '#7e7e7e';
      }
  
      if (validator.alphanumeric(value)) {
        alphanumericRule.style.color = 'green';
      } else {
        alphanumericRule.style.color = '#7e7e7e';
      }
    };

    return (
      <>
        <div className="form-input pass-input" onFocus={showRequirements} onBlur={hideRequirements}>      
          {/* input error message */}
          <p id={props.id + "-error"} className="input-error"></p>
          {/* input label */}
          {props.label ? <label htmlFor={props.id}>{props.label}<br /></label> : null}
          {/* input element */}
          <input type="password" id={props.id} name={props.name} placeholder={props.placeholder} 
                 onInput={event => {
                    clearError();
                    props.onInput(event.target.value);
                    passValidation(event.target.value);
                  }} />
          {/* password input show/hide toggle button */}
          <input type="button" className="show-hide-btn" id={props.id + '-toggle'} onClick={event => togglePass(props.id)} />
        </div>
        {/* [assword requirements] */}
        <section id="user-pass-requirements" className="input-requirements">
          <strong><p>Create a password that:</p></strong>
          <ul id="user-pass-requirements-list">
            <li id="password-length">contains at least 8 characters</li>
            <li id="password-letters">contains both lower (a-z) and upper case letters (A-Z)</li>
            <li id="password-symbols">contains at least one number (0-9) or underscore symbol</li>          
            <li id="password-alpha-num">does not contain non alphanumeric symbols</li>
          </ul>
        </section>
      </>
    );
  }

};

export default TextInput;