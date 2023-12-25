import { createContext, useContext, useMemo, useState } from 'react'
import Modal from '@/components/shared/Modal'
import { createPortal } from 'react-dom'

type ModalProps = React.ComponentProps<typeof Modal>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (options: ModalOptions) => void
  close: () => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValues: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

export default function ModalContext({
  children,
}: {
  children: React.ReactNode
}) {
  const [modalState, setModalState] = useState<ModalProps>(defaultValues)
  const portalRoot = document.getElementById('portal-root') as HTMLElement

  const open = (options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }

  const close = () => {
    setModalState(defaultValues)
  }

  const values = useMemo(
    () => ({
      open,
      close,
    }),
    [],
  )

  return (
    <Context.Provider value={values}>
      {children}
      {portalRoot !== null
        ? createPortal(<Modal {...modalState} />, portalRoot)
        : null}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)

  if (values === null) {
    throw new Error('ModalContext 안에서 사용해주세요')
  }
  return values
}
