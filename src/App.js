// 3rd party components
import { Routes, Route } from "react-router-dom";
// custom page components
import HomePage from "./pages/home";
import LoginPage from "./pages/authentication/auth-login";
import RegistrationPage from "./pages/authentication/auth-registration";
import ResetPasswordPage from "./pages/authentication/auth-pass-reset";


const isUserAuthenticated = false;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage auth={isUserAuthenticated}/>}></Route>
      {/* authentication routes */}
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/registration" element={<RegistrationPage />}></Route>
      <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
    </Routes>
  );
};

export default App;