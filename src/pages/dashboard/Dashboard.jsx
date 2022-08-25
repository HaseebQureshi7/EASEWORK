import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AutoLogin } from '../../components/AutoLogin'
import Navbar from '../../components/navbar/Navbar'
import { userDataContext } from '../../context/userDataContext'
import './styles/dashboardStyles.scss'

export default function Dashboard() {

  const { state } = useLocation();
  const navigation = useNavigate();
  const { userData, setUserData } = useContext(userDataContext);
  const numOfClasses = userData.length;
  const [numOfStudents, setNumOfStudents] = useState(0)
  // const freshData = state.resData.data
  // console.log(userData)
  if (userData === false) {
    if (state != null) {
      setUserData(state.resData.data)
    }
    else {
      AutoLogin(navigation)
    }
  }

  function GetStudents(id, name) {
    navigation('/class', {state : {id : id, class: name}})
    // console.log(id)
  }

  return (
    <>
      <Navbar />
      <div className="dashboardContainer">
        <div className="dashboardOptions">
          <div className="dashboardHeading">
            <h1>Dashboard</h1>
          </div>
          <div className="dashboardButtons">
            <button onClick={()=> navigation('/addclass')} className='dashboardAddClassbtn'>+ Add Class</button>
          </div>
        </div>
        <div className="dashboardClassSection">
          <div className="dashboardNumOfClasses">
            <h3>YOUR CLASSES : {numOfClasses}</h3>
          </div>
          <div className="dashboardClasses">
            {userData && userData.map((data, i) => {
              return (<motion.div onClick={() => GetStudents(data.id, data.name)} key={data.id} initial={{ opacity: 0, x: -125 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -125 }} transition={{ duration: i/4 }} className="dashboardClass">
                <h3>Class</h3>
                <h1>{data.name}</h1>
                {/* <h3>View Details</h3> */}
              </motion.div>)
            })}
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}
