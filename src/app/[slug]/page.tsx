'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import type { BlogData, BlogDetailsProps } from '@/interface'

const BlogDetails: React.FC<BlogDetailsProps> = ({ params }) => {
  const [blog, setBlog] = useState<BlogData | null>()
  useEffect(() => {
    try {
      const blogId = localStorage.getItem('blog_id') || ''
      if (blogId) {
        const blogDataString = localStorage.getItem('BLOG_DATA') || ''
        const blogData: BlogData[] = JSON.parse(blogDataString)
        const filterBlog = blogData?.find(
          item => item.blog_id === parseInt(blogId)
        )
        setBlog(filterBlog)
      }
    } catch (error) {
      console.error('Error storing data in localstorage:', error)
    }
  }, [])
  return (
    <div>
      <Head>
        <title>{blog?.headline}</title>
        <meta name='title' content={blog?.headline} />
        <meta name='description' content={blog?.description} />
        <link rel='canonical' href={`${params.slug}`} />
      </Head>

      <Header />
      <div className='max-w-[1200px] m-auto py-10 px-4'>
        <Image
          className='max-w-[100%] lg:max-w-[1000px]'
          src='/Hero_Images_for_Keyword.webp'
          alt={`${blog?.headline}`}
          width={1000}
          height={300}
        />
        <div className='text-gray-500 text-sm mb-5'>{blog?.published}</div>
        <div className='text-4xl bold mb-4 capitalize'>{blog?.headline}</div>
        <div className='max-h-[100px] min-h-[100px] overflow-hidden'>
          {blog?.description}
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
