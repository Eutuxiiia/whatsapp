import React, {useState} from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useStateValue} from "./StateProvider";

function App() {
    const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
        {!user ?(
            <Login/>
        ) : (
            <div className="app_body">
                <Router>
                    <Sidebar />
                    <Routes>
                        <Route path='/rooms/:roomId' element={<Chat/>}/>
                        <Route path='/'/>
                    </Routes>
                </Router>
        </div>
        )}
    </div>
  );
}

export default App;
