import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const DeleteBook = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const handleDelete = async () => {
    setLoading(true)
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book deleted successfully!', { variant: 'success' })
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
      <h1 className='text-3xl my-4 font-bold'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-xl font-bold'>Are you sure you want to delete this book?</h3>
        <button
          onClick={handleDelete}
          className='bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600'>
          Delete
        </button>
      </div>
    </div>
  )
}
export default DeleteBook
