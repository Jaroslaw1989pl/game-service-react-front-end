// 3rd party components
import { useContext, useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
// custom style components
import './settings-form.css';
// custom components
import ServerContext from '../../store/server-context';


const SettingsForm = (props) => {

  const navigate = useNavigate();

  const server = useContext(ServerContext);
  const formError = useRef();

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

  const submit = (event) => {

    event.preventDefault();

    let data = props.data();

    if (data) {

      let postData = '';
      
      for (const property in data) {
        postData += property + '=' + data[property] + '&';
      }
      
      postData = postData.substring(0, postData.length - 1);
  
      const xhr = new XMLHttpRequest();
  
      xhr.onerror = () => console.log('Settings form. Server not responding.');
      xhr.onload = () => {

      }
      xhr.open(props.method, server.domain + props.action);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(postData);
    }
  }

  return (
    <main>

      <Link to="/settings" id="back-anchor">&#171; Account Management</Link>

      <header>
        <h1>UPDATE EMAIL</h1>
      </header>

      <div id="form">
            
        <% if (!isUpdateAvailable) { %>
    
          <p id="date-error" class="form-error"><%= 
            'Next update will be available ' + new Date(user.emailUpdate * 1000 + 3600000 * 24 * 14).toLocaleDateString() + '.'
          %></p>
    
        <% } else { %>

          <p>To change the email address, please follow below steps:</p>

          <div id="step-list">
            <div class="step">
              <div class="step-icon<%= isEmailSent === false ? ' img-active' : '' %>"><img src="/assets/settings-icons/dots.png" alt=""></div>
              <div class="step-content">
                <div class="step-text<%= isEmailSent === false ? ' text-active' : '' %>">1. Generate code</div>
                <div class="step-content-bottom"></div>
              </div>
            </div>
            <div class="step">
              <div class="step-icon<%= isEmailSent ? ' img-active' : '' %>"><img src="/assets/settings-icons/form.png" alt=""></div>
              <div class="step-content">
                <div class="step-text<%= isEmailSent ? ' text-active' : '' %>">2. New email address</div>
                <div class="step-content-bottom"></div>
              </div>
            </div>
          </div>
    
          <% if (!isEmailSent) { %>
            
            <!-- FORM 1 -->
            
            <form name="email-form" action="/settings-email" method="POST">
              
              <header>
                <p>To change email address, click Send email. The confirmation code will be sent to your email address.</p>
              </header>
              
              <input type="submit" id="email-submit-btn" class="form-submit-btn" name="emailSubmitBtn" value="Send email">
              
            </form>
    
          <% } else { %>
              
            <!-- FORM 1 COMPLETE -->
        
            <header >
              <p><b>Confirmation code was sent to email: <%= hiddenEmail %></b></p>
              <p>To continue, enter the confirmation code. The code is valid for 1 hour. If you do not enter the code, you will not be able to update the email address.</p>
            </header>
      
            <!-- FORM 2 -->
    
            <form name="new-email-form" action="/settings-email" method="POST">
      
              <!-- verification code -->
              <input type="text" id="code" name="code" class="registration-input" value="<%= 
                typeof inputs !== 'undefined' ? inputs.code : ''
              %>" placeholder="1. Enter code">
              <!-- verification code error message -->
              <p id="code-error" class="input-error<%= (typeof errors !== 'undefined' && errors.code) ? ' active' : ''%>"><%= 
                (typeof errors !== 'undefined' && errors.code) ? errors.code : '' 
              %></p> 
    
              <!-- new email -->
              <input type="text" id="user-email" name="newEmail" class="registration-input" value="<%= 
                typeof inputs !== 'undefined' ? inputs.newEmail : ''
              %>" placeholder="2. Enter new email address">
              <!-- new email error message -->
              <p id="user-email-error" class="input-error<%= (typeof errors !== 'undefined' && errors.newEmail) ? ' active' : ''%>"><%= 
                (typeof errors !== 'undefined' && errors.newEmail) ? errors.newEmail : '' 
              %></p>
    
              <!-- password verification -->
              <!-- <input type="text" id="user-pass" name="userPass" class="registration-input" value="<%= 
                typeof inputs !== 'undefined' ? inputs.userPass : ''
              %>" placeholder="3. Confirm password"> -->

              <div class="form-input">
                <input type="password" id="user-pass" name="userPass" class="registration-input" value="<%= 
                  typeof inputs !== 'undefined' ? inputs.userPass : ''
                  %>" placeholder="3. Confirm password">
                <input type="button" class="show-hide-btn" id="pass-toggle" value="">
              </div>
              <!-- password verification error message -->
              <p id="user-pass-error" class="input-error<%= (typeof errors !== 'undefined' && errors.password) ? ' active' : ''%>"><%= 
                (typeof errors !== 'undefined' && errors.password) ? errors.password : '' 
              %></p>     
              
              <input type="submit" id="form-submit-btn" class="form-submit-btn" name="formSubmitBtn" value="Update email">
    
            </form>
              
          <% } %>
          
        <% } %> 

      </div>

    </main>
  );
};

export default SettingsForm;