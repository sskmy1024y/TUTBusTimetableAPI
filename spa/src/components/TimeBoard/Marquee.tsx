import React from 'react'

import styled, { keyframes } from 'styled-components'

interface MaequeeProps {
  children: React.ReactNode
}

export default function Marquee({ children }: MaequeeProps) {
  return (
    <MargueeComponent>
      <Paragraph>{children}</Paragraph>
    </MargueeComponent>
  )
}

const MargueeComponent = styled.div`
  overflow: hidden;
`

const marquee = () => {
  return keyframes`
    from {
      transform: translate(0%);
    }

    99%,
    to {
      transform: translate(-100%);
    }
  `
}

const Paragraph = styled.p`
  margin: 0;
  padding-left: 100%;
  display: inline-block;
  white-space: nowrap;
  vertical-align: middle;
  background-color: transparent;
  animation: ${marquee} 6s linear infinite;

  &:after {
    content: '';
    white-space: nowrap;
    padding-right: 50px;
  }
`
