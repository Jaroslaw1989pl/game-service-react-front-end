// 3rd party components
import { useContext, useState, useEffect, useRef } from 'react';
import { useLink, useNavigate } from 'react-router-dom';
// custom style components
import './settings.css';
// custom layouts components
import TopBar from "../../components/layout/top-bar";
import FlashMessage from '../../components/layout/flash-message';
import AvatarCheckbox from '../../components/form/auth-checkbox-input';
// custom components
import ServerContext from '../../store/server-context';


const SettingsUsernamePage = () => {

  const server = useContext(ServerContext);
  
  return (
    <h1>USERNAME</h1>
  );
};

export default SettingsUsernamePage;