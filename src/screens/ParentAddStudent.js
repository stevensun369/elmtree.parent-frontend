import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { addStudent } from '../actions/parentActions'

import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import Message from '../components/Message'
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

  const [studentCNP, setStudentCNP] = useState('')
  const [studentID, setStudentID] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addStudent(studentCNP, studentID))
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
                name='studentCNP'
                placeholder='CNP-ul elevului'
                value={studentCNP}
                onChange={(e) => {
                  setStudentCNP(e.target.value)
                }}
              />

              <input
                type='number'
                className={styles.inputValue}
                name='studentID'
                placeholder='Codul elevului'
                value={studentID}
                onChange={(e) => {
                  setStudentID(e.target.value)
                }}
              />
              <br />
              <br />

              {studentCNP.length > 13 && (
                <Message variant='danger'>
                  CNP-ul elevului are prea multe cifre
                </Message>
              )}
              {studentCNP.length < 13 && studentCNP.length !== 0 && (
                <Message variant='danger'>
                  CNP-ul elevului nu are îndeajuns de multe cifre
                </Message>
              )}
              {studentID.length > 9 && (
                <Message variant='danger'>
                  Codul elevului are prea multe cifre
                </Message>
              )}
              {studentID.length < 9 && studentID.length !== 0 && (
                <Message variant='danger'>
                  Codul elevului nu are îndeajuns de multe cifre
                </Message>
              )}
              <input
                className={styles.submitButton}
                type='submit'
                value='Adăugați elevul'
                disabled={
                  studentCNP.length > 13 ||
                  studentCNP.length < 13 ||
                  studentID.length > 9 ||
                  studentID.length < 9
                }
              />
            </Form>
          </div>
        )}
      </div>
    </>
  )
}

export default ParentAddStudent
