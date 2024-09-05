import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='max-w-3xl mx-auto text-gray-700'>
        <div className='p-6 border-b flex items-center justify-between bg-cyan-600 rounded-bl-lg rounded-br-lg'>
            <Link className='text-2xl font-bold text-white' href={"/"}>
                CRUD-APP
            </Link>
            <Link className='bg-gray-200 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md' href={"/create"}>
                Add New
            </Link>
        </div>
    </div>
  )
}

export default Header