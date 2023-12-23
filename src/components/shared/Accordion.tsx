import classNames from 'classnames/bind'
import styles from './Accordion.module.scss'
import { PropsWithChildren, useState } from 'react'

const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
  children: React.ReactNode
}

export default function Accordion({
  label,
  children,
}: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(false)
  const handleToggle = () => setExpanded((prev) => !prev)

  return (
    <div className={cx(['wrap-accordion', expanded ? 'open' : ''])}>
      <div className={cx('wrap-header')} onClick={handleToggle}>
        <span>{label}</span>
        <IconArrow className={cx('icon-arrow-down')} />
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} version="1.1" viewBox="0 0 512 512">
      <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
    </svg>
  )
}
