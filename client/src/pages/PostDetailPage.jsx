import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchPostByIdAsync, selectCurrentPost, selectCurrentPostStatus } from '../features/posts/postSlice.js';
import Loading from '../components/common/Loading.jsx';
import PageNotFound from './PageNotFound.jsx';

const fallbackImages = [
  'https://via.placeholder.com/1280x720?text=Fallback+Image+1',
  'https://via.placeholder.com/1280x720?text=Fallback+Image+2',
  'https://via.placeholder.com/1280x720?text=Fallback+Image+3'
];
const imageGenerators = [
  (title) => `https://picsum.photos/seed/${encodeURIComponent(title)}/1280/720`,
  (title) => `https://picsum.photos/seed/${encodeURIComponent(title)}-hd/1280/720`,
  (title) => `https://picsum.photos/seed/${encodeURIComponent(title)}-4k/1280/720`
];
const commentsSection = [
  {
    image: 'https://i.pinimg.com/564x/ef/b5/aa/efb5aa768e149f5d4c04e66a1e9810ab.jpg',
    name: 'John Doe',
    date: new Date().toLocaleDateString(),
    comment:
      "Great post! I really enjoyed reading this while relaxing on the beach in Hawaii. The insights you've shared are very valuable and applicable to my upcoming trip to Europe."
  },
  {
    image: 'https://i.pinimg.com/564x/2e/64/41/2e64411b285cafdf75d33cd9605c3f44.jpg',
    name: 'Jane Smith',
    date: new Date().toLocaleDateString(),
    comment:
      'I have a question about the third point you made while visiting the top of the Empire State Building. Could you elaborate on that a bit more as I plan my trip to the Statue of Liberty?'
  },
  {
    image: 'https://i.pinimg.com/564x/c2/88/5b/c2885bb7d30c39a67dadc71a52d167fe.jpg',
    name: 'Alex Johnson',
    date: new Date().toLocaleDateString(),
    comment:
      'This is exactly what I was looking for while taking in the breathtaking views of Yosemite. Thanks for sharing your expertise on this topic as I plan my next hiking trip to Zion National Park!'
  },
  {
    image: 'https://i.pinimg.com/564x/15/7c/a4/157ca450b4763fdc7386c8bb56f5268e.jpg',
    name: 'Emily Davis',
    date: new Date().toLocaleDateString(),
    comment:
      'I just got back from a trip to Italy, and your tips on local cuisine were spot on! I had the best pasta in Rome!'
  },
  {
    image: 'https://i.pinimg.com/564x/df/fd/ab/dffdab51c07a00a62a0c13fd02aadbc8.jpg',
    name: 'Michael Brown',
    date: new Date().toLocaleDateString(),
    comment:
      'Thanks for the great advice! I’m heading to Cancun next month, and your recommendations for activities are super helpful!'
  },
  {
    image: 'https://i.pinimg.com/564x/b3/7c/ad/b37cad72e0c0a258d50de8f3fcc32c9d.jpg',
    name: 'Sarah Wilson',
    date: new Date().toLocaleDateString(),
    comment:
      'I loved your post! It brought back memories of my backpacking trip through Thailand and Vietnam. Any tips for first-time travelers?'
  },
  {
    image: 'https://i.pinimg.com/564x/f8/43/3e/f8433e97fd1ff7b8ed117131c93bac22.jpg',
    name: 'David Lee',
    date: new Date().toLocaleDateString(),
    comment:
      'Awesome insights! I’m planning a road trip across the USA this summer. What’s your favorite stop along the way?'
  },
  {
    image: 'https://i.pinimg.com/564x/8d/6e/2e/8d6e2e657db8fafaf2ef0e56821035d3.jpg',
    name: 'Laura Green',
    date: new Date().toLocaleDateString(),
    comment:
      'Your post was so inspiring! I just booked a trip to the Canadian Rockies. Any must-see spots you recommend?'
  }
];
export default function PostDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const currentPost = useSelector(selectCurrentPost);
  const currentPostStatus = useSelector(selectCurrentPostStatus);

  useEffect(() => {
    if (params.id && (!currentPost || currentPost._id !== params.id)) {
      dispatch(fetchPostByIdAsync(params.id));
    }
  }, [dispatch, params.id, currentPost]);

  // ? generate images
  useEffect(() => {
    if (currentPost && currentPost.title) {
      const newImages = imageGenerators.map((generator) => generator(currentPost.title));
      setImages([currentPost.thumbnail, ...newImages]);
      setMainImage(currentPost.thumbnail);
    }
  }, [currentPost]);
  // ? generate images
  const handleImageError = (index) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = fallbackImages[index % fallbackImages.length];
      return newImages;
    });
  };
  // ? generate images
  const swapImage = (index) => {
    setMainImage(images[index]);
    setImages((prev) => {
      const newImages = [...prev];
      [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
      return newImages;
    });
  };

  if (currentPostStatus === 'loading' && !currentPost) return <Loading />;
  if (!currentPost) return <PageNotFound />;

  return (
    <main className="px-5 mt-24 py-10 md:px-10 md:py-20 xl:p-20 flex items-center justify-center">
      <section className="lg:max-w-[950px] xl:max-w-[1200px]">
        <div className="relative flex flex-col lg:flex-row gap-4 mb-5 lg:mb-8 border border-black rounded-2xl">
          <motion.div className="flex-grow" layout transition={{ duration: 0.5 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt="Main"
                className="block w-full h-[50vh] sm:h-[60vh] object-cover rounded-2xl z-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onError={() => handleImageError(0)}
              />
            </AnimatePresence>
            <div className="w-full h-[50vh] sm:h-[60vh] bg-black/20 absolute top-0 left-0 rounded-2xl z-[-1]"></div>
          </motion.div>
          <div className="absolute flex flex-row lg:flex-col bottom-2 right-2 gap-2 lg:top-0 lg:right-[-6.5rem]">
            {images.slice(1).map((img, index) => (
              <motion.img
                key={img}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 object-cover cursor-pointer border border-black rounded-lg"
                onClick={() => swapImage(index + 1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onError={() => handleImageError(index + 1)}
              />
            ))}
          </div>
        </div>

        <section className="p-0 sm:p-5 lg:p-10">
          <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1>
          <p className="mb-2">Tags: {currentPost.tags.join(', ')}</p>
          <p className="mb-4">{currentPost.description}</p>
          <div className="mb-4 text-sm">
            <p>
              Created by: <span className="font-medium">{currentPost.username || 'Anonymous'}</span>
            </p>
            <p>
              Posted on: <span className="font-medium">{new Date(currentPost.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          {/* Comments */}
          <div className="relative mt-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Comments</h3>

            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              breakpoints={{
                600: {
                  slidesPerView: 1
                },
                700: {
                  slidesPerView: 2
                },
                1100: {
                  slidesPerView: 3
                }
              }}
              pagination={{ clickable: true }}
              style={{
                '--swiper-pagination-color': '#000000',
                '--swiper-pagination-bullet-inactive-color': '#000000',
                '--swiper-navigation-color': '#000000',
                '--swiper-navigation-size': '1.5rem'
              }}
              className="max-w-[80vw] lg:max-w-[80vw] xl:max-w-[80vw]">
              {commentsSection.map((comment, index) => (
                <SwiperSlide key={index}>
                  <div className="py-5 pb-14">
                    <div className="flex items-center mb-2">
                      <img
                        src={comment.image}
                        alt={comment.name}
                        className="rounded-full mr-2 h-10 w-10 object-cover"
                      />
                      <div>
                        <p className="font-medium">{comment.name}</p>
                        <p className="text-sm text-gray-500">{comment.date}</p>
                      </div>
                    </div>
                    <p className="mt-2">{comment.comment}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </section>
    </main>
  );
}
