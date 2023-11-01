import React from 'react'

const WaitPlayGame = () => {
  return (
    <section className='wait_play_style container-p'>
        <div className='d-flex flex-col align-items-center'>
            <div className='div_style mx-5 flex flex-col md:flex-row justify-content-around text-nowrap text-center'>
                <p className='fs-1 fw-normal me-1'>Playing:</p>
                <p className='fw-bold fs-1'>Quizoot</p>
                <span className='mt-5 mx-5'></span>
  
                <p className='fs-1 fw-normal me-1'>Game Code: </p>
                <p className='fw-bold fs-1 mr-5'>934840</p>
            </div>
            <p className='fs-1 fw-normal mt-5'>Players</p>
            <button className='button_style'>Start Game</button>
        </div>
    </section>
  )
}

export default WaitPlayGame