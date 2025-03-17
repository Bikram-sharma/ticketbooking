import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Ticket from './ticket.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element = {<App/> }/>
      <Route path='/ticket/:ticketId' element = {<Ticket/>}/>

    </Routes>
   
  </Router>
  
)
