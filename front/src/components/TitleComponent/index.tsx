import React from 'react'
import { useSelector, useDispatch } from 'hooks'
import { Button } from 'react-bootstrap'

import { RootState, actionCreator } from 'modules'
import * as Search from 'modules/Search'
import SearchModal from 'components/SearchModal'
import { formatDate } from 'lib/utils'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TitleComponent() {
  const dispatch = useDispatch()
  const { isSearch, searchRequest } = useSelector<RootState, Search.State>(state => state.search)

  const handleCancel = () => {
    dispatch(actionCreator.setSearchRequest({ enable: false, searchRequest: null }))
  }

  return (
    <Component>
      <Title>
        {isSearch && searchRequest !== null
          ? searchRequest.type === Search.SearchType.Depature && searchRequest.datetime !== undefined
            ? `${formatDate(searchRequest.datetime)}までに発車する学バス`
            : searchRequest.type === Search.SearchType.Arrival && searchRequest.datetime !== undefined
            ? `${formatDate(searchRequest.datetime)}までに到着する学バス`
            : searchRequest.type === Search.SearchType.First
            ? '始バス'
            : searchRequest.type === Search.SearchType.Last
            ? '終バス'
            : ''
          : '次の学バス'}
      </Title>
      {isSearch && searchRequest !== null ? (
        <CancelButton onClick={handleCancel} variant="outline-secondary">
          <FontAwesomeIcon icon="times" />
        </CancelButton>
      ) : (
        <SearchModal />
      )}
    </Component>
  )
}

const Component = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`

const Title = styled.h3`
  font-size: 2.1rem;
  font-weight: 300;
  line-height: 1.2;
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
