import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { VIEW_SEARCH, VIEW_ALL, setVisibility } from '../store/products'

import Fuse from 'fuse.js'

const Search = () => {
  const [query, setQuery] = useState('')
  const [resBox, setResBox] = useState([])
  const [resultsMessage, setMessage] = useState('')
  const dispatch = useDispatch()

  const { products } = useSelector(s => s)

  /**
   * fuse receives state, possible to pass it down from Component
   * The rest are options:
   * https://fusejs.io
   */
  const fuse = new Fuse(products, {
    keys: ['name', 'category'],
    includeScore: true,
    threshold: 0.3,
    minMatchCharLength: 2,
    ignoreLocation: true
  })

  const results = fuse.search(query)

  const onSearch = ({ currentTarget }) => {
    setQuery(currentTarget.value)
    setMessage('')
    console.log(`🟢  results `, results)
  }

  const onSubmit = e => {
    e.preventDefault()
    const itemArr = results.map(r => r.item)
    console.log(`🟢  itemArr `, itemArr)
    setResBox(itemArr)
    if (query) {
      if (itemArr.length < 1) {
        setMessage('No Results')
      }
      dispatch(setVisibility(itemArr, VIEW_SEARCH))
    } else {
      dispatch(setVisibility(products, VIEW_ALL))
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          label="Find A Nip"
          type="search"
          variant="outlined"
          onChange={onSearch}
          onClick={()=>console.log(event)}
        />
      </form>

      <span>{resultsMessage}</span>
    </>
  )
}

export default Search
