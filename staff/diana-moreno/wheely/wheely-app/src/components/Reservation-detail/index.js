import React, { useState, useEffect, Fragment } from 'react';
import './index.sass'
import Navbar from '../Navbar'
import { retrievePractice, retrieveUser, cancelPractice} from '../../logic'
const moment = require('moment')

export default function ({ id, onBack }) {
  const { token } = sessionStorage
  const [role, setRole] = useState()
  const [nameInstructor, setNameInstructor] = useState()
  const [nameStudent, setNameStudent] = useState()
  const [surnameInstructor, setSurnameInstructor] = useState()
  const [surnameStudent, setSurnameStudent] = useState()
  const [day, setDay] = useState()
  const [time, setTime] = useState()
  const [instructorId, setInstructorId] = useState()
  const [practiceId, setPracticeId] = useState()


  useEffect(() => {
    (async () => {
      try {
        const user = await retrieveUser(token) // no sirve, hay que pasar el id de quien hace la practica
        const { user: { role } } = user
        setRole(role)

        const result = await retrievePractice(token, id)
        const { instructorId: { name: nameInstructor, surname: surnameInstructor, _id: instructorId }, date , _id} = result.practice
        let [day, time] = moment(date).format('DD-MM-YYYY HH:mm').split(' ')

        setNameInstructor(nameInstructor)
        setSurnameInstructor(surnameInstructor)
        setNameStudent(nameStudent)
        setSurnameStudent(surnameStudent)
        setDay(day)
        setTime(time)
        setPracticeId(_id)
        setInstructorId(instructorId)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleCancel = async () => {
    try {
      await cancelPractice(token, instructorId, practiceId)
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Reservation detail</h3>
    </div>
    <section className='reservation-detail'>
      <div>
        <p>Those are your reservation details: </p>
        <p><b>Date: </b>{day}</p>
        <p><b>Time: </b>{time}</p>
        <p><b>Place: </b>In your driving school</p>
        <p><b>Instructor: </b>{nameInstructor} {surnameInstructor}</p>
        <p>Do you want to cancel the practice?</p>
        <p>Keep in mind that you can cancel it notifying with 24h of advance. In this case, your credit will be returned.</p>
      </div>
        <button class='reservation-detail__button'onClick={handleCancel} >Cancel</button>
    </section>
  </>
}
