import axios from 'axios'
import { motion } from 'framer-motion'
import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { micro_animations } from '../../components/AnimationProvider'
import { userDataContext } from '../../context/userDataContext'
import './styles/loginStyles.scss'


export default function Login() {
  
  const {userData, setUserData} = useContext(userDataContext)

  const navigation = useNavigate()

  const login_url = 'https://easework.herokuapp.com/api/login'

  const usernameRef = useRef()
  const passwordRef = useRef()

  const [retry, setRetry] = useState('')

  function HandleLogin(res) {
    localStorage.setItem('user', JSON.stringify({ 'id': res.user_id, 'username': usernameRef.current.value, password: passwordRef.current.value }))
    setUserData(res.data)
    navigation('/dashboard')
  }

  const Login = async (e) => {
    e.preventDefault()
    await axios.post(login_url, { username: usernameRef.current.value, password: passwordRef.current.value }).then(res => { HandleLogin(res.data);}).catch(res => { setRetry('Invalid Username or Password!') })
  }

  return (
    <>
      <div className="loginContainer">
        <motion.div variants={micro_animations} initial='micro_initial' animate='micro_animate' exit='micro_exit' className="loginSideImage">
          <img src={require('../../images/students-with-teacher-min.jpg')} alt="sideImage" />
        </motion.div>
        <div className="loginFields">
          <div className="loginLogo">
            <img src={require("../../images/Logo-easework.png")} alt="Logo" />
          </div>
          <div className="loginHead">
            <h1>LOGIN</h1>
          </div>
          <form onSubmit={(e) => Login(e)}>
            <div className="loginInputs">
              <div className="usernameInput">
                <input type="text" name='username' ref={usernameRef} placeholder='username' required />
              </div>
              <div className="passwordInput">
                <input type="password" name='userpassword' ref={passwordRef} placeholder='password' required />
              </div>
            </div>
            <p className='retryMessage' >{retry}</p>
            <div className="loginLoginBtn">
              <button type='submit'>LOGIN</button>
            </div>
          </form>
          <p>DON’T HAVE AN ACCONT?</p>
          <div className="loginSignupBtn">
            <button onClick={() => navigation('/signup')}>SIGNUP</button>
          </div>
        </div>
      </div>
    </>
  )
}
