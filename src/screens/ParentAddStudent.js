import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { addStudent } from '../actions/parentActions'

import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import { Form } from 'react-bootstrap'

import styles from '../css/TeacherAddMarkScreen.module.css'

const ParentAddStudent = ({ history }) => {
  const dispatch = useDispatch()

  // query params
  const search = useLocation().search
  var redirect = new URLSearchParams(search).get('redirect')

  if (!redirect || redirect === '') {
    redirect = '/'
  }

  // parent info
  const parentLogin = useSelector((state) => state.parentLogin)
  if (!parentLogin.parentInfo) {
    history.push('/')
  }

  const [studentID, setStudentID] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addStudent(studentID))
  }

  useEffect(() => {
    if (parentLogin.addedStudentFlag.length !== 0) {
      history.push('/')
    }
  })

  console.log(redirect)

  return (
    <>
      <HeaderBack backTo={redirect}>Adăugați un elev</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        {parentLogin.loading ? (
          <Loader />
        ) : (
          <div className={styles.mainCard}>
            <Form onSubmit={submitHandler}>
              <input
                type='number'
                className={styles.inputValue}
                name='studentID'
                placeholder='ID-ul elevului'
                value={studentID}
                onChange={(e) => {
                  setStudentID(e.target.value)
                }}
              />
              <br />
              <br />
              <input
                className={styles.submitButton}
                type='submit'
                value='Adăugați elevul'
              />
            </Form>
          </div>
        )}
      </div>
    </>
  )
}

export default ParentAddStudent
