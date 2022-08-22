// custom layouts components
import TopBar from "../components/layout/top-bar";
// custom style components
import './home.css';


const HomePage = (props) => {
  return (
    <>
      <TopBar auth={props.auth} />
    </>
  );
};

export default HomePage;