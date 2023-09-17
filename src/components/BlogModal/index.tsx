import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import CreateForm from '@/components/CreateForm'
import type { BlogData } from '@/interface'
import { MESSAGE } from '@/constants'

interface ModalProps {
  data: BlogData[]
}

//Function to store data in local storage
const storeInLocalStorage = (data: BlogData[], router: any) => {
  try {
    const set = JSON.stringify(data)
    localStorage.setItem('BLOG_DATA', set)
    router.back()
  } catch (error) {
    console.error('Error storing data in localstorage:', error)
  }
}

// Blog modal component
const BlogModal: React.FC<ModalProps> = ({ data }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [blogData, setBlogData] = useState<BlogData[]>([])
  const action = useSearchParams().get('action') || ''
  const id = useSearchParams().get('id') || ''
  const router = useRouter()

  //Update blog data when data prop changes
  useEffect(() => {
    const filterBlog = data.find(
      (item: BlogData) => item.blog_id === parseInt(id)
    )
    if (filterBlog) {
      setTitle(filterBlog?.headline || '')
      setDescription(filterBlog?.description || '')
    }
    setBlogData(data)
  }, [data, id])

  // Function to remove selected data entry
  const selectedBlog = () => {
    const filterBlogData = blogData.filter(
      (item: BlogData) => item.blog_id !== parseInt(id)
    )
    storeInLocalStorage(filterBlogData, router)
  }

  // Function to handle form input changes
  const handleForm = (type: string, value: string) => {
    setError('')
    if (type === 'title') setTitle(value)
    if (type === 'description') setDescription(value)
  }

  // Function to handle form submission
  const handleSubmit = () => {
    const setItem: BlogData = {
      blog_id: parseInt(id),
      headline: title,
      description: description,
      published: new Date()
    }
    if (!title || !description) {
      return setError('Fill the required fields')
    }
    //clone blog data to avoid modify it directly
    const cloneBlogData = [...blogData]
    // check if a blog entry with the same blog_id already exist
    const existingBlogIndex = cloneBlogData.findIndex(
      item => item.blog_id === parseInt(id)
    )
    if (existingBlogIndex !== -1) {
      cloneBlogData[existingBlogIndex] = {
        ...cloneBlogData[existingBlogIndex],
        headline: title || cloneBlogData[existingBlogIndex].headline,
        description: description || cloneBlogData[existingBlogIndex].description
      }
    } else {
      // Add new if does't exist
      cloneBlogData.push(setItem)
    }
    // Update state with the modified array
    setBlogData(cloneBlogData)
    // Adding BLOG_DATA into storage
    storeInLocalStorage(cloneBlogData, router)
  }

  return (
    <Modal onClose={() => router.replace('/')}>
      {action === 'delete' ? (
        <div className='flex flex-col gap-2 p-8'>
          <div className='text-2xl text-center mb-5'>{MESSAGE[action]}</div>
          <div className='flex justify-center'>
            <Button text='YES, CONTINUE' onClick={selectedBlog} primary />
          </div>
        </div>
      ) : null}

      {action === 'edit' ? (
        <CreateForm
          handleOnChange={handleForm}
          handleSubmit={handleSubmit}
          title={title}
          description={description}
          error={error}
        />
      ) : null}
    </Modal>
  )
}

export default BlogModal
