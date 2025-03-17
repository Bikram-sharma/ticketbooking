import { useEffect, useState, useCallback } from "react";
import toast, {Toaster} from "react-hot-toast"; 
import {useNavigate} from 'react-router-dom';
import { ticketIdgenerater } from "./helper/ticketIdgenerater";
import validator from "validator";
import { ROUTE_CONSTANTS } from "./route-constants";

function App() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    fullName:'',
    email:'',
    phoneNumber:'',
    dob:'',
    gender:'',
    ticketId:'',
  })
  const [validForm, setValidForm] = useState(false)
  const formValidation = Object.values(user).some(value => !value)
 
  


  const fetchData = async() => {


    const validEmail = validator.isEmail(user.email);
    const validNumber = validator.isNumeric(user.phoneNumber) 
 
    if (!validForm) {

      toast.error('Some fields are missing!');
      setLoading(false)
      return;
  }

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
        body: JSON.stringify(user)
      })

      const data = await response.json()
    
      if(!response.ok){
        throw new Error( data.message||'surver down')

      }
      
  
     
      response.ok && toast.success(data.message);
      setLoading(false);
      navigate(`/ticket/${data.ticketId}`, {state:data})
    } catch (error) {
      // toast.error(data.message)
      toast.error(error.message)
      setLoading(false)
    }
     
  };


useEffect(()=>{
  setUser({...user, ticketId:ticketIdgenerater()})
  
},[]);

useEffect(()=>{
  setValidForm(!formValidation)
},[formValidation])


  

const handeler = (e)=>{
  setLoading(true)
  e.preventDefault();
  fetchData()
  
}

  





  return (
    <div className={`w-full h-dvh flex flex-wrap-reverse`}>

    <Toaster
    position="top-center"
    toastOptions={{
      // Define default options
      duration: 5000,
      

    }}
  />

     {loading ? <span className="absolute text-2xl font-bold h-screen w-screen grid items-center justify-center bg-black bg-opacity-50"><span className="font-black">Loading.....</span></span> : ''}

      <div className='text-2xl w-full md:w-1/2 md:h-full h-96 flex items-center px-10 flex-col'>
       
      <div className="md:w-full w-full overflow-y-scroll place-items-center pt-5">
      <div className="text-base rounded-xl bg-gradient-to-r from-yellow-100 via-red-300 to-yellow-600 p-10 text-justify mix-blend-screen">
      <span className="" >Experience the Magic of Live Entertainment with "Symphony Under the Stars" – a captivating evening of orchestral music under the open sky.
            This enchanting event will take place at the breathtaking Riverside Amphitheater, located in downtown Cityville,
            offering a perfect blend of nature and culture. Join us on Saturday, December 9, 2024, at 7:00 PM,
            as the renowned Cityville Philharmonic Orchestra performs timeless classics and modern favorites.
            Whether you're a music enthusiast or looking for a memorable night out, this concert promises to be an unforgettable experience.
            Book your tickets now and secure your spot for this one-of-a-kind event!</span>
      </div>
      <form action="" className="grid grid-cols-2 grid-rows-4 gap-4 p-10">
        <div className="col-span-2" >
         <label htmlFor="name" className="text-base md:text-xl">Full Name *</label>
        <input type="text" onChange={(e)=> setUser({...user, fullName:e.target.value.toString()})} className="p-2 w-full rounded-xl text-base border" placeholder="Full Name"/>
        </div>

        <div className="">
         <label htmlFor="Email" className="text-base md:text-xl">Email *</label>
        <input type="email" onChange={(e)=> setUser({...user, email:e.target.value})} className="p-2 w-full rounded-xl text-base border" placeholder="example@gmail.com"/>
        </div>

        <div className="">
         <label htmlFor="phoneNumber" className="text-base md:text-xl">Phone Number *</label>
        <input type="text" onChange={(e)=> setUser({...user, phoneNumber:e.target.value})} className="p-2 w-full rounded-xl text-base border" placeholder="Phone Number"/>
        </div>

        <div className="">
         <label htmlFor="country" className="text-base md:text-xl">Date of Birth *</label>
        <input type="date" onChange={(e)=> setUser({...user, dob:e.target.value})} className="p-2 w-full rounded-xl text-base border"/>
        </div>

        <div className="">
         <label htmlFor="gender" className="text-base md:text-xl">Gender</label>
        <select defaultValue={'default'} onChange={(e)=> setUser({...user, gender:e.target.value})} name="gander" id="gender" className="w-full rounded-xl p-3 text-base border">
          <option value="default" disabled >Select...</option>
          <option value="male">Male</option>
          <option value="male">Female</option>
          <option value="male">Other</option>


        </select>
        </div>

        <div className="col-span-2">
        <button className={`w-full bg-green-500 hover:bg-green-600 p-2 rounded-xl mt-5 font-mono ${validForm ? 'opacity-1' : 'opacity-50'}`} onClick={handeler} type="submit">Submit</button>
        </div>
        
      
      </form>
      </div>
      </div>



      <div className='text-2xl w-full md:w-1/2 lg:w-1/2  h-full bg-gray-500 flex justify-center'>
      <span className="absolute mx-5 top-20 text-5xl md:text-6xl font-bold font-mono mix-blend-screen p-5 rounded-xl bg-gradient-to-r from-yellow-100 via-red-500 to-yellow-600 ">It's Show Time!</span>
      
      <img src="pexels-vishnurnair-1105666.jpg" alt="banner" className="w-cover h-cover"/>
      </div>

    </div>
  )
}

export default App
