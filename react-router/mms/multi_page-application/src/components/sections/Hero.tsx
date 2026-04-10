function Hero() {
  return (
    <section className="py-16 text-center space-y-4">
      <h1 className="text-4xl font-bold">Build better products faster</h1>

      <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
        A modern landing page built with React and clean UI.
      </p>

      <button
        className="px-6 py-2 rounded-md 
                         bg-black text-white 
                         dark:bg-white dark:text-black"
      >
        Get Started
      </button>
    </section>
  );
}

export default Hero;
