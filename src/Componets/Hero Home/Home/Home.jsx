import React from 'react'
import Hero from '../Hero/Hero'
import Nav from '../../Nav/Nav'
import Quizcard from '../Quiz/Quizcard/Quizcard'

function Home() {
  return (
    <div>
<Nav/>      
<Hero/>
<hr></hr>
<div className='bg-[#f2f5eb] p-2'>

<Quizcard/>
</div>


    </div>
  )
}

export default Home
