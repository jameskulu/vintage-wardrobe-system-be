import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import './css/custom.css'
import Home from './components/pages/Home/Home';
import Header from './components/layout/Header/Header';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
    return (
        <BrowserRouter>
            <div className="App">

                <Header />

                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/Signup" component={Signup} />

            </div>
        </BrowserRouter>
    );
}

export default App;
