import { useEffect, useState, useCallback } from "react";
import toast, {Toaster} from "react-hot-toast"; 
import {useNavigate} from 'react-router-dom';
import { ticketIdgenerater } from "./helper/ticketIdgenerater";
import validator from "validator";
import { ROUTE_CONSTANTS } from "./route-constants";
import ScaleLoader from "react-spinners/ScaleLoader";


function App() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  


  const fetchData = async(formData) => {

    const userData = Object.fromEntries(formData.entries());
    userData.ticketId = ticketIdgenerater();

    const validEmail = validator.isEmail(userData.email);
    const validNumber = validator.isNumeric(userData.phoneNumber) 
 

    if(!validEmail || !validNumber){ 
       validEmail ? toast.error('invlid phone number'): toast.error('invlid email');
      setLoading(false)
      return ;
    } 

    try {
      const url = import.meta.env.VITE_BASE_URL;
      const response = await fetch(url+ROUTE_CONSTANTS.REGISTER,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()
    
      if(!response.ok){
        throw new Error( data.message||'surver down')

      }
      
     toast.success(data.message);
     setTimeout(()=>navigate(`/ticket/${data.ticketId}`, {state:data}),3000)
    
    } catch (error) {
      toast.error(error.message)
  
    }finally{
      setLoading(false)
    }
     
  };


const onSubmit = (e)=>{
  e.preventDefault();
  setLoading(true)
  const formData = new FormData(e.target)
  fetchData(formData)
  
}

  





  return (
    <div className='h-[100vh] bg-gradient-to-r from-black via-black/85 to-transparent'>

    <Toaster position="top-center" toastOptions={{duration: 5000,}}/>

     {loading ? <span className="absolute text-xl font-bold h-screen w-screen grid items-center justify-center bg-black bg-opacity-80">
               <span className="text-white place-items-center">
                <ScaleLoader color={'white'}/>Fetching your ticket...</span></span> : ''}

      <div className='text-white grid grid-cols-2 grid-rows-8 h-[100vh] p-10 place-items-center'>
       
      <div className="row-span-2 row-start-1 w-[100%] h-[100%] grid place-items-center text-[50px]">Get Your Ticket Now!</div>

      <form action="" onSubmit={onSubmit} className="col-start-1 row-span-5 row-start-3 grid grid-cols-2 grid-rows-4 gap-4 p-10 ">
        <div className="col-span-2" >
         <label htmlFor="name" className="text-base md:text-xl">Full Name *</label>
        <input type="text" name='fullName' className="p-2 w-full rounded-xl text-base border bg-transparent" placeholder="Full Name" required/>
        </div>

        <div className="">
         <label htmlFor="Email" className="text-base md:text-xl">Email *</label>
        <input type="email" name='email' className="p-2 w-full rounded-xl text-base border bg-transparent" placeholder="example@gmail.com" required/>
        </div>

        <div className="">
         <label htmlFor="phoneNumber" className="text-base md:text-xl">Phone Number *</label>
        <input type="text" name='phoneNumber' className="p-2 w-full rounded-xl text-base border bg-transparent" placeholder="Phone Number" required/>
        </div>

        <div className="">
         <label htmlFor="country" className="text-base md:text-xl">Date of Birth *</label>
        <input type="date" name='dob' className="p-2 w-full rounded-xl text-base border text-white bg-transparent" required/>
        </div>

        <div className="">
         <label htmlFor="gender" className="text-base md:text-xl">Gender</label>
        <select name='gender' defaultValue="" className="w-full rounded-xl p-3 text-base border  bg-transparent">
          <option value="" disabled>Select...</option>
          <option value="male">Male</option>
          <option value="male">Female</option>
          <option value="male">Other</option>


        </select>
        </div>

        <div className="col-span-2">
        <button className='w-full bg-green-500 hover:bg-green-600 p-2 rounded-xl mt-5 font-mono' type="submit">Submit</button>
        </div>
      
      </form>
      
      <div className='row-span-2 row-start-1 col-start-2 place-items-center h-[100%] w-[100%] grid place-items-center'>
      <span className="banner_text text-[105px]">It's Show Time!</span>
      </div>

      <div className="p-2 text-justify row-start-4 row-span-3 col-start-2 text-white">
      <span className="about_show text-2xl">Experience the Magic of Live Entertainment with "Symphony Under the Stars" – a captivating evening of orchestral music under the open sky.
            This enchanting event will take place at the breathtaking Riverside Amphitheater, located in downtown Cityville,
            offering a perfect blend of nature and culture. Join us on Saturday, December 9, 2024, at 7:00 PM,
            as the renowned Cityville Philharmonic Orchestra performs timeless classics and modern favorites.
            Whether you're a music enthusiast or looking for a memorable night out, this concert promises to be an unforgettable experience.
            Book your tickets now and secure your spot for this one-of-a-kind event!</span>
      </div>
      </div>



     

    </div>
  )
}

export default App
