import requireContext from 'require-context.macro'
import { configure } from '@storybook/react'

function loadStories() {
  let req = requireContext('../src/stories/', true, /.(tsx)$/)
  req.keys().forEach(filename => req(filename))

  req = requireContext('../src', true, /.stories.(tsx|js)$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
