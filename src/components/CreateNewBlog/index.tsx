import { useRouter } from 'next/navigation'
interface CreateNewBlogProps {
  router: ReturnType<typeof useRouter>
  id: number
}

const CreateNewBlog: React.FC<CreateNewBlogProps> = ({ router, id }) => {
  return (
    <div
      className='shadow-xl rounded-2xl w-[100%] lg:w-[48%] min-h-[300px] flex justify-center items-center text-[100px] cursor-pointer'
      onClick={() => router.push(`/?modal=true&action=edit&id=${id}`)}
    >
      +
    </div>
  )
}

export default CreateNewBlog
