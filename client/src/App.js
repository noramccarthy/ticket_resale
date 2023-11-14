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
import SearchEvent from './components/SearchEvent'
import UpdateTicket from './components/UpdateTicket'
import Receipt from './components/Receipt'
import Chatbot from './components/Chatbot'

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Wrapper } from "@googlemaps/react-wrapper";

import './App.css';

function App() {
  const [authorized, setAuthorized] = useState("");
  const [cartDetails, setCartDetails] = useState("");

  return (
    <div className="App">
      <Wrapper apiKey={"AIzaSyA3e3qht-meGsln-PEY2RUhRdRzi0yk4UI"}>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<LandingPage cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
              <Route path="/chat" element={<Chatbot/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/shop" element={<AllTickets/>}/>
              <Route path="/deals" element={<Deals/>}/>
              <Route path="/cart" element={<Cart cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
              <Route path="/ticket/:id" element={<OneTicket/>}/>
              <Route path="/admin/login" element={<UserLogin authorized={authorized} setAuthorized={setAuthorized}/>}/>
              <Route path="/admin/register" element={<UserForm authorized={authorized} setAuthorized={setAuthorized}/>}/>
              <Route path="/admin/dashboard" element={<AdminDashboard authorized={authorized} setAuthorized={setAuthorized}/>}/>
              <Route path="/admin/events" element={<SearchEvent authorized={authorized} setAuthorized={setAuthorized}/>}/>
              <Route path="/admin/create/:id" element={<CreateTicket authorized={authorized} setAuthorized={setAuthorized}/>}/>
              <Route path="/admin/update/:id" element={<UpdateTicket authorized={authorized} setAuthorized={setAuthorized}/>}/>
              <Route path="/receipt" element={<Receipt cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </div>
  );
}

export default App;