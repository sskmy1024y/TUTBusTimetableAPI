import React from 'react'

import Favorite from 'components/icons/Favorite'

import media from 'styled-media-query'
import styled from 'styled-components'

interface BulletinHeaderProps {
  title: string
  subText?: string
  showFavIcon?: boolean
  isActive?: boolean
  onFavorite?(): void
}

export default function BulletinHeader({
  title,
  subText = '',
  showFavIcon,
  isActive,
  onFavorite
}: BulletinHeaderProps) {
  return (
    <Container>
      <Header>
        <Place>
          {title}
          {subText && <SubText>{subText}</SubText>}
        </Place>
      </Header>
      {showFavIcon && (
        <IconContainer onClick={onFavorite}>
          <Favorite size={24} active={isActive} />
        </IconContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(76, 83, 109);
  padding: 5px;
  border-bottom: 1px solid rgb(36, 41, 58);
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;

  ${media.greaterThan('medium')`
    padding-left: 40px;
  `}
`

const Place = styled.h4`
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  line-height: 33px;
  margin-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;

  ${media.greaterThan('small')`
    letter-spacing: 0.1em;
  `}
  ${media.lessThan('small')`
    font-size:20px;
  `}
`

const SubText = styled.span`
  align-self: flex-end;
  color: #fff;
  line-height: 30px;
  font-size: 1rem;
  font-weight: 400;
`

const IconContainer = styled.div`
  align-self: center;
  padding-right: 5px;
  ${media.greaterThan('medium')`
    padding-right: 40px;
  `}
  cursor: pointer;
`
