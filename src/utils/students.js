import { PARENT_STUDENTS_UPDATE } from '../constants/parentConstants'
import axios from 'axios'
import { apiURL } from '../env'

export const getStudents = async (dispatch, getState) => {
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
      type: PARENT_STUDENTS_UPDATE,
      payload: data,
    })

    ls.students = data.students
    ls.token = data.token
    localStorage.setItem('userInfo', JSON.stringify(ls))
  } catch (error) {}
}
