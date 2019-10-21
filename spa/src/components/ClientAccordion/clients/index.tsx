import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import styled from 'styled-components'

interface ClientProps {
  iconPath: string
  title: string
  subTitle: string
  children: React.ReactNode
  eventKey: string
}

export default function ClientTemplate({ iconPath, title, subTitle, children, eventKey }: ClientProps) {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="block" eventKey={eventKey}>
          <HeaderContainer>
            <HeaderIcon src={iconPath} />
            <HeaderTitleContainer>
              <Title>{title}</Title>
              <SubTitle>{subTitle}</SubTitle>
            </HeaderTitleContainer>
          </HeaderContainer>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const HeaderIcon = styled.img`
  border-radius: 20px;
  max-width: 80px;
  height: 80px;
`

const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
`
const Title = styled.h5`
  text-align: left;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0;
`
