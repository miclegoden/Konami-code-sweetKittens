import React, { useEffect, useState, useRef, useCallback } from 'react'
import logo from './logo.svg'
import Header from './Components/Header'
import Main from './Components/Main'

import { secretCode, keyDelayTime, showTime, dataType } from './Common'
import './App.css'

function App() {
  const intervalTime: { current: NodeJS.Timeout | null } = useRef(null)
  const [typeKey, setTypeKey] = useState('')
  const [showData, setShowData] = useState<Array<dataType>>([])
  const [showSecretCode, setShowSecretCode] = useState(false)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeKey(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 27) {
      setTypeKey('')
      return
    } else {
      setTypeKey(typeKey)
      console.log('eya')
      intervalTime.current && cleanTimer()
      countTimer()
      console.log(typeKey.length, 'length')
      return
    }
  }

  const showInfoData = useCallback(
    (data: Array<dataType>) => {
      data.map((item: any, _index: number) => {
        if (_index >= 5) return
        setShowData((t) => [...t, { title: item.title, user: item.user.login }])
      })
    },
    [showData],
  )

  useEffect(() => {
    if (typeKey === secretCode) {
      setShowSecretCode((prevState) => (prevState = !prevState))
      setTypeKey('')
      return
    }
  }, [typeKey])

  useEffect(() => {
    if (showSecretCode) {
      console.log('ok')
      const showDataTime = setTimeout(() => {
        setShowData([])
        console.log('good')
      }, showTime)
      ;(async () => {
        await fetch('https://api.github.com/repos/elixir-lang/elixir/issues')
          .then((res) => {
            Promise.any([res.json()]).then((data) => {
              showInfoData(data)
            })
          })
          .catch((err) => {
            throw err
          })
      })()
      return () => {
        clearTimeout(showDataTime)
      }
    }
  }, [showSecretCode])
  const countTimer = () => {
    const timer = setTimeout(() => {
      setTypeKey('')
      cleanTimer()
    }, keyDelayTime)
    intervalTime.current = timer
  }

  const cleanTimer = () => {
    clearTimeout(intervalTime.current as NodeJS.Timeout)
  }

  return (
    <div>
      <Header />
      <Main showData={showData} />

      <input
        type="text"
        value={typeKey}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <div></div>
    </div>
  )
}

export default App
