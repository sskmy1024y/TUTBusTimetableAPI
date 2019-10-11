import { connect } from 'react-redux'
import TimeBoard from '../components/TimeBoard/'
import { RootState } from '../modules'

const mapStateToProps = (state: RootState) => {
  return {
    timetables: state.timetables,
  }
}

export default connect(mapStateToProps)(TimeBoard)
