import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import HomeClothesCard from '../components/HomeClothesCard';
import ClothesCard from '../components/ClothesCard';
import products from '../data/products';

export default function Home() {
  const [clothes, setClothes] = useState(products);

  const clothesData = [
    {
      id: 1,
      name: 'Work-Out',
      price: 19.99,
      image: 'https://gflock.lk/cdn/shop/files/GFX-cover-LK_final2_2048x2048.jpg?v=1722403511',
    },
    {
      id: 2,
      name: 'NightWears',
      price: 49.99,
      image: 'https://nilsonline.lk/image/catalog/nils/product/night-wear%20collection%20by%20nils_150623.jpg',
    },
    {
      id: 3,
      name: 'Dress',
      price: 39.99,
      image: 'https://nilsonline.lk/image/cache/catalog/nils/product/Home%20Page/August_5th_Website%20Homepage-2880x1180.jpg',
    },
    {
      id: 4,
      name: 'Denim',
      price: 79.99,
      image: 'https://gflock.lk/cdn/shop/files/Denim-Cover-LK_48962d78-a3d4-439a-863f-d84a791957c8_2048x2048.jpg?v=1721848577',
    },
  ];

  return (
    <div>
      <Slider />

      <div className="my-8 flex justify-center">
        <Link to="#">
          <img
            src="https://nilsonline.lk/image/catalog/nils/product/0823/KOKO_homepage_2308.gif"
            alt="Discount deal"
            className="w-full max-w-screen-lg"
          />
        </Link>
      </div>

      

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Shop Our Latest Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clothesData.map((item) => (
            <HomeClothesCard key={item.id} item={item} />
          ))}
        </div>
        {/* <div className='text-1xl text-center text-gray-800 mb-8'>
          <Link to={'http://localhost:5174/collection'} className='bg-transparent hover:bg-green-300 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded absolute top-150'>
            View More
          </Link>
        </div> */}
      </div>

      <div className="my-12">
        <p className="text-center text-base leading-loose max-w-4xl mx-auto px-5 text-gray-700">
          Discover fashion, explore destinations, and elevate your lifestyle with us. Whether you seek luxury travel or trendy outfits, we bring it all under one roof.
        </p>
      </div>

      <div className="my-12">
        <p className="text-center text-base leading-loose max-w-4xl mx-auto px-5 text-gray-700">
          Hey there, welcome to DreamFit.LK - the ultimate fashion destination for every occasion! Whether you're looking for casual wear, office wear, or party wear, we have a wide range of options to choose from.
          Plus, we now have a range of quality, modern kids wear that we're sure moms will love! Shop with us today and take your fashion game to the next level.
        </p>
      </div>

      <footer className=" border border-t-8 border-pink-500 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
           <Link
                 to="/"
                 className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
               >
                 <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg text-white">
                 VirtuFit
                 </span>
                 .LK
                 {/* spm */}
               </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-bold">ABOUT</h3>
              <p>VirtuFit.LK</p>
              <p>VirtuFit.LK</p>
            </div>
            <div>
              <h3 className="font-bold">FOLLOW US</h3>
              <p>Instagram</p>
              <p>FaceBook</p>
            </div>
            <div>
              <h3 className="font-bold">LEGAL</h3>
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-8">© 2025 VirtuFit.LK</div>
        <div className="flex justify-center gap-4 mt-4">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-tiktok"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </footer>
    </div>
  );
}
