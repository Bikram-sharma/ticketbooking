import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { useRef } from 'react';



export default function Ticket() {


  
const ticketRef = useRef();
const navigate = useNavigate();
const location = useLocation();
const user = location.state || {}

const home = ()=>{
  navigate('/')
}

const downloadPDF = async () => {
  const { default: jsPDF } = await import("jspdf");
  const { default: html2canvas } = await import("html2canvas");
 
  const ignore = document.getElementsByTagName('button');
   
  for (let element of ignore) {
    element.style.display = 'none';
  }

  if (!ticketRef.current) {
    console.error("Error: ticketRef is null");
    return;
  }

  const element = ticketRef.current;
  // Capture the parent container (ticket and surrounding space) as a canvas
  const canvas = await html2canvas(element, {scale: 2,});
  const imgData = canvas.toDataURL('image/png');



  // Create a PDF with the same dimensions as the parent container
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
  
  });

  // Add the image to the PDF with the original element's size
  pdf.addImage(imgData, 'PNG', 0, 0,);

  // Save the PDF
  pdf.save('ticket.pdf');

  for (let element of ignore) {
    element.style.display = '';
  }
};




  return (
    <div className='flex justify-center box-border w-screen md:w-a4 lg:w-a4 h-screen ' ref={ticketRef}>
    <div className=' grid justify-center grid-rows-4 w-fit h-fit box-border gap-4' >
      

        <span className=' text-4xl italic font-sevillana h-full p-5'>Symphony Under the Stars</span>
        <div className='p-2 font-mono'>
          <span>Ticket ID :{user.ticketId}</span><br />
          <span>Name : {user.name}</span><br />
          <span>Email: {user.email}</span>
        </div>
        <div className='p-2'>
          <span>Date : {new Date().toDateString()}</span><br />
          <span>Time : {new Date().toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})}</span><br />
          <span>Venue : Grand Events Venue</span>

        </div>

        <div>
        <button
        onClick={downloadPDF}
        className='bg-orange-500 px-5 rounded-full'
      >
        Download as PDF
      </button><br />
      <button className='bg-green-500 px-5 rounded-full my-10' onClick={home}>Home</button>

        </div>
        
       

   
      

    </div>

    </div>

  )
}
