// components/Hero.tsx
const Hero = () => {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Support Local Artisans</h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl">
          Discover handcrafted works by New England's finest makers.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </section>
  )
}

export default Hero
