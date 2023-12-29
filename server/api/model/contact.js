const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  contactNumber: { type: String, required: true, match: /^\d{10}$/ },
  emailAddress: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  message: { type: String, required: true },
  file: { type: Buffer, default: null },
  fileType: { type: String, default: null },
  service: {
    type: String,
    enum: ['signs', 'web'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
