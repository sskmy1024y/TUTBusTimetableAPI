import { useEffect, useLocation } from 'hooks'
import ProfileCard from 'components/ProfileCard'
import React from 'react'

function Contacts() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'Contacts - TUT Bus Timetable'
    window.gtagPageview(location.pathname)
  }, [location.pathname])

  return (
    <>
      <ProfileCard
        headImgSrc={'https://pbs.twimg.com/profile_banners/715525784664846337/1526219509'}
        avatarImgSrc={'https://github.com/sskmy1024y.png'}
        title={'sho'}
        hrefs={{
          TopLink: 'https://github.com/sskmy1024y',
          Twitter: 'https://twitter.com/sskmy1024r',
          Facebook: 'https://www.facebook.com/sho.yamashita.24',
          Mail:
            'mailto:c011627332@edu.teu.ac.jp?subject=学バスAPIについて&amp;body=以下、メールの本文を記述してください'
        }}
        description={
          <>
            東京工科大学CS学部
            <br />
            田胡研究室所属
            <br />
            不具合等何かあれば下記連絡先まで
          </>
        }
      />
    </>
  )
}

export default Contacts
