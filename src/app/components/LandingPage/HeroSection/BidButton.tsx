import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type CardItem = {
  image: string;
  description: string;
  price: string;
};

const BidButton = () => {
  // Type the cardBid array with an explicit type
  const cardBid: CardItem[] = [
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
      description: 'Unique Sweater for men',
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

  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);

  const handleBidClick = (item: CardItem) => {
    setSelectedItem(item);  // Set the selected item when the bid button is clicked
  };

  const handleCancel = () => {
    setSelectedItem(null); // Close the modal by setting selectedItem to null
  };

  return (
    <div className="w-full py-3">
      <div>
        <div className=" bg-red-700 flex items-center justify-between px-4 py-2 rounded-t-lg">
          <h2 className="text-white text-lg font-bold">Best Offer</h2>
          <p className="text-lg text-white">26 December to 20 December</p>
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
              {cardBid.map((item, index) => (
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
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => handleBidClick(item)}  // Set the item as selected
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Bid Now
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 z-50">
            <h2 className="text-lg font-bold mb-4">Place Your Bid</h2>
            <p className="mb-4">You're bidding on: {selectedItem.description}</p>
            <p className="mb-4">Current Price: ₦{selectedItem.price}</p>
            <label htmlFor="maxBid" className="block mb-2">Maximum Bid</label>
            <input
              id="maxBid"
              type="number"
              placeholder="Enter your maximum bid"
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCancel}  // Cancel the modal by resetting selectedItem
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
                Place Bid
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }

        .swiper:hover .swiper-button-prev,
        .swiper:hover .swiper-button-next {
          display: block;
          opacity: 1;
        }

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

export default BidButton;
