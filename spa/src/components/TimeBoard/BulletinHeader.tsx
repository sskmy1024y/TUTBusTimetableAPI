import React from 'react'

import media from 'styled-media-query'
import styled from 'styled-components'

interface BulletinHeaderProps {
  title: string
  subText?: string
}

export default function BulletinHeader({ title, subText = '' }: BulletinHeaderProps) {
  return (
    <Header>
      <Place>{title}</Place>
      {subText && <SubText>{subText}</SubText>}
    </Header>
  )
}

const Header = styled.div`
  ${media.greaterThan('medium')`
    padding-left: 40px;
  `}
  background-color: rgb(76, 83, 109);
  padding: 5px;
  border-bottom: 1px solid rgb(36, 41, 58);
`

const Place = styled.h4`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  line-height: 33px;
  margin-bottom: 0;

  ${media.greaterThan('small')`
    letter-spacing: 0.1em;
  `}
`

const SubText = styled.span`
  color: #fff;
`
