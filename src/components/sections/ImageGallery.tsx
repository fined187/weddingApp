import classNames from 'classnames/bind'
import Section from '../shared/Section'
import styles from './ImageGallery.module.scss'
import ImgaeViewer from '../ImageViewer'
import { useState } from 'react'
import generateImageUrl from '@/utils/generateImageUrl'

const cx = classNames.bind(styles)

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(-1)

  const open = selectedIdx > -1

  const handleSelectedImgae = (idx: number) => {
    setSelectedIdx(idx)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, idx) => (
            <li
              key={idx}
              className={cx('wrap-image')}
              onClick={() => {
                handleSelectedImgae(idx)
              }}
            >
              <picture>
                <source
                  srcSet={generateImageUrl({
                    filename: src,
                    format: 'webp',
                    option: 'w_240, h_240, q_auto, c_fill',
                  })}
                  type="image/webp"
                />
                <img
                  src={generateImageUrl({
                    filename: src,
                    format: 'jpg',
                    option: 'w_240, h_240, q_auto, c_fill',
                  })}
                  alt="이미지"
                />
              </picture>
            </li>
          ))}
        </ul>
      </Section>
      <ImgaeViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}

export default ImageGallery
