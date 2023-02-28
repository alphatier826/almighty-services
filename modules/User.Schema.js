const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    
    min:[18,"age should be greater than 18"],
    max:[60,"age should be less than 60"]
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (error, hashedPassword) => {
    if (error) {
      return next(error);
    }
    user.password = hashedPassword;
    next();
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;