import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

import HeaderFull from '../components/HeaderFull'
import SubjectItem from '../components/SubjectItem'
import Loader from '../components/Loader'

import styles from '../css/ParentHomeScreen.module.css'
import {
  addStudentDelete,
  parentGetAverageMarks,
  parentGetTermMarks,
} from '../actions/parentActions'

const ParentHomeScreen = ({ history }) => {
  const dispatch = useDispatch()

  const parentLogin = useSelector((state) => state.parentLogin)
  const { parentInfo, students } = parentLogin

  const parentAverageMarks = useSelector(
    (state) => state.parentAverageMarks
  )
  const { averageMarks } = parentAverageMarks
  console.log(averageMarks)

  const parentTermMarks = useSelector(
    (state) => state.parentTermMarks
  )
  const { termMarks } = parentTermMarks
  console.log(averageMarks)

  useEffect(() => {
    dispatch(addStudentDelete())
  }, [dispatch])

  const termMarksLength = Object.keys(termMarks).length
  useEffect(() => {
    if (parentLogin.students) {
      if (
        termMarksLength === 0 &&
        parentLogin.students.length !== 0
      ) {
        dispatch(parentGetTermMarks())
      }
    }
  }, [dispatch, termMarksLength, parentLogin.students])

  const averageMarksLength = Object.keys(averageMarks).length
  useEffect(() => {
    if (parentLogin.students) {
      if (
        averageMarksLength === 0 &&
        parentLogin.students.length !== 0
      ) {
        dispatch(parentGetAverageMarks())
      }
    }
  }, [dispatch, averageMarksLength, parentLogin.students])

  return (
    <>
      {parentInfo && (
        <>
          <HeaderFull />
          <div className='header-margin-bottom'></div>
          <div className='main-container'>
            {parentInfo.parentID && (
              <>
                {students.length !== 0 ? (
                  <>
                    <div className='list-divider'></div>
                    {termMarks && (
                      <>
                        {Object.keys(termMarks).length === 0 && (
                          <Loader />
                        )}
                      </>
                    )}
                    {students.map((item) => (
                      <>
                        {termMarks && (
                          <>
                            {Object.keys(termMarks).length !== 0 && (
                              <SubjectItem
                                linkTo={`/parinte/${item.studentID}`}
                                key={item.studentID}
                                averageMarkTermOne={
                                  termMarks[item.studentID][0]
                                }
                                averageMarkTermTwo={
                                  termMarks[item.studentID][1]
                                }
                              >{`${item.grade.gradeNumber}${item.grade.gradeLetter} - ${item.firstName} ${item.lastName}`}</SubjectItem>
                            )}
                          </>
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className={styles.addStudentPrompt}>
                      <div className={styles.addStudentPromptText}>
                        Apăsați pe butonul de mai jos pentru a adăuga
                        un elev.
                      </div>
                      <Link
                        to={`/adauga`}
                        style={{
                          textDecoration: 'none',
                          color: 'white',
                        }}
                      >
                        <div className={styles.addStudentButton}>
                          Adăugați un elev
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ParentHomeScreen
