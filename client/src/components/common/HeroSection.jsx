const styles = {
  section: {
    width: '-webkit-fill-available',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#ffffff'
  },
  text: 'text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] text-black',
  img: 'h-10 md:h-16 lg:h-24 xl:h-28 w-full rounded-full object-cover',
  container: 'flex items-center justify-center gap-2 md:gap-8',
  sectionBase:
    'border border-x-0 border-t-0 border-black leading-[1] px-5 sm:px-16 md:px-20 lg:px-24 py-14 md:py-24 lg:py-28 text-white font-bold grid place-items-center gap-5'
};

export default function HeroSection() {
  return (
    <section className={styles.sectionBase} style={styles.section}>
      <div className={styles.container} style={{ width: styles.section.width }}>
        <span className={styles.text}>EXPLORE</span>
        <img
          className={styles.img}
          src="https://images.unsplash.com/photo-1521427185932-e69b86608ff6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Explore"
        />
      </div>
      <div className={styles.container} style={{ width: styles.section.width }}>
        <img
          className={styles.img}
          src="https://plus.unsplash.com/premium_photo-1676035245908-e844e8d1664b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful"
        />
        <span className={styles.text}>BEAUTIFUL</span>
      </div>
      <div className={styles.container} style={{ width: styles.section.width }}>
        <span className={styles.text}>WORLD</span>
        <img
          className={styles.img}
          src="https://images.unsplash.com/photo-1510776632413-f3e527a8dc42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="World"
        />
      </div>
    </section>
  );
}
