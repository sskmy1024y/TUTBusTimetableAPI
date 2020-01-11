import React from 'react'
import styled from 'styled-components'

const path = `M15.7001 25.0245L23.5465 29.7601C24.7844 30.507 26.3114 29.3969 25.9829 27.9899L23.9002 19.0635L30.8338 13.0568C31.9265 12.111 31.3423 10.3156 29.9022 10.194L20.7752 9.42025L17.205 0.995989C16.6412 -0.331996 14.759 -0.331996 14.1953 0.995989L10.625 9.42025L1.49811 10.194C0.0580132 10.3156 -0.526237 12.111 0.566469 13.0568L7.5001 19.0635L5.41733 27.9899C5.08888 29.3969 6.61583 30.507 7.85381 29.7601L15.7001 25.0245Z`

interface Props {
  size: number
  active?: boolean
}

function TUTBusIcon({ size, active }: Props) {
  return (
    <Icon viewBox='0 0 32 30' active={active} width={size} height={size} fill='none'>
      <path d={path} />
    </Icon>
  )
}

export default TUTBusIcon

const Icon = styled.svg<{ active?: boolean }>`
  stroke: none;
  fill: ${({ active }) => (active ? '#F2C94C' : 'rgba(0, 0, 0, 0.32)')};
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
`
