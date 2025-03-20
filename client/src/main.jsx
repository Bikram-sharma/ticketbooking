import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Ticket from './ticket.jsx';




createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element = {<App/> }/>
      <Route path='/ticket/:ticketId' element = {<Ticket/>}/>
    </Routes>
  </Router>
  
)
