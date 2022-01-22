import {
  PARENT_AVERAGE_MARKS_REQUEST,
  PARENT_AVERAGE_MARKS_SUCCESS,
  PARENT_AVERAGE_MARKS_FAIL,
} from '../constants/parentConstants'
import axios from 'axios'
import { apiURL } from '../env'

export const getAverageMarks = async (dispatch, getState) => {
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
      `${apiURL}/api/parent/averagemarks`,
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
            averageMarks[studentID][subjectID].push(data[averageMark])
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
