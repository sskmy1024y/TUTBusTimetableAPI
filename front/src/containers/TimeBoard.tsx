import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import TimeBoard from '../components/TimeBoard'
import { thunkActionCreators } from '../middleware/thunkAction'
import { RootState } from '../modules'

const mapStateToProps = (state: RootState) => {
  return {
    timetable: state.timetables[0],
  }
}

export default connect(mapStateToProps)(TimeBoard)
