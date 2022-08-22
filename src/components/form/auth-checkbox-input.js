// 3rd party components
import { useState } from "react";
// custom style components
import './auth-checkbox-input.css';


export const AvatarCheckbox = () => {
  
  const singleSelection = (event) => {
    document.getElementById('user-avatar-error').style.display = 'none';
    document.querySelectorAll('#img-box input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id !== event.target.id) checkbox.checked = false;
    });
  };

  return (
    <>
      <div id="img-box">

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-orange" value="orange" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-orange"><img src="/img/profile-avatars/orange.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-blue" value="blue" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-blue"><img src="/img/profile-avatars/blue.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-green" value="green" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-green"><img src="/img/profile-avatars/green.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-yellow" value="yellow" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-yellow"><img src="/img/profile-avatars/yellow.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-red" value="red" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-red"><img src="/img/profile-avatars/red.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-dark-blue" value="dark-blue" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-dark-blue"><img src="/img/profile-avatars/dark-blue.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-light-blue" value="light-blue" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-light-blue"><img src="/img/profile-avatars/light-blue.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-beige" value="beige" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-beige"><img src="/img/profile-avatars/beige.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-purple" value="purple" onClick={event => singleSelection(event)} />
          <label htmlFor="avatar-purple"><img src="/img/profile-avatars/purple.jpg" alt="" /></label>
        </div>

      </div>

      {/* { User avatar error message } */}
      <p id="user-avatar-error" className="input-error">Please select your avatar.</p>
    </>
  );
};

export default AvatarCheckbox;