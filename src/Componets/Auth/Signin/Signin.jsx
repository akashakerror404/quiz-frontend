import React ,{useState,navigate,useEffect}from 'react';
import axios from '../../../axios'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setUserData} from '../../../Store/UserAction'


import Lottie from 'lottie-react'
import { useNavigate } from 'react-router-dom';


import  Quiz from '../../Lotties/Quiz.json';

function Signin() {


    const dispatch=useDispatch();
    const navigate = useNavigate();
  
  
     const [username, setUsername] = useState('');
   
     const [password, setPassword] = useState('');
     const [showEarth, setShowEarth] = useState(true);
     const [isLoading, setisLoading] = useState(false);
  
  
   
     const handleSubmit = async (e) => { // Add 'async' here
      e.preventDefault();
      // localStorage.clear();
  
      setisLoading(true)
      const user = {
        username: username,
        password: password,
  
      };
      try {
        // Create the POST request
        const { data } = await axios.post(
          '/token/',
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        console.log(data)
  
  
        const accessToken=data.access
        // const role=data.role
        const role = data.is_superuser ? 300 : "";
        console.log("role",role)
  
        const userId=data.id
        console.log(userId)
  
        
  
    
        // Initialize the access & refresh token in local storage.
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
  
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('userid',data.id);
        localStorage.setItem('username',username);
        console.log("one")
        dispatch(setUserData({username,role,userId}))
        console.log("two")

  
  
        if (role === 300) {
          console.log("here two")

          navigate('/dashboard'); // Adjust the URL as needed
        } else {
          console.log("here")
          navigate('/home');
        }
      } catch (error) {
        if (error.response) {
          setisLoading(false)
  
          if (error.response.status === 401) {
            // Unauthorized (user name or password not matched)
            toast.error('User name or password do not match.');
          } else {
            // Other server errors
            toast.error('An error occurred during login. Please try again later.');
          }
        } else {
          // Network error or other client-side error
          toast.error('An error occurred. Please check your network connection.');
        }
      
  
        // Handle any errors here
        console.error(error);
      }
    };





  return (
    <div>
          <ToastContainer position="top-center" autoClose={5000} />

      <div class="md:flex mb-4">
        <div class="hidden md:flex md:w-1/2 bg-white ">
        <Lottie animationData={Quiz}  size={40}/>

        </div>
        <div class="md:w-1/2 bg-blue-100 flex items-center justify-center h-screen ">
        <div className=" flex flex-col items-center  bg-white w-4/6 p-4 rounded-md">
                    <span className='mb-5'>Welcome to Quiz master</span>

                    <h2 className=" mb-2 text-xl text-center font-semibold subpixel-antialiased">Sign In</h2>
                    <p className="text-gray-500 mb-3"></p>
                    <input
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="text"
                    style={{cursor:'pointer'}}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
               
                  
                    <input
                    style={{cursor:'pointer'}}
                    className="mb-4 w-full border border-gray-300 rounded-full px-3 py-2 outline-none focus:border-blue-500 text-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  
              <button class="w-full h-12 px-6 text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:text-white hover:bg-blue-700" onClick={handleSubmit}>Signin</button>

              {/* <span className='text-gray-700 mt-3 hover:text-red-500'style={{cursor:'pointer'}} onClick={()=>navigate('/forgotpassword')}>forgot password ?</span> */}

                    <p className="text-gray-700 mt-3 text-center">
                    Don't have an account?{' '}
                    <a onClick={()=>navigate('/signup')}  className="text-blue-500" style={{cursor:'pointer'}}>
                        Sign Up
                    </a>
                    </p>
                    
                    <hr className="my-4" />
                </div>
        </div>
        </div>
    </div>
  )
}

export default Signin
