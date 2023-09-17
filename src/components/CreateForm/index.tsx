import Button from '@/components/Button'
import type { CreateFormType } from '@/interface'

const CreateForm: React.FC<CreateFormType> = ({
  handleOnChange,
  handleSubmit,
  title,
  description,
  error
}) => {
  return (
    <div className=''>
      <div className='mb-8'>{title ? 'Edit the blog' : 'Create new blog'}</div>
      <label className='block'>
        <span className="text-sm font-medium text-slate-700">
          Title
        </span>
        <input
          type='email'
          name='email'
          value={title}
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
          placeholder='Title'
          onChange={e => handleOnChange('title', e.target.value)}
        />
      </label>{' '}
      <br />
      <label className='block'>
        <span className="text-sm font-medium text-slate-700">
          Description
        </span>
        <textarea
          placeholder='Description'
          value={description}
          onChange={e => handleOnChange('description', e.target.value)}
          className='mt-1 px-3 py-2 h-[200px] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
        ></textarea>
      </label>{' '}
      <br /> <br />
      <div className=' flex justify-between '>
      <div className='text-[red] mt-2 text-right text-sm animate-bounce'>{error}</div>

        <Button text='SUBMIT' onClick={handleSubmit} primary />
      </div>
    </div>
  )
}

export default CreateForm
