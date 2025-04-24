// import UserLogin from './components/UserLogin'
import LandingPage from './components/LandingPage'
// import UserForm from './components/UserForm'
import UserAuth from './components/UserAuth'
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
import ProfileManagement from './components/ProfileManagement'
import UserTickets from './components/UserTickets'

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import './App.css';

function App() {
  const [cartDetails, setCartDetails] = useState("");

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<LandingPage cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/shop" element={<AllTickets/>}/>
              <Route path="/deals" element={<Deals/>}/>
              <Route path="/cart" element={<Cart cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
              <Route path="/receipt" element={<Receipt cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
              <Route path="/ticket/:id" element={<OneTicket/>}/>
              <Route path="/admin/login" element={<UserAuth/>}/>
              <Route path="/admin/register" element={<UserAuth/>}/>
              <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/admin/profile" element={<ProfileManagement/>}/>
              <Route path="/admin/events" element={<SearchEvent/>}/>
              <Route path="/admin/tickets" element={<UserTickets/>}/>
              <Route path="/admin/create/:id" element={<CreateTicket/>}/>
              <Route path="/admin/update/:id" element={<UpdateTicket/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;