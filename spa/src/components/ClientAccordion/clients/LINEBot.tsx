import React from 'react'
import { Card } from 'react-bootstrap'
import ClientTemplate from '.'

import Icon from 'assets/images/line_bot/icon.png'
import HeadImage from 'assets/images/line_bot/screen1.jpeg'
import styled from 'styled-components'

export default function ClientLINEBot({ eventKey }: { eventKey: string }) {
  return (
    <ClientTemplate
      iconPath={Icon}
      title={'LINE Bot'}
      subTitle={'LINEのトーク画面から、次のバスの時間を調べることができます。'}
      eventKey={eventKey}
    >
      <WideCard>
        <TopImage variant="top" src={HeadImage} />
        <Card.Body>
          <Card.Title>次のバスの時間を教えるよ</Card.Title>
          <Card.Text>出発場所を指定すると、次のバスの出発時刻が返信されます。</Card.Text>
          <a href="https://line.me/R/ti/p/%40jft2925j" rel="noopener noreferrer" target="_blank">
            <LinkImg src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" />
          </a>
          <MadeBy>
            Made by <a href="http://twitter.com/nakainu_">@nakainu</a>
          </MadeBy>
        </Card.Body>
      </WideCard>
    </ClientTemplate>
  )
}

const WideCard = styled(Card)`
  max-width: 400px;
`

const TopImage = styled(Card.Img)`
  height: 200px;
  object-fit: cover;
`

const LinkImg = styled.img`
  height: 36px;
  border: 0;
`

const MadeBy = styled.small`
  margin: auto 10px;
`
