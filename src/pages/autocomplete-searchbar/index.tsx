// https://dummyjson.com/recipes/search?q=
// Challenges:
// 1. Make api call, fetch the data and show it in the screen
// 2. Create an input field with search-input as className
// 3. Create a state as results to store fetched data in it
// 4. Create a searchedInput state to store searched text in it
// 5. Add a functionality to have keydown events to go through the suggested results
// 6. Add accessibiliity to it

import { useCallback, useEffect, useState } from 'react'
import styles from './autocomplete-searchbar.module.css'

type ApiData = {
  id: string
  name: string
}[]

const AutocompleteSearchbar = () => {
  const url = 'https://dummyjson.com/recipes/search?q='

  const [results, setResults] = useState<ApiData>([])
  const [searchedInput, setSearchedInput] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [cache, setCache] = useState<Record<string, ApiData>>({})

  const fetchData = useCallback(async () => {
    if (cache[searchedInput]) {
      console.log('Cached Data :', cache)
      console.log('CACHED RETURNED :', searchedInput)
      setResults(cache[searchedInput])
      return
    }

    console.log('API CALL :', searchedInput)
    const data = await fetch(url + searchedInput)
    const json = await data.json()
    setResults(json?.recipes)
    setCache((prevState) => ({ ...prevState, [searchedInput]: json?.recipes }))
  }, [searchedInput, cache, setResults, setCache, url])

  useEffect(() => {
    const timer = setTimeout(fetchData, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [fetchData, searchedInput])

  console.log('Data :', results)
  return (
    <div className={styles.app}>
      <h1>Autocomplete Searchbar</h1>

      <div>
        <input
          className={styles.input}
          type="text"
          value={searchedInput}
          onChange={(e) => setSearchedInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className={styles.resultContainer}>
            {results.map((ele) => (
              <span key={ele.id} className={styles.results}>
                {ele.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AutocompleteSearchbar
