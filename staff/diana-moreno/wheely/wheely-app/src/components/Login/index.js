import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'
import { authenticateUser, retrieveUser } from '../../logic'
import Context from '../CreateContext'

export default withRouter(function({ error, history }) {
  const [notification, setNotification] = useState(null)
  const { setRoleOwner, setNameSurname, setMyId } = useContext(Context)

  // prepare the data from submit form
  const handleSubmit = event => {
    event.preventDefault()
    const { email: { value: email }, password: { value: password } } = event.target
    handleLogin(email, password)
  }

  const handleLogin = async (email, password) => {
    try {
      const token = await authenticateUser(email, password)
      sessionStorage.token = token
      const user = await retrieveUser(token)
      const nameSurname = user.user.name.concat(' ').concat(user.user.surname)

      // save my user data in Context
      setMyId(user.user.id)
      setRoleOwner(user.user.role)
      setNameSurname(nameSurname)
      history.push('/home')
    } catch ({ message }) {
      setNotification({ error: true, message })
    }
  }

  return (
    <section className='login'>
    <header className='login__container'>
      <h1 className='login__title'>Wheely</h1>
    </header>
    <main  className='login__container'>
      <p className='login__subtitle'>Instructors and students area</p>
      <form className='login__form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          className='login__form-item'
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          className='login__form-item'
        />
        <button className='login__button'>Enter</button>
      </form>
      <Feedback {...notification} />
    </main>
  </section>
  )
})
