import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteMarksAndTruancys,
  parentGetAverageMarks,
} from '../actions/parentActions'

import HeaderBack from '../components/HeaderBack'
import NotAuthorized from '../components/NotAuthorized'
import SubjectItem from '../components/SubjectItem'
import { sortAverageMarks } from '../utils/parentSort'
import { Link } from 'react-router-dom'
import styles from '../css/TeacherHomeroomStudentScreen.module.css'

const ParentStudentScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const parentLogin = useSelector((state) => state.parentLogin)
  const { parentInfo, students } = parentLogin

  if (!parentInfo) {
    history.push('/conectare/parinte')
  }

  var studentInfo = {}
  var authorized = false
  var student

  // getting student info
  for (student in students) {
    if (students[student].studentID === match.params.studentID) {
      studentInfo = students[student]
      authorized = true
    }
  }

  // average marks
  const parentAverageMarks = useSelector(
    (state) => state.parentAverageMarks
  )
  const { averageMarks } = parentAverageMarks

  const parentTermMarks = useSelector(
    (state) => state.parentTermMarks
  )

  const studentAverageMarks = averageMarks[match.params.studentID]
  var subjectAverageMarks = sortAverageMarks(studentAverageMarks)

  useEffect(() => {
    dispatch(deleteMarksAndTruancys())
  }, [dispatch])

  const averageMarksLength = Object.keys(averageMarks).length
  useEffect(() => {
    if (averageMarksLength === 0 && students.length !== 0) {
      dispatch(parentGetAverageMarks())
    }
  }, [dispatch, averageMarksLength, students.length])

  if (authorized) {
    return (
      <>
        <HeaderBack backTo='/parinte'>
          {studentInfo.firstName} {studentInfo.lastName} -{' '}
          {studentInfo.grade.gradeNumber}
          {studentInfo.grade.gradeLetter}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          <Link to={`/orar/${match.params.studentID}`}>
            <div className='toTimetable'>
              <span>&gt;&gt; către orar</span>
            </div>
          </Link>
          <div style={{ marginTop: '2vh' }}></div>

          <span className={styles.termMarksTitle}>
            Mediile Semestriale:
          </span>
          <div
            className={styles.termMarks}
            style={{ marginBottom: '3vh', width: '98%' }}
          >
            <div key='1' className={styles.termMarksTermContainer}>
              <div className={styles.termMarksTerm}>
                <div className={styles.termMarksTermSpan}>
                  Sem. I:
                </div>
                <div className={styles.termMark}>
                  <span className={styles.termMarkSpan}>
                    {parentTermMarks.termMarks[
                      match.params.studentID
                    ][0] !== 0 &&
                    parentTermMarks.termMarks[
                      match.params.studentID
                    ][0] ? (
                      <>
                        {
                          parentTermMarks.termMarks[
                            match.params.studentID
                          ][0]
                        }
                      </>
                    ) : (
                      <>-</>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div key='2' className={styles.termMarksTermContainer}>
              <div className={styles.termMarksTerm}>
                <div className={styles.termMarksTermSpan}>
                  Sem. II:
                </div>
                <div className={styles.termMark}>
                  <span className={styles.termMarkSpan}>
                    {parentTermMarks.termMarks[
                      match.params.studentID
                    ][1] !== 0 &&
                    parentTermMarks.termMarks[
                      match.params.studentID
                    ][1] ? (
                      <>
                        {
                          parentTermMarks.termMarks[
                            match.params.studentID
                          ][1]
                        }
                      </>
                    ) : (
                      <>-</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {studentInfo && (
            <>
              <div className='list-divider'></div>
              {studentInfo.subjectList.map((item) => (
                <>
                  {subjectAverageMarks[item.subjectID] && (
                    <SubjectItem
                      linkTo={`/parinte/${studentInfo.studentID}/${item.subjectID}`}
                      key={item.subjectID}
                      averageMarkTermOne={
                        subjectAverageMarks[item.subjectID][0]
                      }
                      averageMarkTermTwo={
                        subjectAverageMarks[item.subjectID][1]
                      }
                    >
                      {item.name}
                    </SubjectItem>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      </>
    )
  } else if (!authorized) {
    return <NotAuthorized />
  }
}

export default ParentStudentScreen
