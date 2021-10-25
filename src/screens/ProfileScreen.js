import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Form } from 'react-bootstrap'

import HeaderBack from '../components/HeaderBack'

import {
  addStudentDelete,
  parentLogout,
} from '../actions/parentActions'

import styles from '../css/ProfileScreen.module.css'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  // parent
  const parentLogin = useSelector((state) => state.parentLogin)
  const { parentInfo } = parentLogin

  if (!parentInfo) {
    history.push('/')
  }
  const submitHandler = (e) => {
    e.preventDefault()

    // parent
    if (parentInfo) {
      dispatch(parentLogout())
    }
  }

  useEffect(() => {
    if (parentLogin.addedStudentFlag.length !== 0) {
      dispatch(addStudentDelete())
    }
  }, [dispatch, parentLogin.addedStudentFlag.length])

  return (
    <>
      <HeaderBack backTo='/'>Profil</HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div className={styles.fields}>
          {/* parinte */}
          {parentInfo && (
            <>
              {/* nume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Nume:</span>
                {parentInfo.lastName}
              </div>

              {/* prenume */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Prenume:</span>{' '}
                {parentInfo.firstName}
              </div>
            </>
          )}
        </div>

        {parentInfo && (
          <Link
            to='/adauga?redirect=/profil'
            style={{
              textDecoration: 'none',
              color: 'white',
              display: 'block',
            }}
          >
            <div className={styles.addStudentButton}>
              Adăugați un elev
            </div>
          </Link>
        )}

        <Form onSubmit={submitHandler}>
          <input
            type='submit'
            className={styles.logoutButton}
            value='Deconectare'
          />
        </Form>
      </div>
    </>
  )
}

export default ProfileScreen
