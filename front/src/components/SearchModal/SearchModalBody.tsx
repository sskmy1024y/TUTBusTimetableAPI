import React from 'react'
import { useState, useMemo } from 'hooks'
import { Modal, Button, Form, Row, Col, InputGroup, FormControlProps, FormControl } from 'react-bootstrap'
import { formatDate, addMonth } from 'lib/utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TargetTimeType } from 'modules/Search'

interface ModalProps {
  show: boolean
  onHide: () => void
}

interface TTTOption {
  label: string
  value: TargetTimeType
}

export function SearchModalBody(props: ModalProps) {
  const today = new Date()
  const nowDate = formatDate(today, 'YYYY-MM-DD')
  const nowTime = formatDate(today)
  const maxDate = formatDate(addMonth(today, 1), 'YYYY-MM-DD')

  const [targetDate, setTargetDate] = useState(nowDate)
  const [targetTime, setTargetTime] = useState(nowTime)
  const [targetTimeType, setTargetTimeType] = useState(TargetTimeType.Depature)

  const selectOptions = useMemo<TTTOption[]>(
    () => [
      {
        label: '始発',
        value: TargetTimeType.First,
      },
      {
        label: '出発時刻',
        value: TargetTimeType.Depature,
      },
      {
        label: '到着時刻',
        value: TargetTimeType.Arrival,
      },
      {
        label: '最終',
        value: TargetTimeType.Last,
      },
    ],
    []
  )

  const enableTargetTime = useMemo(
    () => targetTimeType === TargetTimeType.Arrival || targetTimeType === TargetTimeType.Depature,
    [targetTimeType]
  )

  const handleChangeDate = (event: React.FormEvent<FormControlProps & FormControl>) => {
    const { value } = event.currentTarget
    if (value !== undefined) {
      setTargetDate(value)
    }
  }

  const handleChangeTime = (event: React.FormEvent<FormControlProps & FormControl>) => {
    const { value } = event.currentTarget
    if (value !== undefined) {
      setTargetTime(value)
    }
  }

  const handleChangeTimeType = (event: React.FormEvent<FormControlProps & FormControl>) => {
    const { value } = event.currentTarget
    if (value !== undefined) {
      setTargetTimeType(parseInt(value))
    }
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">時間指定</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextDate">
            <Form.Label column sm="2">
              日付
            </Form.Label>
            <Col sm="10">
              <InputGroup>
                <Form.Control
                  type="date"
                  value={targetDate}
                  min={nowDate}
                  max={maxDate}
                  aria-describedby="inputGroupPrependDate"
                  name="targetdate"
                  onChange={handleChangeDate}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupPrependDate">
                    <FontAwesomeIcon icon="calendar-alt"></FontAwesomeIcon>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextTime">
            <Form.Label column sm="2">
              時間
            </Form.Label>
            <Col md="4">
              <Form.Control as="select" value={targetTimeType.toString()} onChange={handleChangeTimeType}>
                {selectOptions.map((option: TTTOption) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col sm="10" md="6">
              <InputGroup>
                <Form.Control
                  type="time"
                  value={targetTime}
                  aria-describedby="inputGroupPrependTime"
                  name="targettime"
                  onChange={handleChangeTime}
                  disabled={!enableTargetTime}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupPrependTime">
                    <FontAwesomeIcon icon="clock"></FontAwesomeIcon>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          閉じる
        </Button>
        <Button variant="primary" type="submit">
          検索
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
