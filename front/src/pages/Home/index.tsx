import React from 'react'

import { Button } from 'react-bootstrap'

interface HomeProps {
  name: String
}

function Home({ name }: HomeProps) {
  return <Button variant='primary'>{name}</Button>
}

export default Home
