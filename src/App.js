// 3rd party components
import { Routes, Route } from "react-router-dom";

/***** custom page components *****/
// public pages
import HomePage from "./pages/home";
// authentication pages
import LoginPage from "./pages/authentication/auth-login";
import RegistrationPage from "./pages/authentication/auth-registration";
import ResetPasswordPage from "./pages/authentication/auth-pass-reset";
import NewPasswordPage from "./pages/authentication/auth-pass-new";
// protected pages
import SettingsPage from "./pages/settings/settings";
import SettingsUsernamePage from "./pages/settings/settings-username";
import SettingsEmailPage from "./pages/settings/settings-email";
// error pages
import NotFound from "./pages/error/404-page";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      
      {/* authentication routes */}
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/registration" element={<RegistrationPage />}></Route>
      <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
      {/* <Route path="/new-password" element={<ResetPasswordPage />}></Route> */}
      {['/reset-password', '/new-password'].map(el => <Route key={el} path={el} element={<ResetPasswordPage />}></Route>)}
      <Route path="/new-password/:token" element={<NewPasswordPage />}></Route>

      {/* protected routes */}
      <Route path="/settings" element={<SettingsPage />}></Route>
      <Route path="/settings/username" element={<SettingsUsernamePage />}></Route>
      <Route path="/settings/email" element={<SettingsEmailPage />}></Route>
      
      {/* Not found route */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;