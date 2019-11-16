import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import Provider from 'stories/Provider'

import TUTBusIcon from 'components/icons/TUTBusIcon'

const storiesAll = storiesOf('Foundation|Icon', module)
storiesAll.addDecorator(withKnobs)
storiesAll.addDecorator(story => <Provider story={story} />)
storiesAll.add('Icons', () => {
  const size = number('size', 50)

  return (
    <div>
      <div>
        <TUTBusIcon size={size} />
      </div>
    </div>
  )
})
