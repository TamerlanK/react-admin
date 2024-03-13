import React from "react"

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">{children}</div>
    </div>
  )
}

export default Modal
