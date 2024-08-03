import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { createApi } from 'unsplash-js';
import ImagePreviewModal from '../components/modals/ImagePreviewModal.jsx';

import {
  fetchPostByIdAsync,
  selectCurrentPost,
  selectCurrentPostStatus,
  addCommentAsync
} from '../features/posts/postSlice.js';
import { selectUser } from '../features/auth/authSlice.js';
import Loading from '../components/common/Loading.jsx';
import PageNotFound from './PageNotFound.jsx';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
});

export default function PostDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const currentPost = useSelector(selectCurrentPost);
  const currentPostStatus = useSelector(selectCurrentPostStatus);
  const user = useSelector(selectUser);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchUnsplashImages = async () => {
      try {
        const result = await unsplash.search.getPhotos({
          query: currentPost.title,
          page: 1,
          perPage: 5
        });
        if (result.type === 'success') {
          const imageUrls = result.response.results.map((photo) => photo.urls.regular);
          setUnsplashImages(imageUrls);
        }
      } catch (error) {
        console.error('Error fetching Unsplash images:', error);
      }
    };

    if (currentPost?.title) {
      fetchUnsplashImages();
    }
  }, [currentPost]);

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const closePreviewModal = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && unsplashImages.length > 0) {
      const scrollAnimation = () => {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
        requestAnimationFrame(scrollAnimation);
      };
      const animationId = requestAnimationFrame(scrollAnimation);
      return () => cancelAnimationFrame(animationId);
    }
  }, [unsplashImages]);

  useEffect(() => {
    if (params.id && (!currentPost || currentPost._id !== params.id)) {
      dispatch(fetchPostByIdAsync(params.id));
    }
  }, [dispatch, params.id, currentPost]);

  if (currentPostStatus === 'loading' && !currentPost) return <Loading />;
  if (!currentPost) return <PageNotFound />;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && user) {
      dispatch(
        addCommentAsync({
          postId: currentPost._id,
          comment: {
            text: commentText,
            username: user.result.name,
            profilePic: user.result.picture
          }
        })
      ).unwrap();
    }
  };

  return (
    <main className="pt-16">
      {previewImage && <ImagePreviewModal imageUrl={previewImage} onClose={closePreviewModal} />}
      <section>
        <figure className="relative w-full h-[80vh] max-sm:h-[60vh]">
          <img
            src={currentPost.thumbnail}
            className="h-full w-full object-cover cursor-pointer"
            onClick={() => handleImageClick(currentPost.thumbnail)}
          />
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white"></div>
          {unsplashImages.length > 0 ? (
            <div
              ref={scrollRef}
              className="absolute md:bottom-48 max-sm:bottom-24 flex gap-2 overflow-x-hidden whitespace-nowrap w-full">
              {[...unsplashImages, ...unsplashImages].map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  className="inline-block min-w-40 w-40 rounded-full border border-neutral-700 object-cover h-16 shadow-2xl cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          ) : (
            <div>Loading images...</div>
          )}
        </figure>
        <section className="relative transform -translate-y-[10rem] max-sm:-translate-y-[3.5rem] lg:mx-24 md:mx-5 mx-0 lg:py-11 lg:px-10 md:p-10 sm:py-8 sm:px-5 px-5 py-8 lg:rounded-t-[3rem] md:rounded-t-[2.5rem] rounded-t-[1.5rem] bg-white border-top">
          <div
            className="absolute top-0 right-0 w-full h-24 z-[-1]  lg:rounded-t-[3rem] md:rounded-t-[2.5rem] rounded-t-[1.5rem]"
            style={{ boxShadow: '0 -10px 5px  rgba(0, 0, 0, 0.2)' }}></div>
          <Link
            to="/"
            className="md:mb-8 mb-5 text-base font-semibold h-10 flex gap-2 items-center border border-black bg-neutral-200 w-fit px-5 rounded-full">
            <span className="h-10 flex items-center">
              <svg width="55" height="12" viewBox="0 0 55 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.292889 7.29289C-0.0976349 7.68342 -0.0976349 8.31658 0.292889 8.70711L6.65685 15.0711C7.04737 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07106 2.34315C8.46159 1.95262 8.46159 1.31946 8.07106 0.928932C7.68054 0.538408 7.04737 0.538408 6.65685 0.928932L0.292889 7.29289ZM55 7L0.999996 7V9L55 9V7Z"
                  fill="black"
                />
              </svg>
            </span>
            GO BACK
          </Link>

          {/*//* Post Details */}
          <h1 className="text-4xl font-bold mb-4">{currentPost.title}</h1>
          <p className="mb-6 text-sm uppercase font-medium">
            <span className="font-semibold">Tags: </span>
            {currentPost.tags.join(' \\ ')}
          </p>
          <p className="mb-4 text-lg">{currentPost.description}</p>
          <div className="mb-6 text-sm">
            <p>
              Created by: <span className="font-medium">{currentPost.username || 'Anonymous'}</span>
            </p>
            <p>
              Posted on: <span className="font-medium">{new Date(currentPost.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          {/* //* Activities */}
          <div className="mb-6">
            {currentPost.activities.length > 0 && (
              <>
                <h3 className="text-2xl font-bold mb-2">Activities:</h3>
                {currentPost.activities.map((activity, idx) => (
                  <ul key={idx} className="mb-1 ml-8 list-disc ">
                    <li>{activity}</li>
                  </ul>
                ))}
              </>
            )}
          </div>

          {/* //* Google Map Preview */}
          {currentPost.googleMap && (
            <div className="my-4">
              <h3 className="text-2xl font-bold mb-4">Location:</h3>
              <div className="border border-neutral-500 overflow-hidden rounded-2xl">
                <iframe
                  title="Google Map"
                  src={currentPost.googleMap}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          )}

          {/* //* Comments */}
          <div className="relative mt-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Comments:</h3>
            <div className="bg-neutral-200 rounded-2xl border border-neutral-500 overflow-hidden">
              {user && (
                <form onSubmit={handleCommentSubmit} className="relative p-1">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full h-12 px-5 outline-none placeholder:text-neutral-600 border border-neutral-500 rounded-[12px] bg-neutral-300"
                  />
                  <button
                    type="submit"
                    className="rounded-[10px] h-10 absolute right-[8px] top-[8px] bg-primary-400 text-white px-5 font-medium flex items-center">
                    Submit Comment
                  </button>
                </form>
              )}

              <div className="w-full">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 1
                    },
                    768: {
                      slidesPerView: 1
                    }
                  }}
                  pagination={{ clickable: true }}
                  style={{
                    '--swiper-pagination-color': '#000000',
                    '--swiper-pagination-bullet-inactive-color': '#000000',
                    '--swiper-navigation-color': '#000000',
                    '--swiper-navigation-size': '1.5rem'
                  }}>
                  {currentPost.comments.map((comment, index) => (
                    <SwiperSlide key={index}>
                      <div className="py-5 pb-10 mx-5">
                        <div className="flex items-center mb-2">
                          <img
                            src={comment.profilePic}
                            alt={comment.username}
                            className="rounded-full mr-2 h-10 w-10 object-cover"
                          />
                          <div>
                            <p className="font-medium">{comment.username}</p>
                            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="mt-2">{comment.text}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
