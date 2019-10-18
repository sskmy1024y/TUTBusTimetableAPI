import { Button, Col, Form, FormControl, FormControlProps, InputGroup, Modal, Row } from 'react-bootstrap'
import { addMonth, formatDate } from 'lib/utils'
import { useDispatch, useMemo, useState } from 'hooks'
import React, { useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchType } from 'modules/Search'
import { actionCreator } from 'modules'

interface ModalProps {
  show: boolean
  onHide: () => void
}

interface TTTOption {
  label: string
  value: SearchType
}

export function SearchModalBody(props: ModalProps) {
  const today = new Date()
  const nowDate = formatDate(today, 'YYYY-MM-DD')
  const nowTime = formatDate(today)
  const maxDate = formatDate(addMonth(today, 1), 'YYYY-MM-DD')

  const dispatch = useDispatch()

  const [targetDate, setTargetDate] = useState(nowDate)
  const [targetTime, setTargetTime] = useState(nowTime)
  const [targetTimeType, setTargetTimeType] = useState(SearchType.Depature)

  const selectOptions = useMemo<TTTOption[]>(
    () => [
      {
        label: '始発',
        value: SearchType.First,
      },
      {
        label: '出発時刻',
        value: SearchType.Depature,
      },
      {
        label: '到着時刻',
        value: SearchType.Arrival,
      },
      {
        label: '最終',
        value: SearchType.Last,
      },
    ],
    []
  )

  const enableTargetTime = useMemo(
    () => targetTimeType === SearchType.Arrival || targetTimeType === SearchType.Depature,
    [targetTimeType]
  )

  const dispatchSearch = useCallback(() => {
    const request = {
      type: targetTimeType,
      datetime: new Date(`${targetDate} ${targetTime}`),
    }

    dispatch(
      actionCreator.setSearchRequest({
        request,
      })
    )
  }, [dispatch, targetDate, targetTime, targetTimeType])

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

  const submitSearch = () => {
    dispatchSearch()
    props.onHide()
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">時間指定</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitSearch}>
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
        <Button variant="primary" onClick={submitSearch}>
          検索
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
