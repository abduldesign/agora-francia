"use client";
import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import NavBars from '../components/LandingPage/Navbar/page';
import Footer from '../components/LandingPage/footer/page';


const CarouselComponent = () => {
 

  const cardItems = [
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/Blueetooth_Headphone.png?updatedAt=1668162400881',
      description: 'Accessories & sound system',
      price: '7000',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/V238940049_IN_PC_BAU_Edit_Creation_Laptops2X._SY608_CB667377204_.jpg?updatedAt=1667243623423',
      description: ' TV & Home Appliances Deal',
      price: '8000',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/Solar_Power.jpg?updatedAt=1668162396232',
      description: 'Solar Panel & equipment',
      price: '8000',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/for_your_fit.jpg?updatedAt=1668164277266',
      description: 'Gym equipment',
      price: '8000',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/homeTouch_Stainless_Stell.jpg?updatedAt=1668162395706',
      description: 'New on Arrival',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/Computers.jpg?updatedAt=1668162395936',
      description: 'Computers & Gaming Laptop',
      price: '8000',
    },
    {
        image: 'https://ik.imagekit.io/amazonaga12345/Men_s_sweater/61XctAMNuuL._AC_UL480_QL65_.jpg?updatedAt=1668180550312',
        description: 'Best deal of the month',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Men_s_sweater/71SDmUquOJL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668180548487',
        description: ' special offers for all',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/smart_watch.webp?updatedAt=1668164277438',
        description: 'top deal of the year',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/watch.webp?updatedAt=1668164277170',
        description: 'todays selection',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wpns.webp?updatedAt=1668165057378',
        description: 'New on Arrival',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wt3.webp?updatedAt=1668165058875',
        description: 'best selling product',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wat2.webp?updatedAt=1668165057417',
        description: 'Smart Android watch',
        price: '20800',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Ozone_Shorts/61eWe7N3TQL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668176783780',
        description: 'Ladies under wear',
        price: '8800',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/men_s_shoes/41JVg-EAIEL._AC_SR320_320_.jpg?updatedAt=1668178869496',
        description: 'Sneakers for all men',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Men_s_sweater/61GLTt6N7hL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668180548032',
        description: 'Unique Sweater for mane',
        price: '16000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/men_s_shoes/41JVg-EAIEL._AC_SR320_320_.jpg?updatedAt=1668178869496',
        description: 'Stylish sneakers',
        price: '5500',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Ozone_Shorts/61i_Y69iVML._AC_UL480_QL65_.jpg?updatedAt=1668176783796',
        description: 'Comfortable jogging pants',
        price: '3200',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wat2.webp?updatedAt=1668165057417',
        description: 'Smart fitness tracker',
        price: '6800',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Ozone_Shorts/61eWe7N3TQL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668176783780',
        description: 'Comfortable shoes for women',
        price: '7200',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wat2.webp?updatedAt=1668165057417',
        description: 'Smart Android watch',
        price: '20800',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Ozone_Shorts/61eWe7N3TQL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668176783780',
        description: 'Ladies under wear',
        price: '8800',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/men_s_shoes/41JVg-EAIEL._AC_SR320_320_.jpg?updatedAt=1668178869496',
        description: 'Sneakers for all men',
        price: '8000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Men_s_sweater/61GLTt6N7hL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668180548032',
        description: 'Unique Sweater for mane',
        price: '16000',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/men_s_shoes/41JVg-EAIEL._AC_SR320_320_.jpg?updatedAt=1668178869496',
        description: 'Stylish sneakers',
        price: '5500',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Ozone_Shorts/61i_Y69iVML._AC_UL480_QL65_.jpg?updatedAt=1668176783796',
        description: 'Comfortable jogging pants',
        price: '3200',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wat2.webp?updatedAt=1668165057417',
        description: 'Smart fitness tracker',
        price: '6800',
      },
      {
        image: 'https://ik.imagekit.io/amazonaga12345/Ozone_Shorts/61eWe7N3TQL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668176783780',
        description: 'Comfortable shoes for women',
        price: '7200',
      },
  ];


  // Flash sales products (extend with more items)
const cardFlash = [
 
];

  return (


   
    <div className="w-full py-10">
      <NavBars/>

      {/* New Component Section */}
      <div className="mt-3 bg-white shadow-xl rounded-lg shadow-neutral-500/50 py-10">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {cardItems.map((item, index) => (
        <div
          key={index}
          className="bg-dark shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
        >
          <a href={`/products/${index}`} className="block">
            <img
              src={item.image}
              alt={`product-${index}`}
              className="w-full h-auto object-cover"
            />
          </a>
          <div className="p-4">
            <p className="text-center text-sm text-gray-600">{item.description}</p>
            <p className="text-center text-lg font-bold text-gray-800">₦{item.price}</p>

            <button
                    className="mt-1 bg-green-500 text-red-600 px-2 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
                    onClick={() => alert(`Buying ${item.description} for ₦${item.price}`)}
                  >
                    Buy Now
                  </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



      <style jsx>{`
        /* Hide the default navigation buttons */
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }

        /* Make the arrows visible on hover */
        .swiper:hover .swiper-button-prev,
        .swiper:hover .swiper-button-next {
          display: block;
          opacity: 1;
        }

        /* Style the arrows */
        .swiper-button-prev,
        .swiper-button-next {
          width: 40px;
          height: 40px;
          background-color: white;
          border-radius: 50%;
          color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          z-index: 10;
        }

        /* Position the arrows */
        .swiper-button-prev {
          left: 10px;
        }

        .swiper-button-next {
          right: 10px;
        }
      `}</style>
      <Footer/>
    </div>
  );
};

export default CarouselComponent;
