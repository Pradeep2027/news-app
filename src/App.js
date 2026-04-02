import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default class App extends Component {
  c = {
    name: 'John'  
  };

  render() {
    return (
      <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route exact path='/' key="Default" element={<News pageSize={12} country="us" category="" />} />
          <Route exact path='/business' key="Business" element={<News pageSize={12} country="us" category="business"/>} />
          <Route exact path='/entertainment' key="Entertainment" element={<News pageSize={12} country="us" category="entertainment"/>} />
          <Route exact path='/general' key="General" element={<News pageSize={12} country="us" category="general"/>} />
          <Route exact path='/health' key="Health" element={<News pageSize={12} country="us" category="health"/>} />
          <Route exact path='/science' key="Science" element={<News pageSize={12} country="us" category="science"/>} />
          <Route exact path='/sports' key="Sports" element={<News pageSize={12} country="us" category="sports"/>} />
          <Route exact path='/technology' key="Technology" element={<News pageSize={12} country="us" category="technology"/>} />
        </Routes>
      </BrowserRouter>
      </>
    )
  }
}