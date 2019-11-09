import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import Provider from 'stories/Provider'

import { Container } from 'stories'
import ProfileCard from '.'

const stories = storiesOf('Components|ProfileCard', module)
stories.addDecorator(story => <Provider story={story} />)

stories.addDecorator(withKnobs).add('ProfileCard', () => {
  const twitter = boolean('Twitter', true)
  const facebook = boolean('Facebook', true)
  const mail = boolean('E-mail', true)

  return (
    <Container>
      <ProfileCard
        headImgSrc={'https://pbs.twimg.com/profile_banners/715525784664846337/1526219509'}
        avatarImgSrc={'https://github.com/sskmy1024y.png'}
        title={'sho'}
        hrefs={{
          TopLink: 'https://github.com/sskmy1024y',
          Twitter: twitter ? 'http://twitter.com/sskmy1024r' : undefined,
          Facebook: facebook ? 'https://www.facebook.com/sho.yamashita.24' : undefined,
          Mail: mail
            ? 'mailto:c011627332@edu.teu.ac.jp?subject=学バスAPIについて&amp;body=以下、メールの本文を記述してください'
            : undefined,
        }}
        description={
          <>
            ホゲホゲ
            <br />
            フガフガ
            <br />
            ホゲふがほげふが
          </>
        }
      />
    </Container>
  )
})
