
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Users from './components/Users';
import NavBar from './components/NavBar';


function App() {
  return (
    <div>
      <Router>
        <NavBar/>      
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/Users' element={<Users/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
