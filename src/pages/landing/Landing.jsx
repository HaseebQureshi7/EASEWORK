import './styles/landingStyles.scss'
import React, { useContext } from 'react'
import { themeContext } from '../../context/themeContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { micro_animations } from '../../components/AnimationProvider'

export default function Landing() {
  const { theme, setTheme } = useContext(themeContext)
  const navigation = useNavigate()
  return (
    <>
      <motion.div variants={micro_animations} initial='micro_initial' animate='micro_animate' exit='micro_exit' className="landingContainer">
        <div className="landingLogo">
          <img src={require('../../images/Logo-easework.png')} alt="" />
        </div>
        <div className="landingMototext test">
          <h2>SIMPLE, FAST, & FREE ERP SYSTEM</h2>
        </div>
        <div className="landingbtns">
          <div className="loginBtn">
            <button onClick={() => navigation('/login')}>LOGIN</button>
          </div>
          <div className="signupBtn">
            <button onClick={() => navigation('/signup')}>SIGNUP</button>
          </div>
        </div>
        <div className="landingDarkmodeImg">
          <img onClick={() => setTheme(!theme)} src={require("../../images/darkmode-logo.png")} alt="" />
        </div>
        <div className="projectDetails">
          <p className='projectVersion'><a href='https://github.com/HaseebQureshi7'>VERSION - 1.0</a></p>
          <br />
          <p>THIS SOFTWARE IS DEVELOPED AND MAINTAINED BY <a href="https://www.linkedin.com/in/haseebqureshiishere">HASEEB QURESHI</a>.</p>
        </div>
      </motion.div>
    </>
  )
}
