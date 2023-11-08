import React, { useState, useEffect } from 'react';
import axios from '../../../../axios'
import {BASE_URL} from '../../../Const/Const'
import { useNavigate } from 'react-router-dom';



function Quizcard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();


  console.log(quizzes)

  const handlestartquiz = (quizId) => {
    navigate(`/startquiz/${quizId}`);
  };
  

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const response = await axios.get('/quiz_all/');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    }
  
    fetchQuizzes();
  }, []);
  
  

  return (
    <div>
      <div className='container mx-auto px-4 mt-4'>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="max-w-sm rounded overflow-hidden bg-[#2a98dd44] shadow-md h-full">
            <img className="w-full h-60" src={`${BASE_URL}${quiz.image}`} alt={quiz.quiz_name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{quiz.quiz_name}</div>

            </div>
            <div class=" items-center md:ml-20 ml-16 mb-4">
              <button
                className="relative inline-flex w-52 h-4 items-center px-12 py-3 overflow-hidden text-lg font-medium text-whit-600 border-2 border-[#90c6e8] rounded-md hover:text-white group hover:bg-gray-50"
                onClick={() => handlestartquiz(quiz.id)}
                >
                <span className="absolute left-0 block w-full h-0 transition-all bg-[#90c6e8] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="relative text-sm">START QUIZ</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizcard;
