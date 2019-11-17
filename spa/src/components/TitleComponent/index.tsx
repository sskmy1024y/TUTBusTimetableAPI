import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'hooks'
import React from 'react'

import * as Search from 'modules/Search'
import { RootState } from 'modules'
import { formatDate } from 'lib/utils'
import { thunkActionCreators } from 'middleware/thunkAction'
import SearchModal from 'components/SearchModal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

export default function TitleComponent() {
  const dispatch = useDispatch()
  const { isSearch, searchRequest } = useSelector<RootState, Search.State>(state => state.search)

  const handleCancel = () => {
    dispatch(thunkActionCreators.getTimetable({ datetime: new Date(), searchType: null }))
  }

  return (
    <Container>
      <Title>
        {isSearch && searchRequest !== null
          ? searchRequest.type === Search.SearchType.Depature && searchRequest.datetime !== undefined
            ? `${formatDate(searchRequest.datetime)} 出発`
            : searchRequest.type === Search.SearchType.Arrival && searchRequest.datetime !== undefined
            ? `${formatDate(searchRequest.datetime)} 到着`
            : searchRequest.type === Search.SearchType.First
            ? '始バス'
            : searchRequest.type === Search.SearchType.Last
            ? '終バス'
            : ''
          : '次の学バス'}
      </Title>
      <ButtonContainer>
        {isSearch && searchRequest !== null && (
          <CancelButton onClick={handleCancel} variant="outline-secondary">
            <FontAwesomeIcon icon="times" />
          </CancelButton>
        )}
        <SearchModal />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`

const Title = styled.h3`
  font-size: 2.1rem;
  font-weight: 350;
  line-height: 1.2;
`

const ButtonContainer = styled.div`
  > button {
    margin-right: 5px;

    &:last-child {
      margin-right: 0;
    }
  }
`

const CancelButton = styled(Button)`
  background-color: rgba(108, 117, 125, 0.25);

  padding: 0px 10px;
  margin-bottom: 8px;
  width: 40px;
  height: 40px;

  :hover {
    background-color: rgba(108, 117, 125, 0.75);
  }
`
