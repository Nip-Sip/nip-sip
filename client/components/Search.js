import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Fuse from 'fuse.js'

const Search = () => {
  const [query, setQuery] = useState('')
  const [resBox, setResBox] = useState([])

  const { products } = useSelector(s => s)

  /**
   * fuse receives state, possible to pass it down from Component
   * The rest are options:
   * https://fusejs.io
   */
  const fuse = new Fuse(products, {
    keys: ['name'],
    includeScore: true,
    threshold: 0.3
  })

  const results = fuse.search(query)

  const onSearch = ({ currentTarget }) => {
    setQuery(currentTarget.value)
    console.log(`🟢  results `, results)
  }

  const onSubmit = e => {
    e.preventDefault()
    const itemArr = results.map(r => r.item)
    console.log(`🟢  itemArr `, itemArr)
    setResBox(itemArr)
  }

  return (
    <>
      <h1>Search Input</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="search here" type="text" onChange={onSearch} />
      </form>
      <ul>
        {resBox.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </>
  )
}

export default Search
