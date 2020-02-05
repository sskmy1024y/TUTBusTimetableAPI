import { RootState } from '../modules'
import { connect } from 'react-redux'
import TimeBoard from '../components/TimeBoard/'

const mapStateToProps = (state: RootState) => {
  const timetables = state.timetables.data.map(data => {
    return {
      ...data,
      uuid: `${data.departure.id}${data.arrival.id}`
    }
  })
  return {
    timetables
  }
}

export default connect(mapStateToProps)(TimeBoard)
