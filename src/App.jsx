import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Componets/Auth/Signup/Signup'
import Signin from './Componets/Auth/Signin/Signin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Otp from './Componets/Auth/Signup/Otp'
import Home from './Componets/Hero Home/Home/Home'
import Quizmain from './Componets/Hero Home/Quiz/Quizmain/Quizmain'
import Result from './Componets/Hero Home/Result/Result'

function App() {

  return (
    <>
    
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route exact path="/otpconfirmation" element={<Otp/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route path="/startquiz/:quizId" element={<Quizmain />}/>
          <Route
          exact
          path="/result/:correctOptionCount/:selectedDataLength/:questionOptionsLength"
          element={<Result />}
        />






          
        </Routes>
      </div>
    </Router>       
   
  </>
  )
}

export default App
