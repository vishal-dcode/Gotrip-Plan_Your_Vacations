import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostsAsync, selectCurrentPost } from '../features/posts/postSlice';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { compressImage } from '../utils/imgCompression.js';

const EditTripModal = ({ setShowEditModal, postId }) => {
  const dispatch = useDispatch();
  const currentPost = useSelector(selectCurrentPost);
  const [postData, setPostData] = useState({ title: '', description: '', tags: [], thumbnail: '' });

  const [tagInput, setTagInput] = useState('');

  const isFormValid = useCallback(() => {
    return (
      postData.title.trim() !== '' &&
      postData.description.trim() !== '' &&
      postData.thumbnail.trim() !== '' &&
      postData.tags.length > 0
    );
  }, [postData.title, postData.description, postData.thumbnail, postData.tags]);

  useEffect(() => {
    if (currentPost) {
      setPostData({
        title: currentPost.title,
        description: currentPost.description,
        tags: currentPost.tags,
        thumbnail: currentPost.thumbnail
      });
    }
  }, [currentPost]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const updatedPost = {
        ...currentPost,
        ...postData
      };
      dispatch(updatePostsAsync({ id: postId, ...updatedPost }));
      setShowEditModal(false);
    },
    [currentPost, postData, postId, dispatch, setShowEditModal]
  );
  const handleReset = useCallback(() => {
    setPostData({ title: '', description: '', tags: [], thumbnail: '' });
  }, []);

  const handleThumbnailChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPostData((prev) => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(compressedFile);
    }
  }, []);

  const addTag = useCallback(() => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !postData.tags.includes(trimmedTag) && postData.tags.length < 5) {
      setPostData((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTagInput('');
    }
  }, [tagInput, postData.tags]);

  const removeTag = useCallback((tagToRemove) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove)
    }));
  }, []);

  return (
    <div className="fixed z-50 p-5 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex p-4 pl-5 justify-between items-center border-bottom">
          <h2 className="text-2xl font-bold">Edit Trip</h2>
          <div
            onClick={() => setShowEditModal(false)}
            className="bg-red-400 text-2xl text-white p-1 w-fit rounded-full cursor-pointer hover:bg-red-500">
            <IoClose />
          </div>
        </div>

        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="p-5">
              <input
                type="text"
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                placeholder="Update title here ..."
                className="w-full border-bottom px-5 py-4 placeholder-neutral-500 placeholder:font-normal mb-2 outline-none"
              />
              <textarea
                name="description"
                rows="3"
                value={postData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full border-bottom px-5 py-4 placeholder-neutral-500 placeholder:font-normal mb-2 outline-none"
              />
              <div className="relative pb-3">
                <div className="flex flex-wrap items-center border-bottom px-5 py-4">
                  {postData.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded-full mr-2 text-sm">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-2 text-red-500">
                        ×
                      </button>
                    </span>
                  ))}
                  {postData.tags.length < 5 && (
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      onBlur={addTag}
                      placeholder={postData.tags.length < 1 ? 'Add tag (press Enter or comma to add)' : ''}
                      className="flex-grow outline-none placeholder-neutral-500 placeholder:font-normal"
                    />
                  )}
                </div>
                {postData.tags.length >= 5 && (
                  <p className="text-red-500 text-sm mt-1">Maximum number of tags reached (5)</p>
                )}
              </div>
              <div className="relative mt-3 pb-3">
                <label
                  htmlFor="thumbnail-upload"
                  className="flex flex-col items-center justify-center border border-dashed border-black rounded-sm overflow-hidden w-full h-44 bg-white cursor-pointer">
                  <input
                    type="file"
                    id="thumbnail-upload"
                    className="hidden"
                    onChange={handleThumbnailChange}
                    accept="image/jpeg,image/png"
                  />
                  {postData.thumbnail ? (
                    <div className="relative w-full h-full">
                      <img src={postData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                      <div
                        onClick={() => setPostData((prev) => ({ ...prev, thumbnail: '' }))}
                        className="absolute top-1 right-1 text-white rounded-full h-6 w-6 grid place-items-center mix-blend-difference bg-red-500">
                        X
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="border border-neutral-500 rounded-full p-3.5 border-dashed grid place-items-center">
                        <AiOutlineFileAdd className="text-3xl text-neutral-500" />
                      </span>
                      <p className="text-neutral-500 text-center mt-3 font-normal">
                        <span className="text-black font-medium">Click Here</span> to upload thumbnail
                      </p>
                      <p className="text-neutral-500 text-center mt-1 text-xs">Supported Format: JPG, PNG</p>
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={postData.thumbnail}
                  onChange={handleInputChange}
                  placeholder="Paste a link to your thumbnail"
                  className="mt-2 border border-dashed border-black rounded-sm px-5 py-4 block w-full outline-none placeholder-neutral-500 placeholder:font-normal"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end border-top px-5 py-3">
              <button type="button" onClick={handleReset} className="rounded-full bg-neutral-500 text-white h-10 px-4">
                Clear
              </button>
              <button
                type="submit"
                className={`rounded-full ${isFormValid() ? 'bg-primary-400' : 'bg-gray-400'} text-white h-10 px-4`}
                disabled={!isFormValid()}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTripModal;
