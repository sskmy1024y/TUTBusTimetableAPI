import React from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'hooks'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchModalBody } from './SearchModalBody'

export default function SearchModal() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <SearchButton onClick={handleShowModal} variant="secondary">
        <FontAwesomeIcon icon="search" />
      </SearchButton>
      <SearchModalBody show={showModal} onHide={() => setShowModal(false)} />
    </>
  )
}

const SearchButton = styled(Button)`
  padding: 0px 10px;
  margin-bottom: 8px;
`
