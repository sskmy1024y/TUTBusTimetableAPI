import { Col } from 'react-bootstrap'

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
