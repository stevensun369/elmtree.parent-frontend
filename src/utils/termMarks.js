import {
  PARENT_TERM_MARKS_REQUEST,
  PARENT_TERM_MARKS_SUCCESS,
  PARENT_TERM_MARKS_FAIL,
} from '../constants/parentConstants'
import axios from 'axios'
import { apiURL } from '../env'

export const getTermMarks = async (dispatch, getState) => {
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
