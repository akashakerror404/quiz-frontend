import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';


function Otp() {
const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  console.log(username)
  const email = queryParams.get('email');
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Generate confetti particles at different origins
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

 

  return (
    <div>
        <div className='md:p-0 p-0'>
    <div className=" h-72 bg-red-500 md:w-[400px] w-[340px]   rounded-2xl mx-auto md:mt-60 mt-32 ">
    <div className=" animate-pulse w-full h-60 rounded-2xl bg-blue-500 flex-row items-center h-full justify-center space-x-5">
        <p className='md:text-4xl text-3xl pt-12 md:pl-11 pl-10 text-white font-mono'>Congratulations! </p>

        <p className='pt-6 pl-3 mb-4 text-white md:text-base text-sm'> 
      {username} your registration has been completed. We have sent a verification email to your {email}
      Please click the link in the email to verify your account.
    </p>        




      
      
    </div>
    <div className= 'md:pl-36 pl-28 mt-5'>
  <Link to="/"> 
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <span className="sr-only">Icon description</span>
      Back to 🏠
      <svg className="w-4 h-4 pl-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </Link>
</div>
   
  </div>
  </div>
  </div>
  );
}

export default Otp;
