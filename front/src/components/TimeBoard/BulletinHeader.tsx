import React from 'react'

import { PlaceType } from 'lib/types'
import styled from 'styled-components'

interface BulletinHeaderProps {
  text?: string
  arrival?: PlaceType
  departure?: PlaceType
}

export default function BulletinHeader({ text, arrival, departure }: BulletinHeaderProps) {
  return (
    <Header>
      <div>{arrival && departure ? <Place>{arrival.name}</Place> : <Place>{text}</Place>}</div>
    </Header>
  )
}

const Header = styled.div`
  background-color: rgb(76, 83, 109);
  padding: 5px;
  border-bottom: 1px solid rgb(36, 41, 58);
`

const Place = styled.span`
  color: #fff;
  font-size: 23px;
  font-weight: bold;
  letter-spacing: 0.1em;
`
