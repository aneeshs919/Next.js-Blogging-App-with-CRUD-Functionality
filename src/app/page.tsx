'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Card from '@/components/Card'
import Header from '@/components/Header'
import CreateNewBlog from '@/components/CreateNewBlog'
import { BLOG_DATA } from '@/constants'
import type { BlogData } from '@/interface'
import BlogModal from '@/components/BlogModal'

// Initialize blog data if does't exist
try {
  if (!localStorage.getItem('BLOG_DATA')) {
    const set = JSON.stringify(BLOG_DATA)
    localStorage.setItem('BLOG_DATA', set)
  }
} catch (error) {
  console.error('Error storing data in localstorage:', error)
}

export default function Home () {
  const [data, setData] = useState<BlogData[]>([])
  const router = useRouter()
  const showModal = useSearchParams().get('modal')

  // Function to retrieve data from local storage
  const getDataFromLocalStorage = () => {
    try {
      const jsonDataString = localStorage.getItem('BLOG_DATA')
      const jsonData: BlogData[] = JSON.parse(jsonDataString || '[]')
      setData(jsonData)
    } catch (error) {
      console.error('Error storing data in localstorage:', error)
    }
  }

  useEffect(() => {
    getDataFromLocalStorage()
  }, [showModal])

  //Function to handle that open the blogModal
  const handleActionModal = (type: string, id: number) => {
    router.push(`/?modal=true&action=${type}&id=${id}`)
  }

  //Function to handle read more
  const goToBlog = (id: number) => {
    localStorage.setItem('blog_id', id.toString())
  }

  return (
    <main>
      <Head>
        <title>Globeia blogs</title>
        <meta name='title' content='Blogs page title' />
        <meta name='description' content='Blogs page description' />
        <link rel='canonical' href={`/`} />
      </Head>
      <Header />
      <div className='max-w-[1200px] m-auto py-10 px-4'>
        <div className='flex gap-5 flex-wrap'>
          {data?.map(blogs => (
            <Card
              key={blogs.blog_id}
              title={blogs.headline}
              description={blogs.description}
              handleClick={type => handleActionModal(type, blogs.blog_id)}
              handleReadMore={() => goToBlog(blogs.blog_id)}
            />
          ))}
          <CreateNewBlog router={router} id={data.length + 1 || 1} />
        </div>
      </div>
      {showModal && <BlogModal data={data} />}
    </main>
  )
}
