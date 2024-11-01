import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Vote from './pages/Vote';
import Results from './pages/Results';
import VotedAlready from './pages/VotedAlready';
import VoteAccepted from './pages/VoteAccepted';
import Error from './pages/Error';

export default function App() {
    //by having isLoggedIn as a useState, it will always prompt you to log in again after refreshing. We could store a mock login cookie, but I'm not sure
    //if the mockup needs to be that well developped.
    const [isLoggedIn, setLoggedIn] = useState(false);

    const PrivateRoute = ({ children }) => {
        return isLoggedIn ? children : <Navigate to="/login" />;
    };

    const handleLogin = () => {
        setLoggedIn(true)
    };

    return (
        <Router>
            <Routes>
                <Route path="/"               element={isLoggedIn ? <Navigate to="/vote" /> : <Navigate to="/login" />} />
                <Route path="/login"          element={<Login rememberLogin={handleLogin} />} />
                <Route path="/vote/:token"    element={<PrivateRoute> <Vote/>         </PrivateRoute>} />
                <Route path="/already-voted"  element={<PrivateRoute> <VotedAlready/> </PrivateRoute>} />
                <Route path="/vote-accepted"  element={<PrivateRoute> <VoteAccepted/> </PrivateRoute>} />
                <Route path="/results"        element={<Results/>}/>
                <Route path="/error"          element={<PrivateRoute> <Error/>        </PrivateRoute>}/>
            </Routes>
        </Router>
    );
}
