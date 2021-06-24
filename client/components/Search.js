import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  setVisibility,
  BEST_SELLERS,
  HIGHEST_PRICE,
  LOWEST_PRICE,
  ALPHABETICAL_ASC,
  ALPHABETICAL_DEC
} from '../store/products'

import Fuse from 'fuse.js'

const Search = () => {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('BEST_SELLERS')
  const [resultsMessage, setMessage] = useState('')
  const dispatch = useDispatch()

  const { products } = useSelector(s => s)
  const { visibleProducts } = useSelector(s => s)

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

  const handleChange = e => {
    const newSortBy = e.target.value
    setSortBy(newSortBy)
    dispatch(setVisibility([...visibleProducts], newSortBy))
  }

  const onSearch = ({ currentTarget }) => {
    setQuery(currentTarget.value)
    setMessage('')
  }

  const onSubmit = e => {
    e.preventDefault()
    const itemArr = results.map(r => r.item)
    if (query) {
      if (itemArr.length < 1) {
        setMessage('No Results')
      }
      dispatch(setVisibility(itemArr, sortBy))
    } else {
      dispatch(setVisibility(products, sortBy))
    }
  }

  const handleShowAll = () => {
    setQuery('')
    setMessage('')
    dispatch(setVisibility(products, sortBy))
  }

  return (
    <>
      <div className="set-visibility-container">
        <form className="search-bar" onSubmit={onSubmit}>
          <TextField
            label="Find A Nip"
            type="search"
            variant="outlined"
            onChange={onSearch}
            value={query}
          />
          <Button size="small" color="primary" onClick={() => handleShowAll()}>
            Show All
          </Button>
        </form>
        <FormControl variant="outlined">
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by"
            id="sort-by-select"
            value={sortBy}
            onChange={handleChange}
            label="Sort By"
          >
            <MenuItem value={BEST_SELLERS}>MOST BUSSIN NIPS</MenuItem>
            <MenuItem value={HIGHEST_PRICE}>MOST EXPENSIVEST</MenuItem>
            <MenuItem value={LOWEST_PRICE}>CHEAP DRANKS</MenuItem>
            <MenuItem value={ALPHABETICAL_ASC}>A to Z</MenuItem>
            <MenuItem value={ALPHABETICAL_DEC}>Z to A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <h3 className='message'>{resultsMessage}</h3>
    </>
  )
}

export default Search
