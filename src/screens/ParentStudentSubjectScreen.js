import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HeaderBack from '../components/HeaderBack'
import NotAuthorized from '../components/NotAuthorized'
import Loader from '../components/Loader'

import styles from '../css/TeacherSubjectStudentScreen.module.css'

import { Col } from 'react-bootstrap'
import MarksTitle from '../components/MarksTitle'
import TruancysTitle from '../components/TruancysTitle'

import Mark from '../components/Mark'
import Truancy from '../components/Truancy'

import {
  getMarksList,
  getTruancysList,
  parentGetAverageMarks,
} from '../actions/parentActions'
import {
  sortAverageMarksByTerm,
  sortMarksByTerm,
  sortStudentInfo,
  sortSubjectInfo,
  sortTruancysByTerm,
} from '../utils/parentSort'

const ParentStudentSubjectScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const parentLogin = useSelector((state) => state.parentLogin)
  const { parentInfo, students } = parentLogin

  if (!parentInfo) {
    history.push('/')
  }

  // average marks
  const parentAverageMarks = useSelector(
    (state) => state.parentAverageMarks
  )
  const { averageMarks } = parentAverageMarks

  var subjectAverageMarks = {}

  if (Object.keys(averageMarks).length !== 0) {
    subjectAverageMarks =
      averageMarks[match.params.studentID][match.params.subjectID]
  }

  // marks and truancys
  const parentMarks = useSelector((state) => state.parentMarks)
  const { marksList } = parentMarks

  const parentTruancys = useSelector((state) => state.parentTruancys)
  const { truancysList } = parentTruancys

  // student info
  var { studentInfo, authorized } = sortStudentInfo(
    students,
    match.params.studentID
  )

  // subject Info
  var { subjectInfo, subjectAuthorized } = sortSubjectInfo(
    studentInfo.subjectList,
    match.params.subjectID
  )

  // condition
  var loadingCondition

  if (authorized && subjectAuthorized) {
    // average marks
    var { averageMarkTermOne, averageMarkTermTwo } =
      sortAverageMarksByTerm(subjectAverageMarks)

    // marks by term
    var { marksTermOne, marksTermTwo } = sortMarksByTerm(marksList)

    // truancys by term
    var { truancysTermOne, truancysTermTwo } =
      sortTruancysByTerm(truancysList)

    // condition
    loadingCondition = parentMarks.loading && parentTruancys.loading
  }

  useEffect(() => {
    dispatch(
      getMarksList(match.params.studentID, match.params.subjectID)
    )
    dispatch(
      getTruancysList(match.params.studentID, match.params.subjectID)
    )
  }, [dispatch, match.params.studentID, match.params.subjectID])

  const averageMarksLength = Object.keys(averageMarks).length
  useEffect(() => {
    if (averageMarksLength === 0) {
      dispatch(parentGetAverageMarks())
    }
  }, [dispatch, averageMarksLength])

  if (authorized && subjectAuthorized) {
    return (
      <>
        <HeaderBack backTo={`/parinte/${match.params.studentID}`}>
          {subjectInfo.name}
        </HeaderBack>
        <div className='header-margin-bottom'></div>
        <div className='main-container'>
          {loadingCondition ? (
            <Loader />
          ) : (
            <>
              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                style={{
                  float: 'left',
                  display: 'inline-block',
                  marginBottom: '2vh',
                }}
              >
                <MarksTitle
                  toAverageMark=''
                  averageMark={averageMarkTermOne}
                >
                  Note - Semestrul I
                </MarksTitle>
                {marksTermOne.length > 0 ? (
                  <>
                    {marksTermOne.map((item) => (
                      <Mark
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.markID}
                      >
                        {item.value}
                      </Mark>
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există note incă
                  </span>
                )}

                <br></br>

                <TruancysTitle>Absențe - Semestrul I</TruancysTitle>
                {truancysTermOne.length > 0 ? (
                  <>
                    {truancysTermOne.map((item) => (
                      <Truancy
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.truancyID}
                        motivated={item.motivated}
                      />
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există absențe incă
                  </span>
                )}
              </Col>

              <Col
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
                style={{
                  float: 'left',
                  display: 'inline-block',
                  marginBottom: '2vh',
                }}
              >
                <MarksTitle
                  toAverageMark=''
                  averageMark={averageMarkTermTwo}
                >
                  Note - Semestrul II
                </MarksTitle>
                {marksTermTwo.length > 0 ? (
                  <>
                    {marksTermTwo.map((item) => (
                      <Mark
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.markID}
                      >
                        {item.value}
                      </Mark>
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există note incă
                  </span>
                )}
                <br></br>

                <TruancysTitle>Absențe - Semestrul II</TruancysTitle>
                {truancysTermTwo.length > 0 ? (
                  <>
                    {truancysTermTwo.map((item) => (
                      <Truancy
                        dateDay={item.dateDay}
                        dateMonth={item.dateMonth}
                        key={item.truancyID}
                        motivated={item.motivated}
                      />
                    ))}
                  </>
                ) : (
                  <span className={styles.notExist}>
                    Nu există absențe incă
                  </span>
                )}
              </Col>
            </>
          )}
        </div>
      </>
    )
  } else if (!authorized && !subjectAuthorized) {
    return <NotAuthorized />
  }
}

export default ParentStudentSubjectScreen
