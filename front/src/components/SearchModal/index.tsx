import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'hooks'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

interface ModalProps {
  show: boolean
  onHide: () => void
}

export function SearchModalBody(props: ModalProps) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">時間指定</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>検索ができるよ</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const SearchButton = styled(Button)`
  padding: 0px 10px;
  margin-bottom: 8px;
`
