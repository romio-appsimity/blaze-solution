import React, { useState } from 'react';
import './style.css';
import BlazeSignsLogo from '../imgs/Blaze-Signs-Logo (2).png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import Url from '../config/api';

function Home() {

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserDetails({ ...userDetails, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      console.log('Contact submitted successfully:', response.data);

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
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      
     
      //   window.location.reload();
      
    } catch (error) {
      console.error('Error submitting contact:', error);

      toast.error('Error submitting contact', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
        window.location.reload();
     
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
                <b>
                  We are currently working on our website.
                  <br />
                  But, we are here to provide you with our products and services.
                </b>
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
            <form id="contactForm" className="contact-us" onSubmit={handleSubmit}>
           
            <div className="row"> 
         <div className="col-md-8 form-right-border"> 
		        <div className="form-row"> 
		          <div className="col-md-12">
		            {/* <!-- <label for="cname">Company Name</label> --> */}
		              <input type="text" id="cname" name="companyName"  placeholder="Company Name"  value={userDetails.companyName}
              onChange={handleInputChange} />
		           </div>   
		        </div>
		        <div className="form-row">  
		            <div className="form-group col-md-6">  
		               {/* <!--  <label for="fname">First Name</label> --> */}
		                <input type="text" id="fname" name="firstName" placeholder="First Name" value={userDetails.firstName} onChange={handleInputChange} />
		             </div>   

		           <div className="form-group col-md-6"> 
		              {/* <!-- <label for="lname">Last Name</label> --> */}
		              <input type="text" id="lname" name="lastName" placeholder="Last Name" value={userDetails.lastName} onChange={handleInputChange} />
		           </div>

		       </div>


		       <div className="form-row">  
		            <div className="form-group col-md-6">  
		                {/* <!-- <label for="">Address</label> --> */}
		                <input type="text" id="" name="address" placeholder="Address" value={userDetails.address} onChange={handleInputChange} />
		             </div>   

		           <div className="form-group col-md-6"> 
		            {/* <!--   <label for="">City</label> --> */}
		              <input type="text" id="cit" name="city" placeholder="City"  value={userDetails.city} onChange={handleInputChange} />
		           </div>

		       </div>

		       <div className="form-row">  
		            <div className="form-group col-md-6">  
		                {/* <!-- <label for="">Province</label> --> */}
		                <input type="text" id="" name="province" placeholder="Province"  value={userDetails.province} onChange={handleInputChange}/>
		             </div>   

		           <div className="form-group col-md-6"> 
		              {/* <!-- <label for="">Postal Code</label> --> */}
		              <input type="text" id="pcode" name="postalCode" placeholder="Postal Code"  value={userDetails.postalCode} onChange={handleInputChange}/>
		           </div>

		       </div>

		       <div className="form-row">  
		            <div className="form-group col-md-6">  
		                {/* <!-- <label for="">Contact Number</label> --> */}
		                <input type="text" id="" name="contactNumber" placeholder="Contact Number" value={userDetails.contactNumber} onChange={handleInputChange} />
		             </div>   

		           <div className="form-group col-md-6"> 
		            {/* <!--   <label for="">Email Address</label> --> */}
		              <input type="text" id="eadd" name="emailAddress" placeholder="Email Address" value={userDetails.emailAddress} onChange={handleInputChange} />
		           </div>

		       </div>

		        <div className="form-row"> 
		          <div className="col-md-12"> 
		              {/* <!-- <label for="cname">Message</label> --> */}
		              <textarea id="Message" name="message" placeholder="Message" style={{ height: '100px' }} value={userDetails.message}
              onChange={handleInputChange}></textarea>

		            </div>  
		        </div>

		          <div className="form-row"> 
		            <div className="col-md-12"> 
		              {/* <!-- <label for="u-file">Upload File</label> --> */}
		              <input type="file" class="form-control-file form-file" id="exampleFormControlFile1"  onChange={handleFileChange}/>
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