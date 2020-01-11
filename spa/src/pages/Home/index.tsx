import { Col, Jumbotron, Row } from 'react-bootstrap'
import { useDispatch, useEffect, useLocation } from 'hooks'
import React from 'react'

import { thunkActionCreators } from 'middleware/thunkAction'
import ClientAccordion from 'components/ClientAccordion'
import TimeBoard from 'containers/TimeBoard'
import TitleComponent from 'components/TitleComponent'

import TUTBusIcon from 'components/icons/TUTBusIcon'
import media from 'styled-media-query'
import styled from 'styled-components'

export default function Home() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    window.gtagPageview(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    dispatch(thunkActionCreators.onload())
    dispatch(thunkActionCreators.getTimetable({ datetime: new Date(), searchType: null }))
  }, [dispatch])

  return (
    <>
      <Row>
        <Col md='4'>
          <MainIcon>
            <IconPoint>
              <TUTBusIcon size={240} />
            </IconPoint>
          </MainIcon>
        </Col>
        <Col md='8'>
          <JumbotronContainer>
            <TitleComponent />
            <TimeBoard />
            <Annotation>
              この時刻表は、
              <a href='https://www.teu.ac.jp/campus/access/006644.html#bustimetable' target='blank'>
                東京工科大学&nbsp;スクールバス時刻表
              </a>
              の情報に基づき掲示されています。
            </Annotation>
            <Line />
            <p>
              TUT学バスAPIは、Webサイトに掲載された東京工科大学・日本工学院八王子キャンパスにおけるスクールバスの正確な時刻表情報を配信します。
              <small>ただし、非公式APIです。</small>
            </p>
          </JumbotronContainer>
        </Col>
      </Row>
      <aside>
        <ClientAccordion />
      </aside>
    </>
  )
}

const MainIcon = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.lessThan('small')`
    display: none;
  `}
`

const IconPoint = styled.p`
  text-align: center;
  font-size: 3em;
`

const JumbotronContainer = styled(Jumbotron)`
  padding: 2rem 1rem 1rem;

  ${media.lessThan('small')`
    padding: 1rem 1rem;
  `}
`

const Annotation = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
`

const Line = styled.hr`
  margin: 1.5rem 0;
`
