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
        <AuthRoute path='/userPage' element={<UserPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
