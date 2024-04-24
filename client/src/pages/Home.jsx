import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings ] = useState([]);
  const [rentListings, setRentListings ] = useState([]);
  const [saleListings, setSaleListings ] = useState([]);
  SwiperCore.use([Navigation]);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/*top */}
      <div className='flex flex-col gap-5 px-28 py-3 mx-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6äxl'> Find your next {''}
        <span className='text-slate-500'>dream</span> Property</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>Future Estate is the best place to find your next dream Property to live.
          <br/>
          We have a wide range of properties for you to choose from. 
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started!
        </Link>
      </div>
      {/* swipper*/}
      <Swiper navigation>
        {offerListings && offerListings.lenght > 0 && offerListings.map((listing) => (
          <SwiperSlide key={listing._id}>
            <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}}
             className='h-[500px]'  ></div>
          </SwiperSlide>
          )
        )}
      </Swiper>
      {/* listings results*/}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-blue-600  hover:underline'>
              Show More
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}/>
              )
              )}
            </div>
          </div> 
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link to={'/search?type=rent'} className='text-sm text-blue-600  hover:underline'>
                Show More places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}/>
              )
              )}
            </div>
          </div> 
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link to={'/search?type=sell'} className='text-sm text-blue-600  hover:underline'>
              Show More places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id}/>
              )
              )}
            </div>
          </div> 
        )}
      </div>
    </div>
  )
}
