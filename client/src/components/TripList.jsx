import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPostsAsync,
  fetchPostByIdAsync,
  selectPosts,
  selectStatus,
  deletePostsAsync
} from '../features/posts/postSlice.js';
import Loading from './Loading.jsx';
import { RiBrush2Fill } from 'react-icons/ri';
import { BsFillTrash2Fill } from 'react-icons/bs';
import { IoHeart } from 'react-icons/io5';
import EditTripModal from './EditTripModal.jsx';
import { Link } from 'react-router-dom';

export default function TripList() {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  // const postById = useSelector(selectPostById);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const posts = useSelector(selectPosts);
  const postStatus = useSelector(selectStatus);

  // console.log(posts);

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
          {posts.map((trip) => (
            <div
              key={trip._id}
              className="relative border border-black rounded-2xl min-w-[300px] flex flex-col justify-between">
              <Link to={`/location-detail/${trip._id}`} className="block">
                <div className="p-3 flex items-center justify-between">
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
                </div>
                <figure className="border border-y-black border-x-0 aspect-[6/4] overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={trip.thumbnail || 'https://via.placeholder.com/600x400'}
                    alt="Thumbnail"
                  />
                </figure>
                <div className="px-3 py-5">
                  <div className="flex gap-2 items-center text-xs uppercase font-medium">
                    TAGS:
                    <span className="text-neutral-500">{trip.tags.join(' / ')}</span>
                  </div>
                  <h3 className="text-lg font-semibold py-1">{trip.title}</h3>
                  <p className="line-clamp-2 text-neutral-600 text-sm font-normal">{trip.description}</p>
                </div>
              </Link>
              <LikeEdit trip={trip} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          ))}
        </>
      )}
      {showEditModal && <EditTripModal setShowEditModal={setShowEditModal} postId={selectedPostId} />}
    </section>
  );
}

const LikeEdit = ({ trip, handleEdit, handleDelete }) => {
  return (
    <div className="border border-b-0 border-x-0 border-t-black p-3 flex items-center justify-between flex-end">
      <div className="flex h-9 items-center rounded-full bg-red-500 hover:bg-red-600 cursor-pointer">
        <button className="grid place-items-center text-white pl-3">
          <IoHeart />
        </button>
        <span className="bg-red-300 h-1 w-1 rounded-full mx-1.5"></span>
        <span className="text-white pr-4 text-md font-bold">{trip.likeCount || 0}</span>
      </div>

      <div className="flex gap-1 items-center justify-center">
        <button
          onClick={() => handleEdit(trip._id)}
          className="h-9 w-9 grid place-items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full">
          <RiBrush2Fill />
        </button>
        <button
          onClick={() => handleDelete(trip._id)}
          className="h-9 w-9 grid place-items-center bg-red-500 hover:bg-red-600 text-white rounded-full">
          <BsFillTrash2Fill />
        </button>
      </div>
    </div>
  );
};
