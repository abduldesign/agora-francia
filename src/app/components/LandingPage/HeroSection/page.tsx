import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BidButton from './BidButton';
import Negotiate from './Negotiate';

const CarouselComponent = () => {
  const items = [
    {
      title: 'Shop with Agora Francia ',
      description:
        'Buy, sell, and negotiate prices on a variety of products',
      image: 'https://ik.imagekit.io/amazonaga12345/ozonebanner4.png?updatedAt=1733992613189',
    },
    {
      title: 'Discover our Beauty Selection',
      description: 'Explore a collection of premium products at affordable price.',
      image: 'https://ik.imagekit.io/amazonaga12345/bannerozonee.png?updatedAt=1733995750572',
    },
    // Add more items here...
  ];

  const cardItems = [
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/Blueetooth_Headphone.png?updatedAt=1668162400881',
      description: 'Accessories & sound system',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/V238940049_IN_PC_BAU_Edit_Creation_Laptops2X._SY608_CB667377204_.jpg?updatedAt=1667243623423',
      description: ' TV & Home Appliances Deal',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/Solar_Power.jpg?updatedAt=1668162396232',
      description: 'Solar Panel & equipment',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/for_your_fit.jpg?updatedAt=1668164277266',
      description: 'Gym equipment',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/homeTouch_Stainless_Stell.jpg?updatedAt=1668162395706',
      description: 'New on Arrival',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/Computers.jpg?updatedAt=1668162395936',
      description: 'Computers & Gaming Laptop',
    },
  ];


  const cardSpecial = [
    {
      image: 'https://ik.imagekit.io/amazonaga12345/Men_s_sweater/61XctAMNuuL._AC_UL480_QL65_.jpg?updatedAt=1668180550312',
      description: 'Best deal of the month',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/Men_s_sweater/71SDmUquOJL._AC_UL480_FMwebp_QL65_.webp?updatedAt=1668180548487',
      description: ' special offers for all',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/smart_watch.webp?updatedAt=1668164277438',
      description: 'top deal of the year',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/watch.webp?updatedAt=1668164277170',
      description: 'todays selection',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wpns.webp?updatedAt=1668165057378',
      description: 'New on Arrival',
    },
    {
      image: 'https://ik.imagekit.io/amazonaga12345/amazon-image/wt3.webp?updatedAt=1668165058875',
      description: 'best selling product',
    },
  ];
  
  // Flash sales products (extend with more items)
const cardFlash = [
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
const cardBid = [
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
]


  return (
    <div className="w-full py-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 5000, // Time between each slide in milliseconds (5 seconds)
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        speed={1000} // Time it takes to transition between slides in milliseconds (1 second)
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full">
            {/* Image Background with top margin */}
            <div className="relative w-full h-full">
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-md mt-4 z-10"
              />
            </div>

            {/* Text Content */}
            <div className="absolute top-[60%] left-8 transform -translate-y-1/2 z-20 text-white">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-lg">{item.description}</p>

              {/* Shop Now Button for the first slide */}
              {index === 0 && (
                <button className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                  Shop Now
                </button>
              )}

              {/* Explore Now Button for the second slide */}
              {index === 1 && (
                <button className="mt-8 px-6 py-2 border-2 border-red-600 text-red font-semibold rounded-md hover:bg-red-600">
                  Explore Now
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
           
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



<div>
      <div className="mt-3 bg-red-700 flex items-center justify-between px-4 py-2 rounded-t-lg">
        <h2 className="text-white text-lg font-bold">Flash Sales</h2>
        <p className="text-lg text-white">Time Left:</p>
        <a href="/flash-sales" className="text-white text-sm font-semibold underline hover:no-underline">
          See All
        </a>
      </div>
      <div className="bg-white shadow-xl rounded-lg shadow-neutral-500/50 py-10">
        <div className="container mx-auto px-4 mt-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="swiper-container"
          >
            {cardFlash.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-dark shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 relative">
                  {/* Discount Badge */}
                  {index < 4 && (
                    <div className={`absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-sm`}>
                      {index === 0
                        ? '-50%'
                        : index === 1
                        ? '-25%'
                        : index === 2
                        ? '-15%'
                        : '-10%'}
                    </div>
                  )}
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
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
 {/* New Component Section */}
 <div className="mt-3 bg-white shadow-xl rounded-lg shadow-neutral-500/50 py-10">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {cardSpecial.map((item, index) => (
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
           
          </div>
        </div>
      ))}
    </div>
  </div>
  
</div>
<div>
<BidButton/>
</div>
<div>
  <Negotiate/>
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
    </div>
  );
};

export default CarouselComponent;
