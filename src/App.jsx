import {Routes, Route} from 'react-router-dom';
import './Styles/main.scss';
import AuthRoute from './Authentification/AuthRoute';
import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import Home from './Page/Home';
import UserPage from './Page/UserPage';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* ligne 16 : utiliser le component AuthRoute dans "element" pour géré l'authentification
        et éviter l'erreur de route : Uncaught Error: [AuthRoute] is not a <Route> component. 
        All component children of <Routes> must be a <Route> or <React.Fragment> */}
        <Route path="/userPage" element={<AuthRoute><UserPage/></AuthRoute>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
