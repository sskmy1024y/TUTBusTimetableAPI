import React from 'react'
import { useLocation, useEffect } from 'hooks'

import FetchDoc from 'components/FetchDoc'

function APIDoc() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'APIDoc - TUT Bus Timetable'
    window.gtagPageview(location.pathname)
  }, [location.pathname])

  return <FetchDoc src="https://raw.githubusercontent.com/wiki/sskmy1024y/TUTBusTimetableAPI/v1.md" />
}

export default APIDoc
