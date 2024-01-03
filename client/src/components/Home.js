import React, { useState,useRef } from 'react';
import './style.css';
import BlazeSignsLogo from '../imgs/Blaze-Signs-Logo (2).png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import Url from '../config/api';
import CircularProgress from '@mui/material/CircularProgress';
import emailjs from '@emailjs/browser';
function Home() {

  const [loading, setLoading] = useState(false);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_i0x1u2k', 'template_zfldb9s', form.current, 'fJk_kHwzx9KV2ZHC5')
      .then((result) => {
          console.log(result.text);
         
      }, (error) => {
          console.log(error.text);
      });
  };
  const [userDetails, setUserDetails] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    contactNumber: '',
    emailAddress: '',
    message: '',
    file:'',
    service:'signs'
    });

    const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'contactNumber') {
     
      const isBackspace = e.nativeEvent.inputType === 'deleteContentBackward';
      formattedValue = formatPhoneNumber(value, isBackspace);
    } else if (name === 'postalCode') {
      formattedValue = formatPostalCode(value);
    }
  
    setUserDetails({ ...userDetails, [name]: formattedValue });
    setErrors({ ...errors, [name]: '' });
  };
  const formatPhoneNumber = (input, isBackspace) => {
    let cleanedInput = input.replace(/\D/g, '');
  
    if (isBackspace) {
      return cleanedInput.substring(0, cleanedInput.length - 1);
    }
  
    if (!cleanedInput.startsWith('1')) {
      cleanedInput = `1${cleanedInput}`;
    }

    const match = cleanedInput.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})$/);
  
    if (match) {
      if (match[1] && !match[2]) {
        return `+${match[1]}`;
      } else if (match[1] && match[2] && !match[3]) {
        return `+${match[1]} (${match[2]}`;
      } else if (match[1] && match[2] && match[3] && !match[4]) {
        return `+${match[1]} (${match[2]}) ${match[3]}`;
      } else if (match[1] && match[2] && match[3] && match[4]) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4].substring(0, 4)}`;
      }
    }
  
    return input.substring(0, 17);
  };
  
 

  const formatPostalCode = (input) => {
    const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
    return cleanedInput.replace(/^([a-zA-Z]\d[a-zA-Z])?(\d[a-zA-Z]\d)$/, '$1 $2').toUpperCase();
  };
  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      'companyName',
      'firstName',
      'lastName',
      'address',
      'city',
      'province',
      'postalCode',
      'contactNumber',
      'emailAddress',
      'message',
    ];

    requiredFields.forEach((field) => {
      if (!userDetails[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (!/^\+\d{1,2}\s?\(\d{3}\)\s?\d{3}(-\d{4})?$/.test(userDetails.contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.emailAddress)) {
      newErrors.emailAddress = 'Invalid email address';
    }

    if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(userDetails.postalCode)) {
      newErrors.postalCode = 'Invalid postal code, Use ANA NAN format.';
    }
    if (!userDetails.file) {
      newErrors.file = 'Please choose a file';
    } else {
     
      const maxSize = 2 * 1024 * 1024;
      if (userDetails.file.size > maxSize) {
        newErrors.file = 'File size exceeds the limit of 2MB';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserDetails({ ...userDetails, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    document.querySelector('.loading-container').style.display = 'block';

    if (!validateForm()) {
      setLoading(false);
      document.querySelector('.loading-container').style.display = 'none';
      return;
    }
    try {
    
      const formData = new FormData();
      for (const key in userDetails) {
        formData.append(key, userDetails[key]);
      }
      
      const response = await axios.post(`${Url}/contact/contacts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     

      setUserDetails({
        companyName: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        contactNumber: '',
        emailAddress: '',
        message: '',
        file: '',
        service:'signs',
      });

      document.getElementById('contactForm').reset();

      toast.success('Thank you for contacting us. We will get back to you soon!', {
        className: 'custom-toast',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
      });
    } catch (error) {
      

      toast.error('Error submitting contact. Please try again later.', {
        className: 'custom-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
      });
    } finally {
      setLoading(false); 
      document.querySelector('.loading-container').style.display = 'none';
    }
  };

    return (
      <div className="outer">
       
      <div className="container-fluid">
        <div className="row top-navi">
          <div className="col-md-5">
            <div className="logo">
              <img src={BlazeSignsLogo} alt="Blaze Logo" />
            </div>
          </div>
          <div className="col-md-7">
            <div className="logo-right-st">
              <h5>
              
                  We are currently working on our website.
                  <br />
                  But, we are here to provide you with our products and services.
               
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row second-section">
          <div className="col-md-4">
            <div className="information-lk">
              <h6>
                Fill Up the form and our Team will get back to you within 24 hours.
              </h6>
              <ul>
                <li>
                  <span>
                    <i className="fa fa-envelope"></i>
                  </span>
                  <span>info@blazesolutionsinc.com</span>
                </li>
                <li>
                  <span>
                    <i className="fa fa-phone"></i>
                  </span>
                  <span>+1 604.441.8567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-8">
            <h3 className="contact-form-heading">Contact Us</h3>
            <form id="contactForm" className="contact-us" onSubmit={(e) => { handleSubmit(e); sendEmail(e); }} ref={form} >
            <div className="loading-container" style={{ display: 'none' }}>
                  <CircularProgress className="loader" />
                </div>
            <div className="row"> 
         <div className="col-md-8 form-right-border"> 
		        <div className="form-row"> 
		          <div className="col-md-12">
             
		              <input type="text" id="cname" name="companyName"  placeholder="Company Name"  value={userDetails.companyName}
              onChange={handleInputChange} />
               <span className="error-message" style={{ color: 'red' }}>
                      {errors.companyName}
                    </span>
		           </div>   
		        </div>
		        <div className="form-row">  
		            <div className="form-group col-md-6">  
                
		                <input type="text" id="fname" name="firstName" placeholder="First Name" value={userDetails.firstName} onChange={handleInputChange} />
                    <span className="error-message" style={{ color: 'red' }}>
                      {errors.firstName}
                    </span>
		             </div>   

		           <div className="form-group col-md-6"> 
               
		              <input type="text" id="lname" name="lastName" placeholder="Last Name" value={userDetails.lastName} onChange={handleInputChange} />
                  <span className="error-message" style={{ color: 'red' }}>
                      {errors.lastName}
                    </span>
                     </div>

		       </div>


		       <div className="form-row">  
		            <div className="form-group col-md-6">  
                
		                <input type="text" id="" name="address" placeholder="Address" value={userDetails.address} onChange={handleInputChange} />
                    <span className="error-message" style={{ color: 'red' }}>
                      {errors.address}
                    </span>
                    </div>   

		           <div className="form-group col-md-6"> 
		           
		              <input type="text" id="cit" name="city" placeholder="City"  value={userDetails.city} onChange={handleInputChange} />
                  <span className="error-message" style={{ color: 'red' }}>
                      {errors.city}
                    </span>
                     </div>

		       </div>

		       <div className="form-row">  
		            <div className="form-group col-md-6">  
                
		                <input type="text" id="" name="province" placeholder="Province"  value={userDetails.province} onChange={handleInputChange}/>
                    <span className="error-message" style={{ color: 'red' }}>
                      {errors.province}
                    </span>
                    </div>   

		           <div className="form-group col-md-6"> 
              
		              <input type="text" id="pcode" name="postalCode" placeholder="Postal Code"  value={userDetails.postalCode} onChange={handleInputChange}/>
                  <span className="error-message" style={{ color: 'red' }}>
                      {errors.postalCode}
                    </span>
                     </div>

		       </div>

		       <div className="form-row">  
		            <div className="form-group col-md-6">  
                
		                <input type="text" id="" name="contactNumber" placeholder="Contact Number" value={userDetails.contactNumber} onChange={handleInputChange} />
                    <span className="error-message" style={{ color: 'red' }}>
                      {errors.contactNumber}
                    </span>
                     </div>   

		           <div className="form-group col-md-6"> 
              
		              <input type="text" id="eadd" name="emailAddress" placeholder="Email Address" value={userDetails.emailAddress} onChange={handleInputChange} />
                  <span className="error-message" style={{ color: 'red' }}>
                      {errors.emailAddress}
                    </span>
                    </div>

		       </div>

		        <div className="form-row"> 
		          <div className="col-md-12"> 
              
		              <textarea id="Message" name="message" placeholder="Message" style={{ height: '100px' }} value={userDetails.message}
              onChange={handleInputChange}></textarea>
<span className="error-message" style={{ color: 'red' }}>
                      {errors.message}
                    </span>
		            </div>  
		        </div>

		          <div className="form-row"> 
		            <div className="col-md-12"> 
               
		              <input type="file"  class="form-control-file form-file" id="exampleFormControlFile1"  onChange={handleFileChange}/>
                  <span className="error-message" style={{ color: 'red' }}>
                      {errors.file}
                    </span>
                    </div>  
		        </div>
		      </div>
		 
		  <div className="col-md-4 right-submit-section">  

		      <h5>Please select the type
                  of service.</h5>  

                  <div className="form-check">
  <input
    type="radio"
    className="form-check-input"
    id="radio1"
    name="service"
    checked={userDetails.service === 'signs'}
    onChange={() => handleInputChange({ target: { name: 'service', value: 'signs' } })}
  />
  <label className="form-check-label" htmlFor="radio1">
    Signs & Graphics
  </label>
</div>
<div className="form-check">
  <input
    type="radio"
    className="form-check-input"
    id="radio2"
    name="service"
    checked={userDetails.service === 'web'}
    onChange={() => handleInputChange({ target: { name: 'service', value: 'web' } })}
  />
  <label className="form-check-label" htmlFor="radio2">
    Web Development
  </label>
</div>



		        <div className="submit-s">      
		              <input type="submit" value="Submit" />
		          </div> 
		      </div>
		  </div>                
      </form>
            <div className="contact-outer-img"></div>
          </div>
        </div>
      </div>
     
         
       
    </div>
  );
};

export default Home;