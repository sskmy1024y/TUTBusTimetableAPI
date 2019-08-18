import React from 'react'

import BulletinHeader from './BulletinHeader'

import styled from 'styled-components'
import BulletinBody from './BulletinBody'

export default function TimeBoard() {
  return (
    <BulletinBoard>
      <BulletinHeader text='時刻表' />
      <BulletinBody></BulletinBody>
    </BulletinBoard>
  )
}

const BulletinBoard = styled.div`
  background-color: rgb(76, 83, 109);
  color: #fff;
`
