import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { micro_animations } from '../../components/AnimationProvider'
import './styles/signupStyles.scss'

export default function Signup() {

  const navigation = useNavigate()
  const signup_url = 'https://easework.herokuapp.com/api/signup'

  const usernameRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()

  const [retry, setRetry] = useState('')

  function HandleSignup(res) {
    localStorage.setItem('user', JSON.stringify({ 'id': res, 'username': usernameRef.current.value, password: passwordRef.current.value }))
    navigation('/dashboard')
  }


  const Signup = async (e) => {
    e.preventDefault()
    await axios.post(signup_url, { username: usernameRef.current.value, password: passwordRef.current.value, email: emailRef.current.value }).then(res => { HandleSignup(res.data); }).catch(res => setRetry("User Already Exists!"))
  }

  return (
    <>
      <div className="signupContainer">
        <motion.div variants={micro_animations} initial='micro_initial' animate='micro_animate' exit='micro_exit' className="signupSideImage">
          <img src={require('../../images/students-with-teacher-min.jpg')} alt="sideImage" />
        </motion.div>
        <form onSubmit={(e) => Signup(e)}>
          <div className="signupFields">
            <div className="signupLogo">
              <img src={require("../../images/Logo-easework.png")} alt="Logo" />
            </div>
            <div className="signupHead">
              <h1>SIGNUP</h1>
            </div>
            <div className="signupInputs">
              <div className="usernameInput">
                <input type="text" ref={usernameRef} placeholder='username' required />
              </div>
              <div className="emailInput">
                <input type="email" ref={emailRef} placeholder='email' required />
              </div>
              <div className="passwordInput">
                <input type="password" ref={passwordRef} placeholder='password' required />
              </div>
            </div>
            <p style={{ color: 'red' }}>{retry}</p>
            <div className="signupSignupBtn">
              <button type='submit'>SIGNUP</button>
            </div>
            <p>ALREADY HAVE AN ACCONT?</p>
            <div className="signupLoginBtn">
              <button onClick={() => navigation('/login')}>LOGIN</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
