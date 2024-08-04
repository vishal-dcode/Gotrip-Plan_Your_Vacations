import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiBrush2Fill } from 'react-icons/ri';
import { BsFillTrash2Fill } from 'react-icons/bs';

import Loading from '../../../components/common/Loading.jsx';
import UpdatePostModal from '../../../components/modals/UpdatePostModal.jsx';
import { fetchAllPostsAsync, fetchPostByIdAsync, selectPosts, selectStatus, deletePostsAsync } from '../postSlice.js';
import { selectUser } from '../../auth/authSlice.js';

export default function PostGrid({ currentPosts }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (tripId) => {
    setLoadedImages((prev) => ({ ...prev, [tripId]: true }));
  };

  const posts = useSelector(selectPosts);
  const postStatus = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  const handleEdit = (id) => {
    setSelectedPostId(id);
    dispatch(fetchPostByIdAsync(id));
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePostsAsync(id));
    }
  };

  return (
    <section
      className="px-5 xl:px-10 py-5 grid gap-5"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {postStatus === 'loading' ? (
        <div className=" flex items-center justify-center py-10">
          <Loading />
        </div>
      ) : (
        <>
          {currentPosts.map((trip) => (
            <div
              key={trip._id}
              className="relative border border-black rounded-2xl min-w-[300px] flex flex-col justify-between overflow-hidden">
              <div className="block">
                <div className="p-4 py-3 flex items-center justify-between">
                  <div className="flex gap-3 items-center justify-between">
                    <img
                      className="h-10 w-10 rounded-full object-cover border border-black"
                      src={trip.profilePic || 'https://via.placeholder.com/150'}
                      alt="Profile Pic"
                    />
                    <div className="leading-5">
                      <h3 className="font-medium">{trip.username || 'Anonymous'}</h3>
                      <p className="text-neutral-500 text-xs">{trip.createdAt?.split('T')[0] || 'No date available'}</p>
                    </div>
                  </div>
                  {user && user.result.email === 'vishalvish4225@gmail.com' && (
                    <LikeEditDelete trip={trip} handleEdit={handleEdit} handleDelete={handleDelete} />
                  )}
                </div>
                <figure className="border border-y-black border-x-0 aspect-[6/4] overflow-hidden">
                  {!loadedImages[trip._id] && <div className="w-full h-full bg-neutral-200 animate-pulse"></div>}
                  <img
                    className={`w-full h-full object-cover object-center ${
                      loadedImages[trip._id] ? 'block' : 'hidden'
                    }`}
                    src={trip.thumbnail || 'https://via.placeholder.com/600x400'}
                    alt="Thumbnail"
                    onLoad={() => handleImageLoad(trip._id)}
                  />
                </figure>
                <div className="px-4 py-5">
                  <div className="flex gap-2 items-center text-xs uppercase font-medium">
                    TAGS:
                    <span className="line-clamp-1 text-neutral-500">{trip.tags.join(' \\ ')}</span>
                  </div>
                  <h3 className="text-lg font-semibold py-1">{trip.title}</h3>
                  <p className="line-clamp-3 text-neutral-600 text-sm font-normal">{trip.description}</p>
                </div>
              </div>
              <Link to={`/location-detail/${trip._id}`} className="flex items-center justify-between px-4 pb-4">
                {trip.comments?.length < 1 ? (
                  <span className="rounded-full whitespace-nowrap border border-black text-black font-medium text-sm px-5 py-3 text-center">
                    No Comments
                  </span>
                ) : (
                  ''
                )}
                <div className="flex">
                  {trip.comments
                    ?.slice(-4)
                    .reverse()
                    .map((comment, index) => (
                      <div
                        key={comment._id || index}
                        className="h-10 w-10 overflow-hidden rounded-full border border-black"
                        style={{
                          zIndex: 4 + index,
                          transform: index > 0 ? `translateX(-${index}rem)` : 'none'
                        }}>
                        <img
                          src={comment.profilePic || 'https://via.placeholder.com/150'}
                          alt={`Commentor ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
                <div className="rounded-full whitespace-nowrap bg-primary-400 hover:bg-primary-400 text-white font-medium text-sm px-5 py-3 text-center">
                  Read more
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
      {showEditModal && <UpdatePostModal setShowEditModal={setShowEditModal} postId={selectedPostId} />}
    </section>
  );
}

const LikeEditDelete = ({ trip, handleEdit, handleDelete }) => {
  return (
    <div className="flex items-center justify-between flex-end">
      <div className="flex gap-1 items-center justify-center">
        <button
          onClick={() => handleEdit(trip._id)}
          className="h-10 w-10 grid place-items-center border border-black hover:bg-blue-500 text-black rounded-full">
          <RiBrush2Fill />
        </button>
        <button
          onClick={() => handleDelete(trip._id)}
          className="h-10 w-10 grid place-items-center border border-black hover:bg-red-500 text-black rounded-full">
          <BsFillTrash2Fill />
        </button>
      </div>
    </div>
  );
};
