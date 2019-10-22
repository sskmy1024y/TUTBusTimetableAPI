import { Button, Col, Form, FormControl, FormControlProps, InputGroup, Modal, Row } from 'react-bootstrap'
import { addMonth, formatDate } from 'lib/utils'
import { useDispatch, useMemo, useState, useSelector } from 'hooks'
import React, { useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchType, SearchRequestType } from 'modules/Search'
import { thunkActionCreators } from 'middleware/thunkAction'
import { RootState } from 'modules'

interface ModalProps {
  show: boolean
  onHide: () => void
}

interface TTTOption {
  label: string
  value: SearchType
}

export function SearchModalBody(props: ModalProps) {
  const beforeDate = useSelector<RootState, SearchRequestType | null>(state => state.search.searchRequest)

  const preDate = beforeDate !== null && beforeDate.datetime !== undefined ? beforeDate.datetime : new Date()
  const nowDate = formatDate(preDate, 'YYYY-MM-DD')
  const nowTime = formatDate(preDate)
  const maxDate = formatDate(addMonth(preDate, 1), 'YYYY-MM-DD')

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
    dispatch(
      thunkActionCreators.getTimetable({
        searchType: targetTimeType,
        datetime: new Date(`${preDate}T${targetTime}+09:00`),
      })
    )
  }, [dispatch, preDate, targetTime, targetTimeType])

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
        <Modal.Title id="contained-modal-title-vcenter">時間指定検索</Modal.Title>
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
