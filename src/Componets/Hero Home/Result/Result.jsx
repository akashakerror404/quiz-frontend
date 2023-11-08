import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import sad from '../../Lotties/sad.json';
import happy from '../../Lotties/happy.json';
import axios from '../../../axios';
import { useSelector ,useDispatch } from 'react-redux';
import Nav from '../../Nav/Nav';
import { useNavigate } from 'react-router-dom';


function Result() {
  const navigate = useNavigate();

  const { isAuthenticated, username, role } = useSelector((state) => state.user);

  const { correctOptionCount, selectedDataLength, questionOptionsLength } = useParams();


  useEffect(() => {
    async function sendResultData() {
      try {
        const usernameValue = username; // Replace with the actual username.
        const correctOptionCountValue = correctOptionCount; // Replace with the correct count.
  
        const postData = {
          username: usernameValue,
          correctOptionCount: correctOptionCountValue,
        };
  
        const response = await axios.post('/result/', postData);
  
        // Handle the response if needed.
      } catch (error) {
        console.error('Error posting result data:', error);
      }
    }
  
    sendResultData();
  }, []);
  

  return (
    <div>
      <Nav/>

    <div class="md:flex mb-4">
      <div class="md:w-1/2  ">

      {correctOptionCount > 1 ? (
            <Lottie animationData={happy} size={50}  />
          ) : (
            <Lottie animationData={sad} size={50}  />)
          }
      </div>
      <div class="md:w-1/2 md:h-screen  flex justify-center items-center  p-12">
        <div className='bg-blue-100 w-full h-full flex justify-center items-center rounded-md shadow-md'>
          <div className=''>
              <p className='text-center font-bold mb-4'>Total Question:  <span className='text-red-500 font-bold'>{selectedDataLength}</span></p>
            <p  className='text-center  font-bold mb-4'>Answered Questions:  <span className='text-red-500 font-bold'>{questionOptionsLength}</span></p>
            <p  className='text-center  font-bold mb-4'>Your Score: <span className='text-red-500 font-bold'>{correctOptionCount}</span></p>
            <div className='flex justify-center items-center'>
            <button onClick={navigate('/home')} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Back to home
          </button>

            </div>
        
            </div>
            

        </div>


      </div>
    </div>




    </div>
  );
}

export default Result;
