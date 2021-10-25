import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  parentLoginReducer,
  parentMarksReducer,
  parentTruancysReducer,
  parentAverageMarksReducer,
  parentTermMarksReducer,
} from './reducers/parentReducers'

const reducer = combineReducers({
  // parent reducers
  parentLogin: parentLoginReducer,
  parentMarks: parentMarksReducer,
  parentTruancys: parentTruancysReducer,
  parentAverageMarks: parentAverageMarksReducer,
  parentTermMarks: parentTermMarksReducer,
})

const userTypeFromStorage = localStorage.getItem('userType')

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// parent Logged in
var parentLoggedIn
var parentLoggedInInfo
var parentStudents
var parentLoggedInToken

if (userTypeFromStorage === 'parent') {
  parentLoggedIn = userFromStorage
  parentLoggedInInfo = {
    parentID: parentLoggedIn.parentID,
    studentID: parentLoggedIn.studentID,
    firstName: parentLoggedIn.firstName,
    lastName: parentLoggedIn.lastName,
    cnp: parentLoggedIn.cnp,
    // token: parentLoggedIn.token,
  }
  parentStudents = parentLoggedIn.students
  parentLoggedInToken = parentLoggedIn.token
}

const initialState = {
  parentLogin: {
    parentInfo: parentLoggedInInfo,
    students: parentStudents,
    token: parentLoggedInToken,
    addedStudentFlag: [],
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

window.onload = () => {
  var iframe = document.getElementsByTagName('iframe')[0]
  var win
  try {
    win = iframe.contentWindow
  } catch (e) {
    win = iframe.contentWindow
  }
  win.postMessage('', '*')
  let requestData
  window.onmessage = (e) => {
    requestData = e.data
    console.log(requestData.userType)

    if (requestData.userType !== 'parent' && requestData.userType) {
      window.location.replace('https://google.com')
      // alert('not teacher')
    }

    var teacherID = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')).parentID
      : null

    if (teacherID !== JSON.parse(requestData.userInfo).parentID) {
      localStorage.setItem('userType', requestData.userType)
      localStorage.setItem('userInfo', requestData.userInfo)
      store.dispatch({
        type: 'PARENT_READ_LS',
        payload: JSON.parse(requestData.userInfo),
      })
    }
  }
}

export default store
