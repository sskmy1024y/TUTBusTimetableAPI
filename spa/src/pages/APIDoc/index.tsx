import { useEffect, useLocation } from 'hooks'
import React from 'react'

import FetchDoc from 'components/FetchDoc'
import styled from 'styled-components'

function APIDoc() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'APIDoc - TUT Bus Timetable'
    window.gtagPageview(location.pathname)
  }, [location.pathname])

  return (
    <>
      <Label>最終更新日：2019/05/23 10:39</Label>
      <FetchDoc src='https://raw.githubusercontent.com/wiki/sskmy1024y/TUTBusTimetableAPI/v1.md' />
    </>
  )
}

export default APIDoc

const Label = styled.div`
  text-align: right;
  color: #797979;
`
