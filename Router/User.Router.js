const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../modules/User.Schema');
const UserRouters = express.Router();

UserRouters.post('/signup', (req, res, next) => {
  const { username, email, password, age } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      const newUser = new User({ username, email, password, age });
      return newUser.save();
    })
    .then(savedUser => {
      const token = jwt.sign({ username: savedUser.username, userId: savedUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });
      res.status(200).json({ token, userId: savedUser._id, username:savedUser.username,expiresIn: 3600 });
    })
    .catch(error => next(error));
});



UserRouters.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
        console.log(user)
        console.log(password==user.password)
        
      if (!user) {
        
        return res.status(401).json({ message: 'Auth failed' });
      }
      if(user.password!=password){
        return res.status(401).json({ message: 'Auth failed' });
      }
    //   return user.comparePassword(password, (error, isMatch) => {
    //     if (error || !isMatch) {
    //       return res.status(401).json({ message: 'Auth failed' });
    //     }
        const token = jwt.sign({ username: user.username, userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        console.log(user)
        res.status(200).json({ token, userId: user._id, username: user.username, expiresIn: 3600 });
    //   }
    //   );
    })
    .catch(error => next(error));
});
UserRouters.get("/",async(req,res)=>{
    
    try{
        const data=await UserModel.find()
        res.send(data)

    }
    catch(err){
        console.log(err)
        res.send("something wrong")

    }
})



UserRouters.post("/newpost",async(req,res)=>{
    const payload=req.body
    try{
        const resobj=await UserModel.create(payload)
        res.send({id: resobj._id.toString()})
    }

    catch(err)
    {
        console.log(err)
        res.send({"err":"something wrong"})
    }
})



module.exports = {UserRouters};