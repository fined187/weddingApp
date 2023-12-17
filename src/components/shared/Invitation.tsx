import styles from './Invitation.module.scss'
import classNames from 'classnames/bind'
import Section from './Section'
import Text from './Text'

interface InvitationProps {
  message: string
}

const cx = classNames.bind(styles)

function Invitation({ message }: InvitationProps) {
  return (
    <Section className={cx('container')}>
      <Text>{message}</Text>
    </Section>
  )
}

export default Invitation
