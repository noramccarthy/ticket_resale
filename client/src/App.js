import UserLogin from './components/UserLogin'
import LandingPage from './components/LandingPage'
import UserForm from './components/UserForm'
import AdminDashboard from './components/AdminDashboard'
import CreateTicket from  './components/CreateTicket'
import OneTicket from './components/OneTicket'
import AllTickets from './components/AllTickets'
import About from './components/About'
import Deals from './components/Deals'
import Cart from './components/Cart'

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const [authorized, setAuthorized] = useState("");
  const [cartDetails, setCartDetails] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/shop" element={<AllTickets/>}/>
            <Route path="/deals" element={<Deals/>}/>
            <Route path="/ticket/cart" element={<Cart cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
            <Route path="/ticket/:id" element={<OneTicket/>}/>
            <Route path="/admin/login" element={<UserLogin authorized={authorized} setAuthorized={setAuthorized}/>}/>
            <Route path="/admin/register" element={<UserForm authorized={authorized} setAuthorized={setAuthorized}/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard authorized={authorized} setAuthorized={setAuthorized}/>}/>
            <Route path="/admin/create" element={<CreateTicket authorized={authorized} setAuthorized={setAuthorized}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;