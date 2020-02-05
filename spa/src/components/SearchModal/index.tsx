import { Button } from 'react-bootstrap'
import { useState } from 'hooks'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { SearchModalBody } from './SearchModalBody'

export default function SearchModal() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <SearchButton onClick={handleShowModal} variant='secondary'>
        <FontAwesomeIcon icon='search' />
      </SearchButton>
      <SearchModalBody show={showModal} onHide={() => setShowModal(false)} />
    </>
  )
}

const SearchButton = styled(Button)`
  padding: 0px 10px;
  width: 40px;
  height: 40px;
`
