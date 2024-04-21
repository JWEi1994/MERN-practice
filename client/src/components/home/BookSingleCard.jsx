import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div key={book._id} className=' border-2 bg-white p-4 rounded-md shadow-md relative'>

            <h2 className='absolute top-2 right-2 bg-pink-400 text-white px-4 py-1 rounded-lg'>{book.published}</h2>

            <h4 className='my-2 text-gray-500'>{book._id}</h4>

            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-3xl text-blue-500' />
                <h2 className='my-1'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-3xl text-blue-500' />
                <h2 className='my-1'>{book.author}</h2>
            </div>

            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <BiShow className='text-green-500 text-2xl cursor-pointer' onClick={() => setShowModal(true)} />
                <Link to={`/books/details/${book._id}`}> <BsInfoCircle className='text-blue-500 text-2xl' /> </Link>
                <Link to={`/books/edit/${book._id}`}> <AiOutlineEdit className='text-yellow-500 text-2xl' /> </Link>
                <Link to={`/books/delete/${book._id}`}> <MdOutlineDelete className='text-red-500 text-2xl' /> </Link>
            </div>
            {
                showModal && (<BookModal book={book} onClose={() => setShowModal(false)} />)
            }
        </div>
    )
}

export default BookSingleCard
