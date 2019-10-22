import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

interface HrefsProps {
  TopLink: string
  Twitter?: string
  Facebook?: string
  Mail?: string
}

interface ProfileCardProps {
  headImgSrc: string
  avatarImgSrc: string
  title: string
  hrefs: HrefsProps
  description: string | React.ReactNode
}

export default function ProfileCard({
  headImgSrc,
  avatarImgSrc,
  title,
  hrefs: { TopLink, Twitter, Facebook, Mail },
  description,
}: ProfileCardProps) {
  return (
    <CardContainer>
      <Card.Img src={headImgSrc} />
      <Avatar>
        <img src={avatarImgSrc} alt="avatar" />
      </Avatar>
      <InfoContainer>
        <Title>
          <a target="_blank" rel="noopener noreferrer" href={TopLink}>
            {title}
          </a>
        </Title>
        {description && <Description>{description}</Description>}
      </InfoContainer>
      <SocialContainer>
        {Twitter && (
          <TwitterBtn href={Twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fab', 'twitter']} size="1x" />
          </TwitterBtn>
        )}
        {Facebook && (
          <FacebookBtn href={Facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fab', 'facebook-f']} size="1x" />
          </FacebookBtn>
        )}
        {Mail && (
          <MailBtn href={Mail}>
            <FontAwesomeIcon icon={'envelope'} size="1x" />
          </MailBtn>
        )}
      </SocialContainer>
    </CardContainer>
  )
}

const CardContainer = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
`

const Avatar = styled.div`
  position: relative;
  top: -50px;
  margin: 0 auto -50px;

  > img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    max-height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 5px solid rgba(255, 255, 255, 0.5);
  }
`

const InfoContainer = styled.div`
  padding: 4px 8px 10px;
  text-align: center;
`

const Title = styled.div`
  margin-bottom: 4px;
  font-size: 24px;
  line-height: 1;
  color: #262626;
  vertical-align: middle;
`
const Description = styled.div`
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #737373;
  text-overflow: ellipsis;
`

const ContactButton = styled.a`
  display: inline-block;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem
  text-align: center;
  color: #fff;
  line-height: 1.5rem;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`

const SocialContainer = styled.div`
  display: inline-flex;
  justify-content: space-around;
  margin: 20px auto;
  width: 50%;
`

const TwitterBtn = styled(ContactButton)`
  background-color: #55acee;

  &:hover {
    background-color: #007ee5;
  }
`

const FacebookBtn = styled(ContactButton)`
  background-color: #315096;

  &:hover {
    background-color: #013264;
  }
`

const MailBtn = styled(ContactButton)`
  background-color: #37b3a2;

  &:hover {
    background-color: #226f64;
  }
`
