import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route exact path='/' element={<News key='Top Headlines1' pageSize={12} country="us" category="" />} />
          <Route exact path='/business' element={<News key="Business" pageSize={12} country="us" category="business"/>} />
          <Route exact path='/entertainment' element={<News key="Entertainment" pageSize={12} country="us" category="entertainment"/>} />
          <Route exact path='/general' element={<News key="General" pageSize={12} country="us" category="general"/>} />
          <Route exact path='/health' element={<News key="Health" pageSize={12} country="us" category="health"/>} />
          <Route exact path='/science' element={<News key="Science" pageSize={12} country="us" category="science"/>} />
          <Route exact path='/sports' element={<News key="Sports" pageSize={12} country="us" category="sports"/>} />
          <Route exact path='/technology' element={<News key="Technology" pageSize={12} country="us" category="technology"/>} />
        </Routes>
      </BrowserRouter>
      </>
    )
  }
}