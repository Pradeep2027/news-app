import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

export default function App () {

  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('');
  const apiKey = process.env.REACT_APP_NEWS_API;

  const handleSearch = (search) => { setQuery(search); }
  
  return (
    <>
    <BrowserRouter>
      <NavBar handleSearch={handleSearch} style={{height : '56px'}} />
      <LoadingBar color="#f11946" progress={progress} height = {3} style={{marginTop : '56px'}} />
      <Routes>
        <Route exact path='/' element={<News key={query} query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="" />} />
        <Route exact path='/business' element={<News key="Business" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="Business"/>} />
        <Route exact path='/entertainment' element={<News key="Entertainment" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="Entertainment"/>} />
        <Route exact path='/general' element={<News key="General" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="General"/>} />
        <Route exact path='/health' element={<News key="Health" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="Health"/>} />
        <Route exact path='/science' element={<News key="Science" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="Science"/>} />
        <Route exact path='/sports' element={<News key="Sports" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="Sports"/>} />
        <Route exact path='/technology' element={<News key="Technology" query={query} apiKey={apiKey} setProgress={setProgress} pageSize={12} country="us" category="Technology"/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}