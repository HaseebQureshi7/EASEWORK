import axios from 'axios'
import { useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import { PopupContext } from '../../../components/Popup'
import './styles/addStudentStyles.scss'

export default function AddStudent() {

    const addStudent_url = 'https://easework.herokuapp.com/api/addstudent'
    const navigation = useNavigate();
    const {state} = useLocation();
    const {setCommentState} = useContext(PopupContext)

    var classId = ''

    const studentNameRef = useRef()
    const studentRollRef = useRef()
    const studentAddressRef = useRef()
    const studentParentRef = useRef()
    const studentDobRef = useRef()
    const studentPhoneRef = useRef()

    if (state != null){
        classId = state.classId
    } 
    else {
        classId =''
    }

    function AddStudent(classId) {
        axios.post(addStudent_url, {name : studentNameRef.current.value, class_id: classId, roll: studentRollRef.current.value, address : studentAddressRef.current.value, parent:studentParentRef.current.value, dob : studentDobRef.current.value,phone:studentPhoneRef.current.value}).then(res => {navigation(-1);setCommentState("New Student " + studentNameRef.current.value + " Was Added!")}).catch(res => setCommentState("Error! Duplicate or Corrupt Entry Submitted!"))
    }

    return (
        <>
            <Navbar />
            <div className="addStudentContainer">
                <div className="addStudentOptions">
                    <h1>ADD STUDENT</h1>
                    <div className="addStudentBtns">
                        <button className='updateStudentBtn' onClick={()=> AddStudent(classId)}>ADD STUDENT</button>
                        <button className='cancelStudentBtn' onClick={() => navigation(-1)}>CANCEL</button>
                    </div>
                </div>
                <div className="addStudentFields">
                    <div className="studentName">
                        <h4>NAME</h4>
                        <input type="text" ref={studentNameRef} />
                    </div>
                    <div className="studentRoll">
                        <h4>ROLL No.</h4>
                        <input type="number" ref={studentRollRef} />
                    </div>
                    <div className="studentAddress">
                        <h4>ADDRESS</h4>
                        <input type="text" ref={studentAddressRef} />
                    </div>
                    <div className="studentParent">
                        <h4>PARENTAGE</h4>
                        <input type="text" ref={studentParentRef} />
                    </div>
                    <div className="studentDob">
                        <h4>D.O.B</h4>
                        <input type="text" ref={studentDobRef} />
                    </div>
                    <div className="studentPhone">
                        <h4>PHONE No.</h4>
                        <input type="number" ref={studentPhoneRef} />
                    </div>
                </div>
            </div>
        </>
    )
}
