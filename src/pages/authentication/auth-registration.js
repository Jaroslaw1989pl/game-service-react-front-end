// custom style components
import './auth-registration.css';
// custom components
import AuthForm from "../../components/layout/auth-form";
import TextInput from '../../components/form/auth-text-input';
import AvatarCheckbox from '../../components/form/auth-checkbox-input';


const RegistrationPage = () => {

  const clearError = () => {
    console.log('Clear error.');
  };

  const validate = (event) => {
    console.log(event.target);
  };

  const submit = (event) => {
    event.preventDefault();

    const avatars = document.querySelectorAll('#img-box input[type="checkbox"]');
    let result = false;
    
    for (const checkbox of avatars) {
      if (checkbox.checked) {
        console.log(checkbox);
        result = true;
        break;
      }
    }
    
    if (!result) {
      const avatarsError = document.getElementById('user-avatar-error');
      avatarsError.style.display = 'block';
    }
  };

  return (
    <AuthForm id="registration" method="POST" onSubmit={submit}>
      <div className="form-left">
        <AvatarCheckbox />
      </div>
      <div className="form-right">
        <TextInput inputType="text" id="first-name" name="firstName" placeholder="First name" onInput={clearError} />
        <TextInput inputType="text" id="last-name" name="lastName" placeholder="Last name" onInput={clearError} />
        <TextInput inputType="text" id="user-email" name="userEmail" placeholder="Email address" onInput={clearError} onBlur={validate} />
        <TextInput inputType="password" id="user-pass" name="userPass" placeholder="Password" onInput={clearError} />
        <TextInput inputType="password" id="pass-conf" name="passConf" placeholder="Confirm password" onInput={clearError} />
      </div>
    </AuthForm>
  );
};

export default RegistrationPage;