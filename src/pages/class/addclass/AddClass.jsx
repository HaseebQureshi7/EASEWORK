import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import { PopupContext } from '../../../components/Popup'
import './styles/addClassStyles.scss'

export default function AddClass() {

    const addClass_url = 'https://easework.herokuapp.com/api/addclass'

    const {setCommentState} = useContext(PopupContext)
    const navigation = useNavigate()
    const classNameRef = useRef()
    var userId = null

    if (localStorage.getItem('user')){
        userId = JSON.parse(localStorage.getItem('user')).id
    }
    else {
        userId = null
    }

    function ForceReload() {
        window.location.reload();
      }

    function AddClass(userId) {
        if((classNameRef.current.value).length < 1) {
            setCommentState("Please Enter a Proper Class Name!")
        }
        else {
            axios.post(addClass_url, {name: classNameRef.current.value, owner : userId}).then(res=> {navigation(-1);ForceReload();setCommentState('New Class Was Added!')}).catch(res => setCommentState("Class Already Exists!"))
        }
            
    }

    return (
        <>
            <Navbar />
            <div className="addClassContainer">
                <div className="addClassOptions">
                    <h1>ADD CLASS</h1>
                    <div className="addClassBtns">
                        <button className='AddAddClassBtn' onClick={()=> AddClass(userId)}>ADD CLASS</button>
                        <button className='cancelAddClassBtn' onClick={() => navigation(-1)}>CANCEL</button>
                    </div>
                </div>
                <div className="addClassInput">
                    <h4>ENTER THE NAME OF CLASS</h4>
                    <input type="text" ref={classNameRef} placeholder='CLASS NAME' required />
                </div>
            </div>
        </>
    )
}
