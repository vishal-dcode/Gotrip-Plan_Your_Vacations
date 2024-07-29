import Search from '../components/Search';
import AddTrip from '../components/AddTrip';
import Pagination from '../components/Pagination';
import TripList from '../components/TripList.jsx';
import HeroSection from '../components/HeroSection.jsx';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <main
        className="relative grid"
        style={{
          gridTemplateColumns: 'minmax(15rem, 30%) 1fr'
        }}>
        <section className="h-fit sticky top-[80px]">
          <AddTrip />
        </section>
        <section className="min-h-[100vh] flex flex-col justify-between border border-l-black border-y-0 border-r-0">
          <div>
            <div className=" px-5 xl:px-10 py-10 xl:pt-20 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold pb-1">Discover Trips</h2>
                <p className="text-sm text-neutral-800 font-normal">
                  Explore New Adventures and Find Your Perfect Getaway
                </p>
              </div>
              <p className="text-sm text-right w-[24ch]">
                Discover more about our curated travel experiences and unique vacation spots!
              </p>
            </div>

            <Search />
            <TripList />
          </div>
          <Pagination />
        </section>
      </main>
    </div>
  );
}
