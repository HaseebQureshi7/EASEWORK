import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AutoLogin } from '../../components/AutoLogin'
import Navbar from '../../components/navbar/Navbar'
import { PopupContext } from '../../components/Popup'
import './styles/classStyles.scss'

export default function Class() {

    const { state } = useLocation()
    const navigation = useNavigate()
    const students_url = 'https://easework.herokuapp.com/api/viewstudents/'
    const deleteClass_url = 'https://easework.herokuapp.com/api/deleteclass/'

    const {setCommentState} = useContext(PopupContext)
    const [studentData, setStudentData] = useState(null)
    const [sure, setSure] = useState(false)
    var className = ''
    var studentLength = 0

    if (state != null) {
        className = state.class
    }
    else {
        className = ""
    }

    useEffect(() => {
        axios.get(students_url + state.id).then(res => { setStudentData(res.data) }).catch(res=> setStudentData(null))
    }, [])

    if (studentData != null) {
        studentLength = studentData.length
    }
    else {
        studentLength = 0
    }
    
    function ForceReload() {
        window.location.reload();
      }

    function GetStudent(id, sname, roll, parent, phone, address, dob) {
        navigation('/student', { state: { id: id, classId: state.id, sname: sname, roll: roll, parent: parent, phone: phone, address: address, dob: dob } })
    }

    function HandleDissolve (className) {
        AutoLogin(navigation);
        ForceReload()
        setCommentState("CLASS " + className + " WAS DISSOLVED!")        
    }
    
    function DissolveClass(classId) {
        axios.get(deleteClass_url+classId).then(res=> {HandleDissolve(className)})
    }

    return (
        <>
            <Navbar />
            <div className="classContainer">
                <div className="classOptions">
                    <div className="classHeading">
                        <h1>Class {className}</h1>
                    </div>
                    <div className="classButtons">
                        <button className='classAddStudentbtn' onClick={() => navigation('/addstudent', { state: { classId: state.id } })}> ADD STUDENT</button>
                        {sure === false ? <button className='classDeleteClassbtn' onClick={() => { setSure(!sure) }}> DISSOLVE CLASS</button> : <button style={{boxShadow: 'rgba(224, 20, 20, 0.4) 0px 8px 24px, rgba(255, 12, 12, 0.4) 0px 16px 56px, rgba(255, 12, 12, 0.4) 0px 24px 80px'}} className='classDeleteClassbtn' onClick={() => DissolveClass(state.id)}> ARE YOU SURE?</button>}
                    </div>
                </div>

                <div className="classNoOfStudents">
                    <h3>Total Students : {studentLength}</h3>
                </div>
                <div className="classStudents">
                    {studentData && studentData.map((data, i) => {
                        return (<motion.div initial={{y: 25, opacity:0}} animate={{y: 0, opacity:1}} exit={{y: 25, opacity:0}} transition={{delay: i/3}} onClick={() => GetStudent(data.id, data.name, data.roll, data.parent, data.phone, data.address, data.dob)} key={data.id} className="classStudent">
                            <h3>{data.roll}</h3>
                            <h3>{data.name}</h3>
                            <h3>{data.parent}</h3>
                            <h3>{data.phone}</h3>
                        </motion.div>)
                    })}
                </div>
            </div>
        </>
    )
}
