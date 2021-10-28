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
