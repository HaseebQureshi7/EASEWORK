import './styles/studentStyles.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import EditStudent from './editStudent/EditStudent'
import { useContext, useState } from 'react'
import axios from 'axios'
import { PopupContext } from '../../components/Popup'

export default function Student() {

    const { state } = useLocation();
    const [addStudent, setAddStudent] = useState(false);
    const [sure, setSure] = useState(false);
    const navigation = useNavigate();
    const { setCommentState } = useContext(PopupContext)

    const deleteStudent_url = "https://easework.herokuapp.com/api/deletestudent/"

    var classId = ""
    var studentId = ""
    var studentName = ""
    var studentRoll = ""
    var studentAddress = ""
    var studentParent = ""
    var studentDob = ""
    var studentPhone = ""

    if (state != null) {
        classId = state.classId
        studentId = state.id
        studentName = state.sname
        studentRoll = state.roll
        studentAddress = state.address
        studentParent = state.parent
        studentDob = state.dob
        studentPhone = state.phone
    }
    else {
        studentId = ''
        studentName = ''
        studentRoll = ''
        studentAddress = ''
        studentParent = ''
        studentDob = ''
        studentPhone = ""
    }

    function DeleteStudent(id) {
        axios.get(deleteStudent_url + id).then(res => { navigation(-1); setCommentState("Student " + studentName + " Was Removed!") })
    }

    return (
        <>
            <Navbar />

            {addStudent === true ? <EditStudent openClose={setAddStudent} value={{ classId: classId, studentId: studentId, studentId: studentId, studentName: studentName, studentRoll: studentRoll, studentAddress: studentAddress, studentParent: studentParent, studentPhone: studentPhone, studentDob: studentDob }} /> : <div className="studentContainer">
                <div className="studentOptions">
                    <h1 className="studentId">STUDENT ID : {studentId}</h1>
                    <div className="studentBtns">
                        <button className='studentEdit' onClick={() => setAddStudent(!addStudent)}>EDIT STUDENT</button>
                        {sure === false ? <button className='studentDelete' onClick={() => { setSure(!sure) }}>DELETE STUDENT</button> : <button style={{ boxShadow: 'rgba(224, 20, 20, 0.4) 0px 8px 24px, rgba(255, 12, 12, 0.4) 0px 16px 56px, rgba(255, 12, 12, 0.4) 0px 24px 80px' }} className='studentDelete' onClick={() => DeleteStudent(studentId)}>ARE YOU SURE ?</button>}
                    </div>
                </div>
                <div className="studentFields">
                    <div className="studentName">
                        <h4>NAME</h4> <h3>{studentName}</h3></div>
                    <div className="studentRoll">
                        <h4>ROLL No.</h4> <h3>{studentRoll}</h3>
                    </div>
                    <div className="studentAddress">
                        <h4>ADDRESS</h4> <h3>{studentAddress}</h3>
                    </div>
                    <div className="studentParent">
                        <h4>PARENTAGE</h4> <h3>{studentParent}</h3>
                    </div>
                    <div className="studentDob">
                        <h4>D.O.B</h4><h3>{studentDob}</h3>
                    </div>
                    <div className="studentPhone">
                        <h4>PHONE No.</h4><h3> {studentPhone}</h3>
                    </div>
                </div>
            </div>}
        </>
    )
}
