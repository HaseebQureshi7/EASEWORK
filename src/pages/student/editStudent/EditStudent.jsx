import axios from 'axios';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopupContext } from '../../../components/Popup';
import './styles/editStudentStyles.scss';

export default function EditStudent({ openClose, value }) {

  const updateStudent_url = 'https://easework.herokuapp.com/api/editstudent/'
  const navigation = useNavigate()

  const { setCommentState } = useContext(PopupContext)

  var classId = ""
  var studentId = ""
  var studentName = ""
  var studentRoll = ""
  var studentAddress = ""
  var studentParent = ""
  var studentDob = ""
  var studentPhone = ""

  const studentNameRef = useRef()
  const studentRollRef = useRef()
  const studentAddressRef = useRef()
  const studentParentRef = useRef()
  const studentDobRef = useRef()
  const studentPhoneRef = useRef()

  if (value != null) {
    classId = value.classId
    studentId = value.studentId
    studentName = value.studentName
    studentRoll = value.studentRoll
    studentAddress = value.studentAddress
    studentParent = value.studentParent
    studentDob = value.studentDob
    studentPhone = value.studentPhone
  }

  function AfterUpdate() {
    setCommentState("STUDENT DETAILS WERE SUCCESSFULLY UPDATED!")
    navigation(-1);
  }

  function UpdateStudent() {
    axios.put(updateStudent_url + studentId, { name: studentNameRef.current.value, class_id: classId, roll: studentRollRef.current.value, address: studentAddressRef.current.value, parent: studentParentRef.current.value, dob: studentDobRef.current.value, phone: studentPhoneRef.current.value }).then(res => AfterUpdate()).catch(res => setCommentState("Error! Duplicate or Corrupt Entry Submitted!!"))
  }

  return (
    <>
      <div className="editStudentContainer">
        <div className="editStudentOptions">
          <h1>EDIT STUDENT</h1>
          <div className="editStudentBtns">
            <button className='updateStudentBtn' onClick={() => UpdateStudent()}>UPDATE</button>
            <button className='cancelStudentBtn' onClick={() => openClose(!openClose)}>CANCEL</button>
          </div>
        </div>
        <div className="editStudentFields">
          <div className="studentName">
            <h4>NAME</h4>
            <input type="text" ref={studentNameRef} defaultValue={studentName} />
          </div>
          <div className="studentRoll">
            <h4>ROLL No.</h4>
            <input type="number" ref={studentRollRef} defaultValue={studentRoll} />
          </div>
          <div className="studentAddress">
            <h4>ADDRESS</h4>
            <input type="text" ref={studentAddressRef} defaultValue={studentAddress} />
          </div>
          <div className="studentParent">
            <h4>PARENTAGE</h4>
            <input type="text" ref={studentParentRef} defaultValue={studentParent} />
          </div>
          <div className="studentDob">
            <h4>D.O.B</h4>
            <input type="text" ref={studentDobRef} defaultValue={studentDob} />
          </div>
          <div className="studentPhone">
            <h4>PHONE No.</h4>
            <input type="number" ref={studentPhoneRef} defaultValue={studentPhone} />
          </div>
        </div>
      </div>
    </>
  )
}
