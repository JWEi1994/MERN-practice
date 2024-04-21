import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async () => {

    const data = {
      title,
      author,
      published
    }
    setLoading(true)
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false)
        // alert('Book created successfully!')
        enqueueSnackbar('Book created successfully!', { variant: 'success' })
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        // alert('An error occurred. Please check the console.')
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' })
        console.log(err)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 font-bold'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-sky-400 rounded-md py-2 px-4 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-sky-400 rounded-md py-2 px-4 w-full' />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Published</label>
          <input
            type='number'
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            className='border-2 border-sky-400 rounded-md py-2 px-4 w-full' />
        </div>

        <button onClick={handleSubmit} className='bg-sky-400 text-white py-2 px-4 rounded-md w-full'>Create Book

        </button>

      </div>
    </div>
  )
}

export default CreateBook
