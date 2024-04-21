import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublished(res.data.published)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        alert('An error occurred. Please check the console.')
        setLoading(false)
      })
  }, [])

  const handleUpdate = async () => {

    const data = {
      title,
      author,
      published
    }
    setLoading(true)
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book updated successfully!', { variant: 'success' })
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
      <h1 className='text-3xl my-4 font-bold'>Edit Book</h1>
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

        <button onClick={handleUpdate} className='bg-sky-400 text-white py-2 px-4 rounded-md w-full'>Update Book

        </button>

      </div>
    </div>
  )
}

export default EditBook
