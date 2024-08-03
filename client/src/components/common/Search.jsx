import { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

const countries = [
  'USA',
  'India',
  'Australia',
  'Canada',
  'Japan',
  'France',
  'Italy',
  'Spain',
  'Germany',
  'Thailand',
  'China',
  'Greece',
  'Mexico',
  'Turkey',
  'Brazil',
  'Netherlands',
  'Switzerland',
  'Korea',
  'Egypt',
  'Singapore',
  'Indonesia',
  'New Zealand',
  'Africa',
  'Portugal',
  'Malaysia',
  'Vietnam',
  'Russia',
  'Morocco'
];

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    onSearch({ searchTerm, selectedCountries });
  }, [searchTerm, selectedCountries]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 30);
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    startScrolling();

    scrollContainer.addEventListener('mouseenter', stopScrolling);
    scrollContainer.addEventListener('mouseleave', startScrolling);

    return () => {
      stopScrolling();
      scrollContainer.removeEventListener('mouseenter', stopScrolling);
      scrollContainer.removeEventListener('mouseleave', startScrolling);
    };
  }, []);

  const handleCountryToggle = (country) => {
    setSelectedCountries((prev) => {
      const newSelection = prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country];
      return newSelection;
    });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, selectedCountries });
  };

  return (
    <main className="">
      <form onSubmit={handleSubmit}>
        <section className="flex gap-2 sm:gap-4 items-center justify-between px-5 xl:px-10">
          <div className="relative w-full">
            <label
              htmlFor="trip-name"
              className="absolute top-[-10px] left-4 bg-black text-xs rounded-full text-white px-4 py-1">
              LOCATION
            </label>
            <input
              type="text"
              id="trip-location"
              placeholder="Search for locations here ..."
              className="border border-black rounded-2xl px-5 py-4 block w-full outline-none placeholder-neutral-500 placeholder:font-normal"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <button
            type="submit"
            className="bg-primary-400 h-[3.65rem] text-white grid place-items-center font-medium rounded-2xl px-6 max-sm:px-4 ">
            <span className="hidden sm:block">SEARCH</span>
            <span className="hidden max-sm:block text-2xl">
              <FiSearch />
            </span>
          </button>
        </section>
      </form>

      <section
        ref={scrollRef}
        className="relative overflow-hidden mt-8 mb-4"
        style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-2 items-center whitespace-nowrap">
          {[...countries, ...countries].map((country, index) => (
            <div key={`${country}-${index}`} className="flex-shrink-0">
              <button
                className={`px-4 py-2 rounded-full uppercase border border-black text-sm font-medium ${
                  selectedCountries.includes(country) ? 'bg-primary-400 text-white' : ' text-black'
                }`}
                onClick={() => handleCountryToggle(country)}>
                {country}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
