// 3rd party components
import { useContext, useState } from 'react';
// custom style components
import './auth-login.css';
// custom functions components
import Validator from '../../scripts/validator.class';
// custom components
import AuthForm from "../../components/layout/auth-form";
import TextInput from '../../components/form/auth-text-input';
import ServerContext from '../../store/server-context';


const LoginPage = () => {

  const server = useContext(ServerContext);

  const clearError = () => {
    const errorElement = document.getElementById('login-form-error');
    if (errorElement.style.display === 'block') errorElement.style.display = 'none';
  };

  const submit = () => {

    let isFormValid = true;
    let formData = {};

    // form inputs
    const emailInput = document.getElementById('user-email');
    const passInput = document.getElementById('user-pass');
    // form elements
    const errorElement = document.getElementById('login-form-error');

    const validator = new Validator();

    try {
      if (emailInput.value === '' && passInput.value === '') throw 'Please enter your\'s credentials.';
      else if (emailInput.value === '' || passInput.value === '') throw 'Invalid user email or password';
      else if (!validator.email(emailInput.value)) throw 'Invalid user email or password';
      else {
        formData.userEmail = emailInput.value;
        formData.userPass = passInput.value;
      }
    } catch (error) {
      errorElement.textContent = error;
      errorElement.style.display = 'block';
      isFormValid = false;
    }

    return isFormValid ? formData : null;
  };
  
  return (
    <AuthForm id="login" action={server.authenticationLoginUser} method="POST" data={submit}>
      <TextInput inputType="text" id="user-email" name="userEmail" placeholder="Email address" onInput={clearError}/>
      <TextInput inputType="password" id="user-pass" name="userPass" placeholder="Password" onInput={clearError}/>
    </AuthForm>
  );
};

export default LoginPage;