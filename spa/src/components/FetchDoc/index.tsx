import React from 'react'

import ReactMarkdown from 'react-markdown'

import './style.scss'
import { useEffect, useState } from 'hooks'

interface DocProps {
  src: string
}

export default function FetchDoc({ src }: DocProps) {
  const [docData, setDocData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${src}`, {
        mode: 'cors'
      })
      if (response.ok) {
        setDocData(await response.text())
      }
    }

    fetchData()
  }, [src])

  return (
    <div id='markdown'>
      <ReactMarkdown source={docData} />
    </div>
  )
}
