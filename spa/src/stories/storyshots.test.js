// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom'
import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots'
import styleSheetSerializer from 'jest-styled-components/src/styleSheetSerializer'
import { addSerializer } from 'jest-snapshot'

// mock for createPortal
function MockReactDOMPortal({ children }) {
  return children
}
const createPortalMock = jest.spyOn(ReactDOM, 'createPortal')
createPortalMock.mockImplementation((element, node) => React.createElement(MockReactDOMPortal, { node }, element))

// mock for react-spring
const now = new Date('2019-01-01T00:00:00')
const nowMock = jest.spyOn(Date, 'now')
nowMock.mockImplementation(() => now)

addSerializer(styleSheetSerializer)

afterAll(() => {
  createPortalMock.mockRestore()
  nowMock.mockRestore()
})

initStoryshots({
  framework: 'react',
  configPath: path.join(__dirname, '../../.storybook'),
  test: multiSnapshotWithOptions({
    createNodeMock: element => document.createElement(element.type),
  }),
})
