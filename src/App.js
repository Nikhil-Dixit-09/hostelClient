import React from 'react'
import './app.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth.jsx'
import Chat from './components/Chat/Chat'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://hostel-backend-sigma.vercel.app');
const App=()=>{
    
    return(
        <>
           <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home socket={socket} />}  />
                <Route path="/auth" exact Component={Auth}  />
                <Route path='/chat' exact element={<Chat socket={socket} />}  />
            </Routes>
           
            </BrowserRouter>
        </>
        
    )
}
export default App;