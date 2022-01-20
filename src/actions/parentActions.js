import {
  PARENT_REGISTER_REQUEST,
  PARENT_REGISTER_SUCCESS,
  PARENT_REGISTER_FAIL,
  PARENT_LOGIN_REQUEST,
  PARENT_LOGIN_SUCCESS,
  PARENT_LOGIN_FAIL,
  PARENT_LOGOUT,
  PARENT_UPDATE,
  PARENT_ADD_STUDENT_REQUEST,
  PARENT_ADD_STUDENT_SUCCESS,
  PARENT_ADD_STUDENT_FAIL,
  PARENT_ADD_STUDENT_DELETE,
  PARENT_MARKS_REQUEST,
  PARENT_MARKS_SUCCESS,
  PARENT_MARKS_FAIL,
  PARENT_MARKS_DELETE,
  PARENT_TRUANCYS_REQUEST,
  PARENT_TRUANCYS_SUCCESS,
  PARENT_TRUANCYS_FAIL,
  PARENT_TRUANCYS_DELETE,
  PARENT_AVERAGE_MARKS_REQUEST,
  PARENT_AVERAGE_MARKS_SUCCESS,
  PARENT_AVERAGE_MARKS_FAIL,
  PARENT_TERM_MARKS_REQUEST,
  PARENT_TERM_MARKS_SUCCESS,
  PARENT_TERM_MARKS_FAIL,
  PARENT_FINAL_MARKS_REQUEST,
  PARENT_FINAL_MARKS_SUCCESS,
  PARENT_FINAL_MARKS_FAIL,
  PARENT_STUDENT_TIMETABLE_REQUEST,
  PARENT_STUDENT_TIMETABLE_SUCCESS,
  PARENT_STUDENT_TIMETABLE_FAIL,
  PARENT_STUDENT_TIMETABLE_TEACHERS_REQUEST,
  PARENT_STUDENT_TIMETABLE_TEACHERS_SUCCESS,
  PARENT_STUDENT_TIMETABLE_TEACHERS_FAIL,
  PARENT_STUDENT_SCHOOL_REQUEST,
  PARENT_STUDENT_SCHOOL_SUCCESS,
  PARENT_STUDENT_SCHOOL_FAIL,
} from '../constants/parentConstants'
import { apiURL } from '../env'
import axios from 'axios'

export const register =
  (cnp, lastName, firstName, password) => async (dispatch) => {
    try {
      dispatch({
        type: PARENT_REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${apiURL}/api/parent/register`,
        { cnp, lastName, firstName, password },
        config
      )

      dispatch({
        type: PARENT_REGISTER_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
      localStorage.setItem('userType', 'parent')
    } catch (error) {
      dispatch({
        type: PARENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const login = (cnp, password) => async (dispatch) => {
  try {
    dispatch({
      type: PARENT_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `${apiURL}/api/parent/login`,
      { cnp, password },
      config
    )

    dispatch({
      type: PARENT_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    localStorage.setItem('userType', 'parent')
  } catch (error) {
    dispatch({
      type: PARENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const parentLogout = () => async (dispatch) => {
  dispatch({
    type: PARENT_LOGOUT,
  })

  localStorage.removeItem('userInfo')
  localStorage.removeItem('userType')
}

export const parentUpdate = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().parentLogin.token}`,
      },
    }

    var ls = JSON.parse(localStorage.getItem('userInfo'))

    const { data } = await axios.get(
      `${apiURL}/api/parent/students`,
      config
    )

    dispatch({
      type: PARENT_UPDATE,
      payload: data,
    })

    ls.students = data.students
    ls.token = data.token
    localStorage.setItem('userInfo', JSON.stringify(ls))
  } catch (error) {}
}

export const addStudent =
  (studentCNP, studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_ADD_STUDENT_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      var ls = JSON.parse(localStorage.getItem('userInfo'))

      const { data } = await axios.put(
        `${apiURL}/api/parent/students`,
        { studentCNP, studentID },
        config
      )

      dispatch({
        type: PARENT_ADD_STUDENT_SUCCESS,
        payload: data,
      })

      ls.students = data.students
      ls.token = data.token
      localStorage.setItem('userInfo', JSON.stringify(ls))
    } catch (error) {
      dispatch({
        type: PARENT_ADD_STUDENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addStudentDelete = () => async (dispatch) => {
  dispatch({
    type: PARENT_ADD_STUDENT_DELETE,
  })
}

export const deleteMarksAndTruancys = () => async (dispatch) => {
  dispatch({
    type: PARENT_MARKS_DELETE,
  })

  dispatch({
    type: PARENT_TRUANCYS_DELETE,
  })
}

export const getMarksList =
  (studentID, subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/mark/${studentID}/${subjectID}`,
        config
      )

      dispatch({
        type: PARENT_MARKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PARENT_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getTruancysList =
  (studentID, subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_TRUANCYS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/truancy/${studentID}/${subjectID}`,
        config
      )

      dispatch({
        type: PARENT_TRUANCYS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PARENT_TRUANCYS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const parentGetAverageMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_AVERAGE_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/average`,
        config
      )

      const students = getState().parentLogin.students

      var averageMarks = {}
      for (var student in students) {
        var subject
        var studentID = students[student].studentID
        var subjectIDList = []
        for (subject in students[student].subjectList) {
          subjectIDList.push(
            students[student].subjectList[subject].subjectID
          )
        }
        averageMarks[studentID] = {}
        for (subject in subjectIDList) {
          var subjectID = subjectIDList[subject]
          averageMarks[studentID][subjectID] = []

          for (var averageMark in data) {
            if (
              data[averageMark].subject.subjectID === subjectID &&
              data[averageMark].studentID === studentID
            ) {
              averageMarks[studentID][subjectID].push(
                data[averageMark]
              )
            }
          }
        }
      }

      dispatch({
        type: PARENT_AVERAGE_MARKS_SUCCESS,
        payload: averageMarks,
      })
    } catch (error) {
      dispatch({
        type: PARENT_AVERAGE_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const parentGetTermMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_TERM_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/term`,
        config
      )

      const students = getState().parentLogin.students

      var termMarks = {}
      for (var student in students) {
        var studentID = students[student].studentID
        termMarks[studentID] = []

        for (var termMark in data) {
          if (
            data[termMark].term === 1 &&
            data[termMark].studentID === studentID
          ) {
            termMarks[studentID][0] = data[termMark].value
          }

          if (
            data[termMark].term === 2 &&
            data[termMark].studentID === studentID
          ) {
            termMarks[studentID][1] = data[termMark].value
          }
        }
      }

      dispatch({
        type: PARENT_TERM_MARKS_SUCCESS,
        payload: termMarks,
      })
    } catch (error) {
      dispatch({
        type: PARENT_TERM_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getFinalMarks =
  (subjectID, studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_FINAL_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/final/${studentID}/${subjectID}`,
        config
      )

      let finalMarkTermOne = {}
      let finalMarkTermTwo = {}

      for (let finalMark in data) {
        if (data[finalMark].term === 1) {
          finalMarkTermOne = data[finalMark]
        }
        if (data[finalMark].term === 2) {
          finalMarkTermTwo = data[finalMark]
        }
      }

      let finalMarks = {
        1: finalMarkTermOne,
        2: finalMarkTermTwo,
      }

      dispatch({
        type: PARENT_FINAL_MARKS_SUCCESS,
        payload: finalMarks,
      })
    } catch (error) {
      dispatch({
        type: PARENT_FINAL_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getTimetable =
  (studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_STUDENT_TIMETABLE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/timetable/${studentID}`,
        config
      )

      var days = [1, 2, 3, 4, 5]
      // var intervals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      var periods = {}

      for (var dayKey in days) {
        var day = days[dayKey]
        periods[day] = {}
      }

      for (var key in data) {
        var period = data[key]
        periods[period.day][period.interval] = period
      }

      dispatch({
        type: PARENT_STUDENT_TIMETABLE_SUCCESS,
        payload: periods,
      })
    } catch (error) {
      dispatch({
        type: PARENT_STUDENT_TIMETABLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getTimetableTeachers =
  (studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_STUDENT_TIMETABLE_TEACHERS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/timetable/${studentID}/teachers`,
        config
      )

      // getting the parent login student
      let students = getState().parentLogin.students
      let student = {}
      for (let studentIndex in students) {
        if (students[studentIndex].studentID === studentID) {
          student = students[studentIndex]
        }
      }
      let subjectList = student.subjectList
      let subjectIDList = []
      for (let subject in subjectList) {
        subjectIDList.push(subjectList[subject].subjectID)
      }

      var teachers = {}
      for (var subjectID in subjectIDList) {
        teachers[subjectIDList[subjectID]] = []
      }

      for (let subjectIDIndex in subjectIDList) {
        let subjectID = subjectIDList[subjectIDIndex]
        for (let teacherIndex in data) {
          let teacher = data[teacherIndex]
          for (let subjectIndex in teacher.subjectList) {
            let subject = teacher.subjectList[subjectIndex]
            if (subject.subjectID === subjectID) {
              console.log(subject)
              teachers[subject.subjectID].push(
                teacher.firstName + ' ' + teacher.lastName
              )
            }
          }
        }
      }

      dispatch({
        type: PARENT_STUDENT_TIMETABLE_TEACHERS_SUCCESS,
        payload: teachers,
      })
    } catch (error) {
      dispatch({
        type: PARENT_STUDENT_TIMETABLE_TEACHERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getSchool =
  (studentID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PARENT_STUDENT_SCHOOL_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().parentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/parent/school/${studentID}`,
        config
      )

      dispatch({
        type: PARENT_STUDENT_SCHOOL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PARENT_STUDENT_SCHOOL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
