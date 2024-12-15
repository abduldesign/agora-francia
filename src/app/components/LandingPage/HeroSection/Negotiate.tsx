



import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Negotiate = () => {
  const [showModal, setShowModal] = useState(false);
  const [offer, setOffer] = useState<string>(''); // Initialize as an empty string
  const [negotiationCount, setNegotiationCount] = useState(0);
  const [sellerResponse, setSellerResponse] = useState('');
  const [finalPrice, setFinalPrice] = useState<number | null>(null); // Allow for null or a number

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


  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffer(e.target.value);
  };

  const handleSubmitOffer = () => {
    if (negotiationCount < 5) {
      const counterOffer = Math.random() > 0.5 ? 'accepted' : 'counter';
      setSellerResponse(counterOffer === 'accepted' ? 'Seller accepted your offer' : 'Seller made a counteroffer');
      setNegotiationCount(negotiationCount + 1);
      if (counterOffer === 'accepted') {
        setFinalPrice(parseInt(offer, 10)); // Convert offer string to number
        setShowModal(false); // Close the modal when offer is accepted
      }
    } else {
      setSellerResponse('Negotiation ended: Maximum offers reached');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNegotiationCount(0);
    setSellerResponse('');
  };

  return (
    <div className="w-full py-2">
      <div>
        <div className="bg-red-700 flex items-center justify-between px-4 py-2 rounded-t-lg">
          <h2 className="text-white text-lg font-bold">Negotiation Offer</h2>
        </div>
        <div className="bg-white shadow-xl rounded-lg shadow-neutral-500/50 py-10">
          <div className="container mx-auto px-4 mt-4">
            <Swiper spaceBetween={20} slidesPerView={4} loop={true}>
              {cardBid.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-dark shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 relative">
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
                          onClick={() => setShowModal(true)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Negotiate
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Set Your Offer</h2>
            <p>Enter your offer price for the item:</p>
            <input
              type="number"
              value={offer}
              onChange={handleOfferChange}
              className="border p-2 rounded w-full my-4"
              placeholder="Enter your offer"
            />
            <div className="text-center">
              <button
                onClick={handleSubmitOffer}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Submit Offer
              </button>
              <button
                onClick={handleCloseModal}
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
            {sellerResponse && (
              <div className="mt-4 text-center text-gray-700">
                <p>{sellerResponse}</p>
              </div>
            )}
            {finalPrice && (
              <div className="mt-4 text-center text-green-600">
                <p>Final price agreed: ₦{finalPrice}</p>
              </div>
            )}
            {negotiationCount >= 5 && !finalPrice && (
              <div className="mt-4 text-center text-red-600">
                <p>Negotiation ended: Maximum 5 offers reached.</p>
              </div>
            )}
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
      `}</style>
    </div>
  );
};

export default Negotiate;

