import './Styles/main.scss';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Page/Home';
import UserPage from './Page/UserPage';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/userPage' element={<UserPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
