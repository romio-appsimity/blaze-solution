
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true, match: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/ }, 
  contactNumber: { type: String, required: true, match: /^\+\d{1,2}\s?\(\d{3}\)\s?\d{3}(-\d{4})?$/ }, 
  emailAddress: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  message: { type: String, required: true },
  file: [
    {
      data: { type: Buffer, default: null },
      fileType: { type: String, default: null },
    }
  ],
  service: {
    type: String,
    enum: ['signs', 'web'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
