import { motion } from 'framer-motion'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { themeContext } from '../../context/themeContext'
import { userDataContext } from '../../context/userDataContext'
import { micro_animations } from '../AnimationProvider'
import './styles/navbarStyles.scss'

export default function Navbar() {

    const navigation = useNavigate()

    const { theme, setTheme } = useContext(themeContext);
    const { userData, setUserData } = useContext(userDataContext)
    var currentUser = ''

    if ((localStorage.getItem('user'))) {
        currentUser = JSON.parse(localStorage.getItem('user')).username
    }
    else {
        currentUser = ''
    }

    function Logout() {
        localStorage.clear();
        setUserData('');
        navigation('/')
    }

    return (
        <>
            <div className="navContainer">
                <motion.div variants={micro_animations} initial='micro_initial' animate='micro_animate' exit='micro_exit' className="navLogo">
                    <img onClick={() => navigation('/dashboard')} src={require("../../images/Logo-easework.png")} alt="logo" />
                    {/* <h6>LOGGED IN AS : {currentUser}</h6> */}
                </motion.div>
                <div onClick={() => setTheme(!theme)} className="navDarkModeLogo">
                    <img src={require("../../images/darkmode-logo.png")} alt="dark-mode" />
                </div>
                {/* <div className="portraitOptions">
                    <h1>|||</h1>
                </div> */}
                <motion.div variants={micro_animations} initial='micro_initial' animate='micro_animate' exit='micro_exit' className="navUserOptions">
                    <div className="navUser">
                        <h3>{currentUser}</h3>
                    </div>
                    <div className="navLogoutBtn">
                        <button onClick={() => Logout()}>LOGOUT</button>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
