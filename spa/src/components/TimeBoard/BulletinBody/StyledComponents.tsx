import { Col } from 'react-bootstrap'
import React from 'react'

import { PlaceType } from 'lib/types'
import styled from 'styled-components'

export const Type = styled(Col)`
  display: inline-block;
  font-size: 24px;
  color: greenyellow;
`

export const Time = styled(Col)`
  display: inline-block;
  font-size: 26px;
  line-height: 35px;
  color: orange;
`

export const Detail = styled(Col)`
  display: inline-block;
  font-size: 22px;
`

export const AttentionSpan = styled.span`
  color: orange;
`

export const WarningSpan = styled.span`
  color: red;
`

export const InfoSpan = styled.span`
  color: greenyellow;
`

export function NowShattle() {
  return (
    <>
      <AttentionSpan>シャトル運行中</AttentionSpan>
      <InfoSpan>のため、</InfoSpan>
      <AttentionSpan>時間が前後する場合</AttentionSpan>
      <InfoSpan>があります</InfoSpan>
    </>
  )
}

export function WarningLastBus({ place }: { place: PlaceType }) {
  return (
    <>
      <AttentionSpan>{place.name}</AttentionSpan>
      <InfoSpan>行き</InfoSpan>
      <WarningSpan>最終バス</WarningSpan>
      <InfoSpan>です。</InfoSpan>
    </>
  )
}
