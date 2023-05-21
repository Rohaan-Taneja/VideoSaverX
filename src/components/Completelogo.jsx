import React from 'react'
import logo from '../images/logo.png'

const Completelogo = () => {
  return (
    <div  data-aos="zoom-out"   data-aos-duration="1000">

        {/* //step1 */}
        <div className='completelogo'>
            <div className='logoimagediv'> <img src={logo} alt="" /></div> 
            <div className='VideoSaver'>VideoSaver</div> 
            <div className='X'>X</div> 
          </div>
      
    </div>
  )
}

export default Completelogo
