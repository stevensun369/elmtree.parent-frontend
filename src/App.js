import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authURL } from './env'

// parent
import ParentIndex from './screens/ParentIndex'
import ParentHomeScreen from './screens/ParentHomeScreen'
import ParentAddStudent from './screens/ParentAddStudent'
import ParentStudentScreen from './screens/ParentStudentScreen'
import ParentStudentSubjectScreen from './screens/ParentStudentSubjectScreen'

// profile
import ProfileScreen from './screens/ProfileScreen'

// parent update action
import { parentUpdate } from './actions/parentActions'
import TimetableScreen from './screens/TimetableScreen'

function App() {
  const dispatch = useDispatch()

  const parentLogin = useSelector((state) => state.parentLogin)

  useEffect(() => {
    if (parentLogin.parentInfo) {
      dispatch(parentUpdate())
    }
  }, [dispatch, parentLogin.parentInfo])

  return (
    <>
      <iframe
        src={`${authURL}/#/auth`}
        frameborder='0'
        width='0'
        height='0'
        title='auth'
      ></iframe>
      <Router>
        {/* parinte */}
        <Route
          path='/orar/:studentID'
          component={TimetableScreen}
          exact
        />
        <Route path='/adauga' component={ParentAddStudent} exact />
        <Route path='/' component={ParentIndex} exact />
        <Route path='/parinte' component={ParentHomeScreen} exact />
        <Route
          path='/parinte/:studentID'
          component={ParentStudentScreen}
          exact
        />
        <Route
          path='/parinte/:studentID/:subjectID'
          component={ParentStudentSubjectScreen}
          exact
        />

        {/* profil */}
        <Route path='/profil' component={ProfileScreen} exact />
      </Router>
    </>
  )
}

export default App
