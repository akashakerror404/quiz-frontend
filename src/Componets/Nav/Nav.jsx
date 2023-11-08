import React,{useState} from 'react'
import 'font-awesome/css/font-awesome.min.css';

// import 'font-awesome/css/font-awesome.min.css';
// import logo from '../../../static/logopixel.png';
// import logo from '../../../static/logopixel.png';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { clearUserData } from '../../Store/UserAction';
import axios from '../../axios'

function Nav() {
    const { isAuthenticated, username, role } = useSelector((state) => state.user);

    const [toggle,setToggle] =useState(false)
    const dispatch = useDispatch();

    const navigate=useNavigate();




    const handleLogout = async () => {
      try {
        const response = await axios.post(
          '/logout',
          { refresh_token: localStorage.getItem("refresh_token") },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 205) {
          // Check for the appropriate status code
  
          dispatch(clearUserData());
          localStorage.clear();

          axios.defaults.headers.common["Authorization"] = null;
          navigate('/signin');
          console.log("success");
        } else {
          console.log("Logout request was not successful");
        }
      } catch (e) {
        dispatch(clearUserData());
        localStorage.clear();
        navigate('/signin');

        console.log("logout not working", e);
      }
    };
  
  return (
    <>
    <div className='w-full h-[80px] bg-white  fixed z-50'>
        <div className='md:max-w-[1240px]  max-w-[330px] w-full h-full flex justify-end items-center m-auto'>
           
             
       

                
<button
  class="hidden md:flex relative  items-center justify-center p-2 px-4 py-1 overflow-hidden font-medium text-[#2d737a] text-sm transition duration-300 ease-out border-2 border-[#2d737a] rounded-full shadow-md group"
  onClick={() => {
    if (username) {
      handleLogout();
    } else {
      navigate('/signin');
    }
  }}
>
  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2d737a] group-hover:translate-x-0 ease">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg><span> {username ? "Logout" : ""}</span>
  </span>

  <span class="absolute flex items-center justify-center w-full h-full text-[#2d737a] text-sm transition-all duration-300 transform group-hover:translate-x-full ease">
    {username ? username : "Login"}
  </span>
  <span class="relative invisible">Button Text</span>
</button>




        
        






        
        

               
           
            <div className="md:hidden" onClick={()=>setToggle(!toggle)}>
            <button
  class="flex relative inline-flex items-center justify-center p-2 px-4 py-1 overflow-hidden font-medium text-[#2d737a] text-sm transition duration-300 ease-out border-2 border-[#2d737a] rounded-full shadow-md group"
  onClick={() => {
    if (username) {
      handleLogout();
    } else {
      navigate('/signin');
    }
  }}
>
  <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#2d737a] group-hover:translate-x-0 ease">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg><span> {username ? "Logout" : ""}</span>
  </span>

  <span class="absolute flex items-center justify-center w-full h-full text-[#2d737a] text-sm transition-all duration-300 transform group-hover:translate-x-full ease">
    {username ? username : "Login"}
  </span>
  <span class="relative invisible">Button Text</span>
</button>            </div>

        </div>
       
      
    </div>
      
                </>

  )
}

export default Nav
