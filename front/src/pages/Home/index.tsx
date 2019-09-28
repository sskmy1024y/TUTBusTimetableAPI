import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Jumbotron, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import styled from 'styled-components'
import TimeBoardItem from '../../components/TimeBoard/TimeBoardItem'
import { thunkActionCreators } from '../../middleware/thunkAction'
import { RootState } from '../../modules'
import { TimetableCollectType } from '../../modules/Timetable/type'

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => {
  return {
    fetchTimetable: (date: Date) => {
      dispatch(
        thunkActionCreators.fetchTimetable({
          date,
        })
      )
    },
  }
}

interface HomeProps {
  fetchTimetable(date: Date): void
}

function Home({ fetchTimetable }: HomeProps) {
  useEffect(() => {
    fetchTimetable(new Date())
  })

  const timetableList: TimetableCollectType = {
    arrival: {
      id: 2,
      name: '学校',
    },
    departure: {
      id: 1,
      name: 'みなみの',
    },
    list: [
      {
        arrivalTime: new Date(),
        departureTime: new Date(),
        id: 1,
        isShuttle: true,
      },
      {
        arrivalTime: new Date(),
        departureTime: new Date(),
        id: 1,
        isShuttle: true,
      },
    ],
  }

  return (
    <>
      <Row>
        <Col md="4">
          <MainIcon>
            <IconPoint>
              <FontAwesomeIcon icon="bus" size="5x" />
            </IconPoint>
          </MainIcon>
        </Col>
        <Col md="8">
          <JumbotronContainer>
            <h3 className="display-4">次の学バスは……</h3>
            <TimeBoardItem timetable={timetableList} />
          </JumbotronContainer>
        </Col>
      </Row>
    </>
  )
}

const MainIcon = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconPoint = styled.p`
  text-align: center;
  font-size: 3em;
`

const JumbotronContainer = styled(Jumbotron)`
  padding: 2rem 1rem;
`

export default connect(
  null,
  mapDispatchToProps
)(Home)
