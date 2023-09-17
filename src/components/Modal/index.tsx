interface ModalProps {
  children?: React.ReactNode,
  onClose: () => (void)
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className='fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-[#00000099]'>
      <div className='bg-white p-5 rounded-md relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[800px] transform-none opacity-100'>
        <div onClick={onClose} className='absolute right-0 top-0 text-2xl p-4 cursor-pointer'>&#10006;</div>
        {children}
      </div>
    </div>
  )
}

export default Modal
