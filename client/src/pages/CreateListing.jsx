import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
    <form className='flex flex-col sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1' id='column-left-top'>
            <input type='text' placeholder='Name' className='border p-3 rounded-lg'
            id='name' maxLength='62' minLength='10' required />
            <input type='text' placeholder='Description' className='border p-3 rounded-lg'
            id='description' required />
            <input type='text' placeholder='Address' className='border p-3 rounded-lg'
            id='address' required />
        
            <div className='flex gap-6 flex-wrap' id='checkboxes'>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sell' className='w-5'/>
                    <span>Sell</span>
                </div>
                <div>
                    <input type='checkbox' id='rent' className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5'/>
                    <span>Parhing spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5'/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-6' id='rooms'>
                <div className='flex items-center gap-2'>
                    <input type='number' id='bedrooms' min='1' max='10' required
                    className='p-3 border border-gray-300 rounded-lg' />
                    <p>Beds</p>
                </div>
                <div>
                    <input type='number' id='bathrooms' min='1' max='10' required
                    className='p-3 border border-gray-300 rounded-lg' />
                    <p>Baths</p>
                </div>
            <div className='' id='prices'>
                <div>
                    <input type='number' id='regularPrice' min='1' max='10' required
                    className='p-3 border border-gray-300 rounded-lg' />
                    <p>Regular Price</p>
                    <span className='text-xs'>($ / month)</span>
                </div>
                <div className=''>
                    <input type='number' id='discountPrice' min='1' max='10' required
                    className='p-3 border border-gray-300 rounded-lg' />
                    <p>Discounted Price</p>
                    <span className='text-xs'>($ / month)</span>
                </div>
            </div>
            </div>
        </div>
        <div className='flex flex-col flex-1 gap-4' id='column-right-bottmo'>
            <p className='font-semibold'>Images:</p>
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
            <div className='flex gap-4'>
                <input className='p-3 border border-gray-300 rounded w-full'
                 type='file' accept='images/*' multiple/>
                <button className='p-3 text-green-700 border-green-700 rounded 
                uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80
        '>Create Listing</button>
        </div>
    </form>
    </main>
  )
}
