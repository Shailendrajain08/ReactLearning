import React from 'react';
import './App.css';
import Layout from './module/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './module/User/UserList';
import UserForm from './module/User/UserForm';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<UserList/>}></Route>
        <Route path='/add' element={<UserForm/>}></Route>
        <Route path='/edit/:id' element={<UserForm isEditForm={true}/>}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
