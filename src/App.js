import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {

  state = {progress: 0, query: ""};
  apiKey = process.env.REACT_APP_NEWS_API;

  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  handleSearch = (search) => {
    console.log(this.s)
    this.setState({query: search});
  }
  
  render() {
    return (
      <>
      <BrowserRouter>
        <NavBar handleSearch={this.handleSearch} />
        <LoadingBar 
          color="#f11946"
          progress={this.state.progress}
          height = {3}
        />
        <Routes>
          <Route exact path='/' element={<News key={this.state.query} query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="" />} />
          <Route exact path='/business' element={<News key="Business" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="Business"/>} />
          <Route exact path='/entertainment' element={<News key="Entertainment" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="Entertainment"/>} />
          <Route exact path='/general' element={<News key="General" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="General"/>} />
          <Route exact path='/health' element={<News key="Health" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="Health"/>} />
          <Route exact path='/science' element={<News key="Science" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="Science"/>} />
          <Route exact path='/sports' element={<News key="Sports" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="Sports"/>} />
          <Route exact path='/technology' element={<News key="Technology" query={this.state.query} apiKey={this.apiKey} setProgress={this.setProgress} pageSize={12} country="us" category="Technology"/>} />
        </Routes>
      </BrowserRouter>
      </>
    )
  }
}