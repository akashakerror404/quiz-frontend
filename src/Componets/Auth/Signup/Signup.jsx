import React ,{useState,navigate,useEffect}from 'react';
import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios'




import countdown from '../../Lotties/Countdown.json';


function Signup() {
  const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showEarth, setShowEarth] = useState(true);
    const [isLoading, setIsLoading] = useState(false); 
    const [isLoadingg, setisLoadingg] = useState(false);




    
    const [passwordStrength, setPasswordStrength] = useState({
        hasUppercase: false,
        hasDigit: false,
      });
    
      const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        const uppercaseRegex = /[A-Z]/;
        const hasUppercase = uppercaseRegex.test(newPassword);
    
        const digitRegex = /\d/;
        const hasDigit = digitRegex.test(newPassword);
    
        setPasswordStrength({ hasUppercase, hasDigit });
      };
      
    
  
    
      const handleSubmit = async () => {
        if (!passwordStrength.hasUppercase || !passwordStrength.hasDigit) {
          toast.error('Password Must contain at least one uppercase letter and one digit.');
          return;
        }
        if (password !== confirmPassword) {
          toast.error('Password and Confirm Password do not match.');
          return;
        }
        setisLoadingg(true)
        // Access form data from state variables
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('phone:', phone);
  
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        try{
  
          const userData = {
            username,
            email,
            password,
            phone,
          };
          const response = await axios.post('/signup',
                         userData ,{headers: 
                        {'Content-Type': 'application/json'},withCredentials : true});
                        if(response.status === 201) {
                          console.log(response.data);
                          navigate(`/otpconfirmation?username=${username}&email=${email}`)
                          // Clear the form fields after successful registration if needed
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setPhone('');
  
                        setConfirmPassword('');
                        }
                        if(response.status === 400) {
                          console.log(response.status)
                        }
          
        }catch(error){
          setisLoadingg(false)
  
          toast.error('username alredy exist.');
  
          console.error('Login failed:', error.message );
        }
  };

  return (
    <div>
      <div class="md:flex ">
            <div class="hidden md:flex md:w-1/2 bg-white ">
            <Lottie animationData={countdown}  size={40}/>

            </div>
            <div class="md:w-1/2  flex items-center justify-center h-screen">
            
            <div className="bg-blue-100 rounded-lg  shadow-xl w-5/6 ">
                <div className='md:p-2 p-1'>
                <span className='text-center text-2xl md:ml-40 ml-5 mt-11'>Welcome to quiz master</span>

                </div>
                <div className="p-5 w-100 flex flex-col items-center">
                    <h2 className="font-normal mb-2 text-xl text-center subpixel-antialiased">Sign Up</h2>
                    <p className="text-gray-500 mb-3"></p>
                    <input
                    style={{cursor:'pointer'}}
                    className="mb-4 w-full border rounded-full border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    
                    <input
                    style={{cursor:'pointer'}}
                    className="mb-4 w-full border rounded-full border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    style={{cursor:'pointer'}}
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                     <input
                     style={{cursor:'pointer'}}
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {!passwordStrength.hasUppercase && password.length > 0 && (
                    <p className="text-red-500 text-xs">Password must contain at least one uppercase letter.</p>
                  )}
                  {!passwordStrength.hasDigit && password.length > 0 && (
                    <p className="text-red-500 text-xs">Password must contain at least one digit.</p>
                  )}
                    <input
                    style={{cursor:'pointer'}}
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="password"
                    placeholder="Re-enter Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                     {password !== confirmPassword && confirmPassword !== '' && (
                    <p className="text-red-500 text-sm">Password and Confirm Password do not match.</p>
                  )}
                  <button class="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:text-white hover:bg-blue-700" onClick={handleSubmit}>Signup
                  </button>

                  
                    
                    <hr className="my-4" />
                    <p className="text-gray-700 mt-3 text-center">
                    Already have an account?{' '}
                    <a onClick={()=>navigate('/signin')}  className="text-blue-500" style={{cursor:'pointer'}}>
                        Login
                    </a>
                    </p>
   
                </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default Signup
