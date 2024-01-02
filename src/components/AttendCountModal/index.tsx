import { useModalContext } from '@/contexts/ModalContext'
import { Wedding } from '@/models/wedding'
import { useEffect, useRef } from 'react'

export default function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close }: any = useModalContext()

  const $input = useRef<HTMLInputElement>(null) //  의존성이 추가될 수 있으므로 useRef를 사용한다.

  const haveSeenModal = localStorage.getItem('@have-seen-modal')

  useEffect(() => {
    if (haveSeenModal === 'true') {
      return
    }

    open({
      title: `현재 참석자: ${wedding.attendCount} 명`,
      body: (
        <div>
          <input
            ref={$input}
            placeholder="참석 가능 인원을 추가해주세요"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return
        }

        await fetch('http://localhost:8888/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
  }, [open, close, wedding, haveSeenModal]) // eslint-disable-line
  return null
}
