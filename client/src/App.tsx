import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './Public/Login';
import Home from './Public/Home';
import {User} from "./Hooks/interfaces";

function App() {
  const [user, setUser] = useState<User>()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
