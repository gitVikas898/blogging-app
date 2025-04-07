import { Link } from "react-router-dom";
import landing from "../assets/landing.webp";

const Landing = () => {
  return (
    <section className="min-h-[78vh] grid grid-cols-1 md:grid-cols-2 px-6 py-12 md:px-16">
      {/* Text Section */}
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">Voices</h1>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">thoughts & reflections</h1>
          <h2 className="text-xl md:text-2xl text-gray-600">
            A space to explore, express, and expand your perspective
          </h2>
        </div>
        <Link
          to="/signup"
          className="inline-block py-3 px-6 bg-black text-white text-lg rounded-full hover:bg-gray-800 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center mt-10 md:mt-0">
        <img
          src={landing}
          alt="Landing"
          className="w-full h-auto max-h-[500px] object-contain"
        />
      </div>
    </section>
  );
};

export default Landing;
