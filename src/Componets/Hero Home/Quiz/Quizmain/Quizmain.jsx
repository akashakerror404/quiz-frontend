import React, { useState, useEffect } from 'react';
import Nav from '../../../Nav/Nav';
import { useParams } from 'react-router-dom';
import axios from '../../../../axios';
import { useNavigate } from 'react-router-dom';


function Quizmain() {
    const navigate = useNavigate();

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [timers, setTimers] = useState(Array(10).fill(null));
  const [seconds, setSeconds] = useState('');

  const { quizId } = useParams();
  const [Questionoptions, setQuestionoptions] = useState([]);
  const [questionId, setQuestionId] = useState(null);
  const [selectedData, setSelectedData] = useState([]); // State to store multiple selected data

  useEffect(() => {
    async function fetchQuestionsAndOptions() {
      try {
        const response = await axios.get(`/quiz_question/${quizId}/`);
        setQuestionoptions(response.data.questions_and_options);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    }

    fetchQuestionsAndOptions();
  }, []);

  const handleQuestionClick = (index) => {
    if (timers[index] === null) {
      const newTimers = [...timers];
      clearTimeout(newTimers[selectedQuestion]);
      setSeconds(10);
      let countdown = 10;

      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          countdown -= 1;
          setSeconds(countdown);
        } else {
          clearInterval(countdownInterval);
          setShowOptions(false);
        }
      }, 1000);

      newTimers[index] = countdownInterval;
      setTimers(newTimers);

      setSelectedQuestion(index);
      setShowOptions(true);
    }
  };

  const handleOptionChange = (questionId, optionText) => {
    // Check if the option already exists in selectedData
    const optionIndex = selectedData.findIndex((data) => data.questionId === questionId);
  
    // If the option exists, update it; otherwise, add it to selectedData
    if (optionIndex !== -1) {
      // Update the existing option
      const updatedData = [...selectedData];
      updatedData[optionIndex] = { questionId, optionText };
      setSelectedData(updatedData);
    } else {
      // Add the new option to selectedData
      setSelectedData((prevData) => [
        ...prevData,
        { questionId, optionText },
      ]);
    }
  };
  
  const handleSubmit = () => {
    // Create a count to keep track of the correct options
    let correctOptionCount = 0;
  
    // Iterate through selected data and compare with correct options
    for (const selected of selectedData) {
      const matchingQuestion = Questionoptions.find(
        (questionData) => questionData.question_id === selected.questionId
      );
  
      if (matchingQuestion) {
        const matchingOption = matchingQuestion.options.find(
          (option) => option.option_text === selected.optionText && option.is_correct
        );
  
        if (matchingOption) {
          correctOptionCount += 1;
        }
      }

      const selectedDataLength = selectedData.length;
      const questionOptionsLength = Questionoptions.length;

  navigate(`/result/${correctOptionCount}/${selectedDataLength}/${questionOptionsLength}`);

    }


    
    console.log('Correct Options Count:', correctOptionCount);
  };
  
  

  return (
    <>
      <Nav />

      <div>
        <div className='bg-blue-100 md:h-screen h-full p-9'>
          <div className='bg-blue-100 h-28'></div>

          <div className='bg-green-100 p-4'>
            {Questionoptions.length > 0 ? (
              Questionoptions.map((questionData, index) => (
                <div key={index} className='bg-white rounded-lg shadow-md mb-5'>
                  <div className='p-4'>
                    <h3
                      className='text-xl font-semibold mb-4'
                      onClick={() => handleQuestionClick(index)}
                    >
                      {questionData.question_text} (ID: {questionData.question_id})
                    </h3>

                    {selectedQuestion === index && showOptions && (
                      <div className='md:text-right text-left'>
                        {seconds > 0 ? (
                          <h1 className='text-red-500'>Countdown: {seconds} seconds</h1>
                        ) : (
                          <h1 className='text-red-500'>Time's up!</h1>
                        )}
                      </div>
                    )}

                    {selectedQuestion === index && showOptions && (
                      <div>
                        {questionData.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className='flex items-center space-x-2'
                            onClick={() => handleOptionChange(questionData.question_id, option.option_text)}
                          >
                            <input
                              type='radio'
                              name={`option${index}`}
                              value={option.option_text}
                            />
                            <span>{option.option_text}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Loading questions...</p>
            )}
          </div>
          <div className='flex justify-center items-center mt-5' >
          <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            SUBMIT
          </button>

          </div>
         
        </div>
      </div>
    </>
  );
}

export default Quizmain;
