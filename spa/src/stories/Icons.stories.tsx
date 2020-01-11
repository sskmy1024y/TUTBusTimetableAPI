import React from 'react'

import { number, withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Provider from 'stories/Provider'

import TUTBusIcon from 'components/icons/TUTBusIcon'
import Favorite from 'components/icons/Favorite'
import { Container } from 'stories'
import styled from 'styled-components'

const storiesAll = storiesOf('Foundation|Icon', module)
storiesAll.addDecorator(withKnobs)
storiesAll.addDecorator(story => <Provider story={story} />)
storiesAll.add('Icons', () => {
  const size = number('size', 50)

  const Icons = [TUTBusIcon, Favorite]
  return (
    <IconContainer>
      {Icons.map(Component => (
        <Container width={size + 30}>
          <Component size={size} />
        </Container>
      ))}
    </IconContainer>
  )
})

storiesOf('Foundation|Icon', module)
  .addDecorator(withKnobs)
  .add('Favorite', () => {
    const size = number('size', 50)
    const isActive = boolean('active', true)

    return <Favorite size={size} active={isActive} />
  })

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
`
