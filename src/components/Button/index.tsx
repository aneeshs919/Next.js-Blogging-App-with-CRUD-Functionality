interface ButtonProps {
  text: string
  primary?: boolean
  onClick: () => void
}
const Button: React.FC<ButtonProps> = ({ text, primary, onClick }) => (
  <div
    className={`${
      primary ? 'bg-primary' : 'bg-black'
    } p-2 pl-6 pr-6 rounded-md cursor-pointer text-white hover:opacity-75`}
    onClick={onClick}
  >
    {text}
  </div>
)

export default Button
