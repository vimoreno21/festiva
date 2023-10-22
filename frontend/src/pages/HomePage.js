import React from 'react'
import { ReactComponent as SvgUndraw } from '../images/undraw_online_party_re_7t6g.svg'
import List from '../components/List'
import QrCodeImg from '../images/Untitled 1.png'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="homepage_div">
        <div className="flex flex-col-reverse md:flex-row items-center justify-content-between mb-4">
            <SvgUndraw className='img_style'/>
            <div className='d-flex flex-column w-50'>
                <p className="h3 text-start fw-bold">The game:</p>
                <p className='fs-5 text-start fw-normal '>Unleash the fun with Festiva! Dive into a whirlwind of hilarious prompts, witty comebacks, and unforgettable party moments.
                    Perfect for friends, family, and every festivity in between. Let the games begin!</p>
            </div>
        </div>

        <div className='flex flex-col md:flex-row items-center'>

            <div className='d-flex flex-column'>
                <p className="text-start h3 fw-bold pb-2">To get started:</p>

                <List headerText='Create & Sign In:' bodyText='Begin by setting up your account and signing in on our website.' number='1.'/>
                <List headerText='Host the Fun:' bodyText='Once in, you can host a game and set the stage for an unforgettable evening.' number='2.'/>
                <List headerText='Join via App:' bodyText='Players, grab your phones! Scan the QR code to download the Festiva! app and hop into the hosted game.' number='3.'/>
                <List headerText='Play & Laugh:' bodyText='With everyone connected, unleash your wittiest answers and enjoy the hilarity that ensues.' number='4.'/>
            </div>

            <div className='d-flex flex-column align-items-center justify-content-center w-50'>
                <img src={QrCodeImg} alt='qr code' className='img_sizing'/>
                <Link to='./LoginPage.js' className='button_style text-decoration-none'>
                   Get started
                </Link>
            </div>

        </div>
       

        
    </div>
  )
}

export default HomePage