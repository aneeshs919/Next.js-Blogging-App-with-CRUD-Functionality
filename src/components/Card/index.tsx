import Button from '@/components/Button'
interface CardProps {
  title: string
  description: string
  handleClick: (action: 'edit' | 'delete') => void
  handleReadMore: () => void
}
const Card: React.FC<CardProps> = ({
  title,
  description,
  handleClick,
  handleReadMore
}) => {
  return (
    <div className='shadow-xl p-5 rounded-2xl w-[100%] lg:w-[48%] min-h-[300px]'>
      <div className='text-2xl bold mb-4 capitalize truncate ...'>{title}</div>
      <div className='max-h-[100px] min-h-[100px] overflow-hidden'>
        {description}
      </div>
      <a
        href={`/${title.split(' ').join('_')}`}
        className='text-primary underline text-right cursor-pointer'
        onClick={handleReadMore}
      >
        Read more...
      </a>
      <div className='flex gap-2 mt-10'>
        <Button text='EDIT'  onClick={() => handleClick('edit')} />
        <Button text='DELETE'  onClick={() => handleClick('delete')} />
      </div>
    </div>
  )
}

export default Card
