import React, { useState, useEffect } from 'react'
import './index.sass'
import NavigationLinksInstructor from './Navigation-links-instructor'
import NavigationLinksStudent from './Navigation-links-student'
import Feedback from '../Feedback'
import { Link, withRouter } from 'react-router-dom'
import { retrieveOtherUser } from '../../logic'

export default withRouter(function({ id, history }) {
  const [role, setRole] = useState()
  const [notification, setNotification] = useState(null)
  const { token } = sessionStorage

  useEffect(() => {
    (async () => {
      try {
        // retrieve the user which we want information
        const user = await retrieveOtherUser(token, id)
        const { user: { role } } = user
        setRole(role)
      } catch ({ message }) {
        setNotification({ error: true, message })
      }
    })()
  }, [token, id])

  return <>
    <div className='title'>
      <i onClick={() => history.goBack()} className='material-icons'>undo</i>
      <h3 className='title'>Your account</h3>
    </div>
    <section className='account'>
      <Link to={`/profile/${id}`}>
        <i className='material-icons detail-user__icon'>create</i>
        <p>Profile</p>
      </Link>
      { role === 'student' && <NavigationLinksStudent id={id} /> }
      { role === 'instructor' && <NavigationLinksInstructor id={id} /> }
    </section>
    { notification && <Feedback {...notification} />}
  </>
})
