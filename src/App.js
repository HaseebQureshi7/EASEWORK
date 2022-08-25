import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AnimatedPage from './components/AnimationProvider';
import { AutoLogin } from './components/AutoLogin';
import Popup, { PopupContext } from './components/Popup';
import { themeContext } from './context/themeContext';
import { userDataContext } from './context/userDataContext';
import './darkmode.scss';
import AddClass from './pages/class/addclass/AddClass';
import Class from './pages/class/Class';
import Dashboard from './pages/dashboard/Dashboard';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import AddStudent from './pages/student/addStudent/AddStudent';
import Student from './pages/student/Student';

function App() {

  const [theme, setTheme] = useState(false)
  const [userData, setUserData] = useState(false)
  const location = useLocation();
  const navigation = useNavigate()

  const [commentState, setCommentState] = useState('')

  useEffect(() => {
    if (localStorage.getItem('themeMode')) {
      const currentTheme = JSON.parse(localStorage.getItem('themeMode'))
      setTheme(currentTheme.theme)
    }
    else {
      localStorage.setItem('themeMode', JSON.stringify({ 'theme': theme }))
    }
    AutoLogin(navigation)
  }, [])
  
  
  useEffect(()=> {
    localStorage.setItem('themeMode', JSON.stringify({ 'theme': theme }))
  }, [theme])
  

  setTimeout(() => {
    setCommentState("")
  }, 7000);


  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      <themeContext.Provider value={{ theme, setTheme }}>
        <PopupContext.Provider value={{ commentState, setCommentState }}>
          <Popup comment={commentState} />
          <div className={theme === false ? "app light" : "app dark"}>
            <AnimatePresence mode='wait'>
              <Routes key={location.pathname} location={location}>
                <Route path='' element={<AnimatedPage><Landing /></AnimatedPage>} />
                <Route path='login' element={<AnimatedPage><Login /></AnimatedPage>} />
                <Route path='signup' element={<AnimatedPage><Signup /></AnimatedPage>} />
                <Route path='dashboard' element={<AnimatedPage><Dashboard /></AnimatedPage>} />
                <Route path='class' element={<AnimatedPage><Class /></AnimatedPage>} />
                <Route path='student' element={<AnimatedPage><Student /></AnimatedPage>} />
                <Route path='addstudent' element={<AnimatedPage><AddStudent /></AnimatedPage>} />
                <Route path='addclass' element={<AnimatedPage><AddClass /></AnimatedPage>} />
              </Routes>
            </AnimatePresence>
          </div>
        </PopupContext.Provider>
      </themeContext.Provider>
    </userDataContext.Provider>

  );
}

export default App;
