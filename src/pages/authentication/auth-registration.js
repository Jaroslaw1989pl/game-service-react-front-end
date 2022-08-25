// 3rd party components
import { useState } from 'react';
// custom style components
import './auth-registration.css';
// custom functions components
import Validator from '../../scripts/validator.class';
// custom components
import AuthForm from "../../components/layout/auth-form";
import TextInput from '../../components/form/auth-text-input';
import AvatarCheckbox from '../../components/form/auth-checkbox-input';


const RegistrationPage = () => {

  const validator = new Validator();
  
  const [avatar, setAvatar] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();
  const [passConf, setPassConf] = useState();

  let formData = {};

  const emailValidation = (value) => {
    const url = 'http://smart-home-php-server.pl/authentication/find-email?email=' + value;
    validator.uniqueness(url)
    .then(result => console.log('result', result))
    .catch(error => console.log('error'));
  };

  const submit = (event) => {
    
    event.preventDefault();
    
    const avatarError = document.getElementById('user-avatar-error');
    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const userEmailError = document.getElementById('user-email-error');
    const userPassError = document.getElementById('user-pass-error');
    const passConfError = document.getElementById('pass-conf-error');

    let isFormValid = true;

    // avatar validation
    if (!avatar) {
      avatarError.style.display = 'block';
      isFormValid = false;
    } else {
      formData.avatar = avatar;
    }

    // first name validation
    try {
      if (!firstName || firstName.length === 0) throw 'Please enter your first name.';
      else if (!validator.specialCharacters(firstName)) throw 'First name can\'t contain special characters.';
      else formData.firstName = firstName;
    } catch (error) {
      firstNameError.textContent = error;
      firstNameError.style.display = 'block';
      isFormValid = false;
    }

    // first name validation
    try {
      if (!lastName || lastName.length === 0) throw 'Please enter your last name.';
      else if (!validator.specialCharacters(lastName)) throw 'Last name can\'t contain special characters.';
      else formData.lastName = lastName;
    } catch (error) {
      lastNameError.textContent = error;
      lastNameError.style.display = 'block';
      isFormValid = false;
    }

    // email address validation
    try {
      if (!userEmail || userEmail.length === 0) throw 'Please enter your email.';
      else if (!validator.email(userEmail)) throw 'Incorrect email address.';
      else formData.userEmail = userEmail;
    } catch (error) {
      userEmailError.textContent = error;
      userEmailError.style.display = 'block';
      isFormValid = false;
    }

    // user password validation
    try {
      if (!userPass || userPass.length === 0) throw 'Please enter your password.';
      else if (!validator.length(userPass, 8)) throw 'Password does not match requirements.';
      else if (!validator.upperLowerCase(userPass)) throw 'Password does not match requirements.';
      else if (!validator.numberSymbol(userPass)) throw 'Password does not match requirements.';
      else if (!validator.alphanumeric(userPass)) throw 'Password does not match requirements.';
      else formData.userPass = userPass;
    } catch (error) {
      userPassError.textContent = error;
      userPassError.style.display = 'block';
      isFormValid = false;
    }

    // password confirmation validation
    try {
      if (!passConf || passConf.length === 0) throw 'Please confirm your password.';
      else if (userPass !== passConf) throw 'Passwords are not the same.';
      else formData.passConf = passConf;
    } catch (error) {
      passConfError.textContent = error;
      passConfError.style.display = 'block';
      isFormValid = false;
    }

    console.log(isFormValid);
    console.log(formData);
  };

  return (
    <AuthForm id="registration" method="POST" onSubmit={submit}>
      <div className="form-left">
        <AvatarCheckbox onClick={setAvatar}/>
      </div>
      <div className="form-right">
        <TextInput inputType="text" id="first-name" name="firstName" placeholder="First name" onInput={setFirstName} />
        <TextInput inputType="text" id="last-name" name="lastName" placeholder="Last name" onInput={setLastName} />
        <TextInput inputType="text" id="user-email" name="userEmail" placeholder="Email address" onInput={emailValidation} />
        <TextInput inputType="password" requirements={true} id="user-pass" name="userPass" placeholder="Password" onInput={setUserPass} />
        <TextInput inputType="password" id="pass-conf" name="passConf" placeholder="Confirm password" onInput={setPassConf} />
      </div>
    </AuthForm>
  );
};

export default RegistrationPage;