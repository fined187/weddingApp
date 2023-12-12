import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import FullScreenMessage from './components/shared/FullScreenMessage'

import styles from './App.module.scss'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // 1. wedding 데이터 호출
  useEffect(() => {
    setLoading(true)
    //  callback, promise, async/await
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 데이터를 불러올 수 없습니다.')
        }
        // 2. wedding 데이터를 store에 저장
        return res.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error.message)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading === false) return <FullScreenMessage type="loading" />
  if (error) return <FullScreenMessage type="error" />

  return <div className={cx('container')}>{JSON.stringify(wedding)}</div>
}

export default App
