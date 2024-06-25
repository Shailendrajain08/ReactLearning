import React from 'react';
import './App.css';
import Layout from './module/Layout';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path='/' element={<>This is home page</>}></Route>
        <Route path='/list' element={<>This is list page</>}></Route>
        <Route path='/add' element={<>This is add page</>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
