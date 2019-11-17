import { RootState } from '../modules'
import { connect } from 'react-redux'
import TimeBoard from '../components/TimeBoard/'

const mapStateToProps = (state: RootState) => {
  return {
    timetables: state.timetables.data
  }
}

export default connect(mapStateToProps)(TimeBoard)
