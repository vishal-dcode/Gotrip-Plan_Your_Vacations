import { useState, useCallback } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createPostsAsync } from '../features/posts/postSlice';
import { compressImage } from '../utils/imgCompression.js';

export default function AddTrip() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    username: '',
    title: '',
    description: '',
    tags: [],
    thumbnail: '',
    createdAt: ''
  });
  const [tagInput, setTagInput] = useState('');

  const isFormValid = useCallback(() => {
    return (
      postData.title.trim() !== '' &&
      postData.description.trim() !== '' &&
      postData.thumbnail.trim() !== '' &&
      postData.tags.length > 0
    );
  }, [postData.title, postData.description, postData.thumbnail, postData.tags]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const date = new Date();
      dispatch(createPostsAsync({ ...postData, createdAt: date }));
      clearForm();
    },
    [dispatch, postData]
  );

  const clearForm = useCallback(() => {
    setPostData({ username: '', title: '', description: '', tags: [], thumbnail: '' });
    setTagInput('');
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

  const handleThumbnailLinkChange = useCallback((e) => {
    setPostData((prev) => ({ ...prev, thumbnail: e.target.value }));
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
    <section className="py-10 px-5 xl:px-10 xl:py-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold pb-1">Create Your Trip</h2>
        <p className="text-sm text-neutral-800 font-normal">Add your dream destinations</p>
      </div>
      <form onSubmit={handleSubmit} className="py-10">
        <div className="relative pb-5">
          <label
            htmlFor="trip-location"
            className="absolute top-[-10px] left-4 bg-black text-xs rounded-full text-white px-4 py-1">
            LOCATION
          </label>
          <input
            type="text"
            id="trip-location"
            name="title"
            placeholder="Enter trip location here ..."
            value={postData.title}
            onChange={handleInputChange}
            className="border border-black rounded-2xl px-5 py-4 block w-full outline-none placeholder-neutral-500 placeholder:font-normal"
          />
        </div>

        <div className="relative pb-3">
          <label
            htmlFor="trip-description"
            className="absolute top-[-10px] left-4 bg-black text-xs rounded-full text-white px-4 py-1">
            DESCRIPTION
          </label>
          <textarea
            rows={4}
            id="trip-description"
            name="description"
            placeholder="Enter trip details here ..."
            value={postData.description}
            onChange={handleInputChange}
            className="border border-black rounded-2xl px-5 py-4 block w-full outline-none placeholder-neutral-500 placeholder:font-normal"
          />
        </div>

        <div className="relative pb-3">
          <div className="flex flex-wrap items-center border border-black rounded-2xl px-5 py-4">
            {postData.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full mr-2 text-sm">
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
          {postData.tags.length >= 5 && <p className="text-red-500 text-sm mt-1">Maximum number of tags reached (5)</p>}
        </div>

        <div className="relative pb-3">
          <label
            htmlFor="thumbnail-upload"
            className="flex flex-col items-center justify-center border border-black rounded-2xl overflow-hidden w-full h-44 bg-white cursor-pointer">
            <input
              type="file"
              id="thumbnail-upload"
              className="hidden"
              onChange={handleThumbnailChange}
              accept="image/jpeg,image/png"
            />
            {postData.thumbnail ? (
              <div className="relative w-full h-full">
                <img src={postData.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
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
            placeholder="Or paste a link to your thumbnail"
            value={postData.thumbnail}
            onChange={handleThumbnailLinkChange}
            className="mt-2 border border-black rounded-2xl px-5 py-4 block w-full outline-none placeholder-neutral-500 placeholder:font-normal"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="reset"
            onClick={clearForm}
            className="flex-[1] bg-black text-white rounded-2xl px-5 py-4 block w-full">
            CLEAR
          </button>
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`flex-[2] ${
              isFormValid() ? 'bg-primary-400' : 'bg-gray-400'
            }  text-white rounded-2xl px-5 py-4 block w-full`}>
            SUBMIT
          </button>
        </div>
      </form>
    </section>
  );
}
