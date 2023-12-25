import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import FullScreenMessage from './components/shared/FullScreenMessage'
import Heading from './components/sections/Heading'
import Video from './components/sections/Video'
import styles from './App.module.scss'
import { Wedding } from './models/wedding'
import ImageGallery from './components/sections/ImageGallery'
import Intro from './components/sections/intro'
import Invitation from './components/shared/Invitation'
import Calendar from './components/sections/Calendar'
import Map from './components/sections/Map'
import Contact from './components/sections/Contact'
import Share from './components/sections/Share'
import Modal from './components/shared/Modal'
import AttendCountModal from './components/AttendCountModal'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
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

  if (wedding === null) return null

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  if (loading) return <FullScreenMessage type="loading" />
  if (error) return <FullScreenMessage type="error" />

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App
