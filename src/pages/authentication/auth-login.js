// custom style components
import './auth-login.css';
// custom functions components
import Validator from '../../scripts/validator.class';
// custom components
import AuthForm from "../../components/layout/auth-form";
import TextInput from '../../components/form/auth-text-input';


const LoginPage = () => {

  const clearError = () => {
    const errorElement = document.getElementById('login-form-error');
    if (errorElement.style.display === 'block') errorElement.style.display = 'none';
  };

  const submit = (event) => {
    
    event.preventDefault();

    // form inputs
    const emailInput = document.getElementById('user-email');
    const passInput = document.getElementById('user-pass');
    // form elements
    const errorElement = document.getElementById('login-form-error');

    const validator = new Validator();

    try {
      if (emailInput.value === '' && passInput.value === '') throw 'Please enter your\'s credentials.';
      else if (emailInput.value === '' || passInput.value === '') throw 'Invalid user email or password';
      // login validation
      else if (!validator.email(emailInput.value)) throw 'Invalid user email or password';
      // password validation
      else if (!validator.length(passInput.value, 8)) throw 'Invalid user email or password';
      else if (!validator.alphanumeric(passInput.value)) throw 'Invalid user email or password';
      else if (!validator.upperLowerCase(passInput.value)) throw 'Invalid user email or password';
      else if (!validator.numberSymbol(passInput.value)) throw 'Invalid user email or password';
    } catch (error) {
      errorElement.textContent = error;
      errorElement.style.display = 'block';
    }

  };
  
  return (
    <AuthForm id="login" method="POST" onSubmit={submit}>
      <TextInput inputType="text" id="user-email" name="userEmail" placeholder="Email address" onInput={clearError}/>
      <TextInput inputType="password" id="user-pass" name="userPass" placeholder="Password" onInput={clearError}/>
    </AuthForm>
  );
};

export default LoginPage;