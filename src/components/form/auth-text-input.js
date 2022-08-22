// custom style components
import './auth-text-input.css';


// text input
const TextInput = (props) => {

  if (props.inputType === 'text') {
    return (
      <div id={props.id + '-input-container'} className="form-input text-input" onBlur={event => props.onBlur(event)}>     
        {/* input label */}
        {props.label ? <label htmlFor={props.id}>{props.label}<br /></label> : null}
        {/* text input element */}
        <input type="text" id={props.id} name={props.name} placeholder={props.placeholder} onInput={() => props.onInput()} />
        {/* input error message */}
        {props.error ? <p id={props.id + "-error"} className="input-error">{message}</p> : null}

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

    return (
      <div className="form-input pass-input">      
        {/* input label */}
        {props.label ? <label htmlFor={props.id}>{props.label}<br /></label> : null}
        {/* input element */}
        <input type="password" id={props.id} name={props.name} placeholder={props.placeholder} onInput={() => props.onInput()} />
        {/* password input show/hide toggle button */}
        <input type="button" className="show-hide-btn" id={props.id + '-toggle'} onClick={event => togglePass(props.id)} />
        {/* input error message */}
        {props.error ? <p id={props.id + "-error"} className="input-error"></p> : null}
      </div>
    );
  }

};

export default TextInput;















// password input
// export const PasswordInput = (props) => {

//   const togglePass = (inputId) => {
//     const passInput = document.getElementById(inputId);
//     const passToggle = document.getElementById(inputId + '-toggle');

//     if (passInput.type == 'password') {
//       passInput.type = 'text';
//       passToggle.style.backgroundImage = 'url(/img/auth/view.png)';
//     } else {
//       passInput.type = 'password';
//       passToggle.style.backgroundImage = 'url(/img/auth/hidden.png)';
//     }
//   };

//   return (
//     <div className="form-input pass-input">
//       {props.label ? <label htmlFor={props.id}>{props.label}<br /></label> : null}     
//       <input type="password" id={props.id} name={props.name} placeholder={props.placeholder} value={props.value}/>
//       <input type="button" className="show-hide-btn" id={props.id + '-toggle'} value="" onClick={event => togglePass(props.id)}></input>
//       {props.error ? InputError(props.id, props.error) : null}
//     </div>
//   );
// };