// 3rd party components
import { useState } from "react";
// custom style components
import './auth-checkbox-input.css';


export const AvatarCheckbox = (props) => {
  
  const singleSelection = (event) => {
    document.getElementById('user-avatar-error').style.display = 'none';
    document.querySelectorAll('#img-box input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id !== event.target.id) checkbox.checked = false;
    });
    // chexked checkbox can't be unchecked
    event.target.checked = true;
  };
  
  return (
    <>
      {/* { User avatar error message } */}
      <p id="user-avatar-error" className="input-error">Please select your avatar.</p>
      
      <div id="img-box" className={props.className}>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-orange" value="orange" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-orange"><img src="/img/profile-avatars/orange.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-blue" value="blue" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-blue"><img src="/img/profile-avatars/blue.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-green" value="green" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-green"><img src="/img/profile-avatars/green.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-yellow" value="yellow" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-yellow"><img src="/img/profile-avatars/yellow.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-red" value="red" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-red"><img src="/img/profile-avatars/red.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-dark-blue" value="dark-blue" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-dark-blue"><img src="/img/profile-avatars/dark-blue.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-light-blue" value="light-blue" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-light-blue"><img src="/img/profile-avatars/light-blue.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-beige" value="beige" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-beige"><img src="/img/profile-avatars/beige.jpg" alt="" /></label>
        </div>

        <div className="img-input-group">
          <input type="checkbox" className="avatar" name="avatar" id="avatar-purple" value="purple" hidden={props.isInputHidden}
                 onClick={event => {
                    singleSelection(event);
                    props.onClick && props.onClick(event.target.value);
                  }} />
          <label htmlFor="avatar-purple"><img src="/img/profile-avatars/purple.jpg" alt="" /></label>
        </div>

      </div>

    </>
  );
};

export default AvatarCheckbox;