import React from 'react'

import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { storiesOf } from '@storybook/react'

import { Button, Welcome } from '@storybook/react/demo'
import styled from 'styled-components'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ))

export const Container = styled.div<{ width?: number | string }>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  margin: 10px 10px 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

Container.defaultProps = {
  width: 698
}
