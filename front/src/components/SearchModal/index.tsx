import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
  show: boolean
  onHide: () => void
}

export default function SearchModal(props: Props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
