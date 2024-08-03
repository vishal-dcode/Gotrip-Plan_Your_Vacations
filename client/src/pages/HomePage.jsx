import { useEffect, useState } from 'react';

import HeroSection from '../components/common/HeroSection.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Search from '../components/common/Search.jsx';
import PostGrid from '../features/posts/containers/PostGrid.jsx';
import AddPost from '../features/posts/containers/AddPost.jsx';
import AddPostModal from '../components/modals/AddPostModal.jsx';
import { useSelector } from 'react-redux';
import { selectPosts } from '../features/posts/postSlice.js';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posts = useSelector(selectPosts);

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = ({ searchTerm, selectedCountries }) => {
    const filtered = posts.filter(
      (post) =>
        (searchTerm === '' || post.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCountries.length === 0 || selectedCountries.some((country) => post.tags.includes(country)))
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  return (
    <main className="mt-24">
      <HeroSection />
      <main
        className="relative grid max-md:block"
        style={{
          gridTemplateColumns: 'minmax(15rem, 30%) 1fr'
        }}>
        <section className="h-fit sticky top-[80px] max-md:hidden">
          {/* //! AddPost */}
          <AddPost />
        </section>
        <section className="overflow-hidden min-h-[100vh] flex flex-col justify-between border border-l-black max-md:border-l-0 border-y-0 border-r-0">
          <div>
            <div className="px-5 xl:px-10 py-10 xl:pt-20 gap-2 flex items-center justify-between max-md:flex-col max-md:items-start">
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold pb-1">Discover Trips</h2>
                <p className="text-sm text-neutral-800 font-normal">
                  Explore New Adventures and Find Your Perfect Getaway
                </p>
              </div>
              <p className="text-sm text-right w-[36ch] max-md:text-left max-md:w-full">
                Discover more about our curated travel experiences and unique vacation spots!
              </p>
            </div>
            {/* //! Search */}
            <Search handleSearch={handleSearch} />
            {/* //! PostGrid */}
            <PostGrid currentPosts={currentPosts} />
          </div>
          {/* //! Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
            onPageChange={paginate}
          />
        </section>
      </main>

      {/* //? Add Trip button for mobile */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-5 right-5 bg-primary-400 rounded-full p-4 shadow-lg md:hidden border border-black hover:scale-[1.05] drop-shadow-lg">
        <svg width="22" height="22" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.6917 52.9769C24.6917 54.9652 26.3011 56.5785 28.2894 56.5785C30.2777 56.5785 31.891 54.9652 31.891 52.9769V31.8869H52.977C54.9653 31.8869 56.5747 30.2736 56.5747 28.2853C56.5747 26.297 54.9653 24.6876 52.977 24.6876H31.891V3.6016C31.891 1.6133 30.2777 0 28.2894 0C26.3011 0 24.6917 1.6133 24.6917 3.6016V24.6876H3.5977C1.6094 24.6876 0 26.297 0 28.2853C0 30.2736 1.6094 31.8869 3.5977 31.8869H24.6917V52.9769Z"
            fill="white"
          />
        </svg>
      </button>

      {/* //! AddPost Modal */}
      <AddPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
