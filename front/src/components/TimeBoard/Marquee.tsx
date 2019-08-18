import React from 'react'

import styled from 'styled-components'

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

const Paragraph = styled.p`
  margin: 0;
  padding-left: 100%;
  display: inline-block;
  white-space: nowrap;
  background-color: transparent;
  -webkit-animation-name: marquee;
  -webkit-animation-timing-function: linear;
  -webkit-animation-duration: 6s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-name: marquee;
  -moz-animation-timing-function: linear;
  -moz-animation-duration: 6s;
  -moz-animation-iteration-count: infinite;
  -ms-animation-name: marquee;
  -ms-animation-timing-function: linear;
  -ms-animation-duration: 6s;
  -ms-animation-iteration-count: infinite;
  -o-animation-name: marquee;
  -o-animation-timing-function: linear;
  -o-animation-duration: 6s;
  -o-animation-iteration-count: infinite;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-duration: 6s;
  animation-iteration-count: infinite;

  &:after {
    content: '';
    white-space: nowrap;
    padding-right: 50px;
  }

  @-webkit-keyframes marquee {
    from {
      -webkit-transform: translate(0%);
    }

    99%,
    to {
      -webkit-transform: translate(-100%);
    }
  }

  @-moz-keyframes marquee {
    from {
      -moz-transform: translate(0%);
    }

    99%,
    to {
      -moz-transform: translate(-100%);
    }
  }

  @-ms-keyframes marquee {
    from {
      -ms-transform: translate(0%);
    }

    99%,
    to {
      -ms-transform: translate(-100%);
    }
  }

  @-o-keyframes marquee {
    from {
      -o-transform: translate(0%);
    }

    99%,
    to {
      -o-transform: translate(-100%);
    }
  }

  @keyframes marquee {
    from {
      transform: translate(0%);
    }

    99%,
    to {
      transform: translate(-100%);
    }
  }
`
