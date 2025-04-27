import LandingPage from './components/LandingPage'
import UserAuth from './components/UserAuth'
import CreateTicket from  './components/CreateTicket'
import TicketDetail from './components/TicketDetail'
import About from './components/About'
import Deals from './components/Deals'
import Cart from './components/Cart'
import SearchEvent from './components/SearchEvent'
import UpdateTicket from './components/UpdateTicket'
import Receipt from './components/Receipt'
import ProfileManagement from './components/ProfileManagement'
import UserTickets from './components/UserTickets'
import UserListings from './components/UserListings'
import Sports from './components/Sports'
import Music from './components/Music'
import Shows from './components/Shows'
import SearchResults from './components/SearchResults'
import { LoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import './App.css';

function App() {
  const [cartDetails, setCartDetails] = useState("");

  return (
    <div className="App">
      <AuthProvider>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <BrowserRouter>
            <Routes>
              <Route>
                <Route path="/" element={<LandingPage cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/sports" element={<Sports/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/shows" element={<Shows/>}/>
                <Route path="/deals" element={<Deals/>}/>
                <Route path="/results" element={<SearchResults/>}/>
                <Route path="/cart" element={<Cart cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
                <Route path="/receipt" element={<Receipt cartDetails={cartDetails} setCartDetails={setCartDetails}/>}/>
                <Route path="/ticket/:id" element={<TicketDetail/>}/>
                <Route path="/admin/login" element={<UserAuth/>}/>
                <Route path="/admin/register" element={<UserAuth/>}/>
                <Route path="/admin/profile" element={<ProfileManagement/>}/>
                <Route path="/admin/events" element={<SearchEvent/>}/>
                <Route path="/admin/tickets" element={<UserTickets/>}/>
                <Route path="/admin/listings" element={<UserListings/>}/>
                <Route path="/admin/create/:id" element={<CreateTicket/>}/>
                <Route path="/admin/update/:id" element={<UpdateTicket/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </LoadScript>
      </AuthProvider>
    </div>
  );
}

export default App;