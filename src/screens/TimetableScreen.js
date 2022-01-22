import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSchool,
  getTimetable,
  getTimetableTeachers,
} from '../actions/parentActions'
import HeaderBack from '../components/HeaderBack'
import Loader from '../components/Loader'
import styles from '../css/TimetableScreen.module.css'

const TimetableScreen = ({ match }) => {
  const dispatch = useDispatch()

  const parentStudentTimetable = useSelector(
    (state) => state.parentStudentTimetable
  )
  const { periods } = parentStudentTimetable
  const parentStudentSchool = useSelector(
    (state) => state.parentStudentSchool
  )
  const { teachers } = useSelector(
    (state) => state.parentStudentTimetableTeachers
  )
  const parentLogin = useSelector((state) => state.parentLogin)

  const days = [1, 2, 3, 4, 5]

  let student = {}
  let intervalsFrame = []
  let intervals = []
  for (let studentIndex in parentLogin.students) {
    if (
      parentLogin.students[studentIndex].studentID ===
      match.params.studentID
    ) {
      student = parentLogin.students[studentIndex]
      intervalsFrame = student.grade.intervals.split('-')
      for (let i = intervalsFrame[0]; i <= intervalsFrame[1]; i++) {
        intervals.push(i)
      }
    }
  }

  const daysNames = ['', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri']

  // state
  const [selectedPeriodID, setSelectedPeriodID] = useState('')
  const [room, setRoom] = useState('')
  // const [name, setName] = useState('')
  const [teacherName, setTeacherName] = useState('')

  const onChangeValue = (e) => {
    const value = e.target.value.split(',')
    setSelectedPeriodID(value[0])
    if (value[3] === 'undefined') {
      setRoom('')
    } else {
      setRoom(value[3])
    }

    let day = value[1]
    let interval = value[2]

    const selectedTeachers =
      teachers[
        parentStudentTimetable.periods[day][interval].subject
          .subjectID
      ]
    console.log(selectedTeachers)

    let selectedTeachersNames = ''
    if (selectedTeachers.length > 1) {
      for (let selectedTeacher in selectedTeachers) {
        selectedTeachersNames +=
          '/' + selectedTeachers[selectedTeacher]
      }
      selectedTeachersNames = selectedTeachersNames.substring(
        1,
        selectedTeachersNames.length
      )
      console.log(selectedTeachersNames)
    } else {
      selectedTeachersNames = selectedTeachers[0]
    }
    setTeacherName(selectedTeachersNames)
  }

  useEffect(() => {
    dispatch(getTimetable(match.params.studentID))
    dispatch(getSchool(match.params.studentID))
    dispatch(getTimetableTeachers(match.params.studentID))
  }, [dispatch, match.params.studentID])

  return (
    <>
      <HeaderBack backTo={`/parinte/${match.params.studentID}`}>
        Orar
      </HeaderBack>
      <div className='header-margin-bottom'></div>
      <div className='main-container'>
        <div class='row'>
          {parentStudentTimetable.periods[1] &&
            parentStudentSchool.school.schoolID && (
              <>
                {days.map((day) => (
                  <div
                    class='col-6 col-sm-6 col-md-6 col-lg-4 col-xl'
                    style={{
                      float: 'left',
                    }}
                  >
                    <table>
                      <thead>
                        <th scope='col' className={styles.thFirst}>
                          <span className={styles.thSpan}>Ora</span>
                        </th>
                        <th scope='col' className={styles.thLast}>
                          <span className={styles.thSpan}>
                            {daysNames[day]}
                          </span>
                        </th>
                      </thead>
                      <tbody onChange={onChangeValue}>
                        {intervals.map((interval) => (
                          <>
                            {periods[day][interval] ? (
                              <tr>
                                <th scope='row'>
                                  <span className={styles.thSpan}>
                                    {
                                      parentStudentSchool.school
                                        .intervals[interval]
                                    }
                                  </span>
                                </th>
                                <td
                                  className={
                                    selectedPeriodID ===
                                    periods[day][interval].periodID
                                      ? styles.tableCellSelected
                                      : styles.tableCell
                                  }
                                >
                                  <input
                                    type='radio'
                                    id={
                                      periods[day][interval].periodID
                                    }
                                    name='period'
                                    value={
                                      periods[day][interval]
                                        .periodID +
                                      ',' +
                                      +day +
                                      ',' +
                                      interval +
                                      ',' +
                                      periods[day][interval].room +
                                      ',' +
                                      periods[day][interval].subject
                                        .name +
                                      ','
                                    }
                                  />
                                  <label
                                    for={
                                      periods[day][interval].periodID
                                    }
                                    className={styles.label}
                                  >
                                    <span
                                      className={styles.labelSpan}
                                    >
                                      {periods[day][interval].subject
                                        .name
                                        ? periods[day][interval]
                                            .subject.name
                                        : '-'}
                                    </span>
                                  </label>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <th scope='row'>
                                  <span className={styles.thSpan}>
                                    {
                                      parentStudentSchool.school
                                        .intervals[interval]
                                    }
                                  </span>
                                </th>
                                <td className={styles.tableCell}>
                                  <div className={styles.label}>
                                    {' '}
                                    -{' '}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </>
            )}

          <div style={{ marginTop: '2vh' }}></div>

          {parentStudentTimetable.loading && <Loader></Loader>}
          {selectedPeriodID && !parentStudentTimetable.loading && (
            <>
              <input
                type='text'
                className={styles.inputValue}
                name='nume'
                placeholder='Numele profesorului'
                value={teacherName}
              />

              <input
                type='text'
                className={styles.inputValue}
                name='room'
                placeholder='Sala'
                value={room}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TimetableScreen
