import React from 'react'
import { GiPartyPopper } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


// not responsive yet
const PickGamePage = () => {
const navigate = useNavigate();

const [game, setGame] = useState("");
const onClickGame = () => {
    setGame(game);
}

const onPlayGame = () => {
    if (game) {
        if (game === "Fill in the Blank") {
            navigate('/waitToPlayGame')
        }
    }
}

  return (
    <>
    <div className='pick_game_style container-p'>
        
        <div className='flex flex-col md:flex-row justify-around'>
            <div className='md:w-50 div_style flex flex-col'>
                
                <p className='fs-2 fw-bold'> <GiPartyPopper/> Step 1: Pick A Game <GiPartyPopper/></p>
                <div className='border border-dark p-4'>
                    <p className='fw-normal fs-5'>    
                        Get ready for an electrifying game of creative showdown! In this rapid-fire competition, you'll be randomly paired against two other players, and all of you will have a limited time to submit your responses to two prompts. 
                    </p>

                    <p className='fw-normal fs-5'>
                        It's a test of your quick thinking, humor, and creativity. Once all responses are in, it's time for a thrilling voting round where you'll decide which response reigns supreme, prompt by prompt. 
                    </p>
                    <p className='fw-bold fs-5'>
                        Can you outshine your two rivals and become the ultimate champion of wit and wordplay? 
                    </p>
                </div>

            </div>
            <div className='md:w-50 div_style flex flex-col'>
                <div className='w-75 h-100 set_back fs-3 rounded text-center justify-content-center flex'>
                    <button value={game} onClick={onClickGame} className='button_style border h-25 border-light set_color text-nowrap fs-5'>Quizoot</button>
                </div>
                <Link to='/quizGameLibrary' onClick={onPlayGame} className='button_style2 w-50 text-decoration-none'>Play Now</Link>
            </div>

        </div>
    </div>
    </>
  )
}

export default PickGamePage