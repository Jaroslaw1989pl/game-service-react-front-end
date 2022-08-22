// 3rd party components
import { Link } from 'react-router-dom';
// custom style components
import './auth-form.css';


// text input
const AuthForm = (props) => {

  const submitValue = (formId) => {
    let value;
    switch (formId) {
      case 'login':
        value = 'Sign in';
        break;
      case 'registration':
        value = 'Sign up';
        break;
      case 'reset-password':
        value = 'Send email';
        break;
    }
    return value;
  };

  return (
    <main>

      <div id="content-left">

        <Link to="/" id="home-link">Playfab</Link>
        <p>Sign in or create an account</p>

      </div>

      <div id="content-right">

        <div id={props.id + '-panel'} className="auth-panel">

          <header id={props.id + '-panel-header'} className="auth-panel-header">
            <h1></h1>
            <p><Link to={props.id === 'login' ? '/registration' : '/login'}></Link></p>
          </header>

          <p id={props.id + '-form-error'} className="form-error"></p>

          <form action={'/' + props.id} method={props.method}>

            {props.children}

            <input 
              type="submit" id={props.id + '-form-submit-btn'} className="form-submit-btn" 
              value={submitValue(props.id)} onClick={event => props.onSubmit(event)}
            />

          </form>

          {props.id === 'login' && <p>Forgot password? <Link to="/reset-password">Reset password</Link></p>}
          {props.id === 'reset-password' && <p>Try to <Link to="/login">sign in to a different account</Link>?</p>}

        </div>

      </div>

    </main>
  );
};

export default AuthForm;