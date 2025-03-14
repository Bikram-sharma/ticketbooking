const express = require('express');
const  router = express.Router();
const dbConnect = require('../bdconfig/bdconnect.js');
const User = require('../userModels/userMode.js')
router.use(express.json());

router.post('/',  async function (req, res) {

  await dbConnect()
   
  try {
    const user = req.body; 
    const { fullName, email, phoneNumber, dob, gender, ticketId } = user;
    if (!fullName || !email) {
      return res.status(400).json({ message: "Username and email are required." });
   }else if(!+phoneNumber){
    return res.status(300).json({ message: "Enter Valid PhoneNumber" });
   };

   const existingUser = await User.findOne({email})
   if(existingUser) return res.status(300).json({message:'This email is already registered'})




    const newUser =  new User({
    fullName,
    email,
    phoneNumber,
    dob,
    gender,
    ticketId
    }) 
    
    await newUser.save()

    console.log(`Received username: ${fullName}, email: ${email}`);
    const response = {
      name: fullName,
      email,
      ticketId,
      message: 'User saved successfully!'
    }

    res.status(200).json(response);

  } catch (error) {

    res.status(500).json({message: error.message})
    
  }
 
   

   

});

module.exports = router;
