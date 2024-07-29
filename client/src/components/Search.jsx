import { RiSearch2Line } from 'react-icons/ri';

export default function Search() {
  return (
    <section className="flex gap-2 items-center justify-between px-5 xl:px-10">
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
        />
      </div>
      <div className="relative w-full">
        <label
          htmlFor="trip-name"
          className="absolute top-[-10px] left-4 bg-black text-xs rounded-full text-white px-4 py-1">
          TAGS
        </label>
        <input
          type="text"
          id="trip-location"
          placeholder="Search for tags here ..."
          className="border border-black rounded-2xl px-5 py-4 block w-full outline-none placeholder-neutral-500 placeholder:font-normal"
        />
      </div>
      <button className=" bg-primary-400 text-white grid place-items-center rounded-2xl h-[59px] min-w-[59px]">
        <RiSearch2Line className="text-2xl" />
      </button>
    </section>
  );
}
