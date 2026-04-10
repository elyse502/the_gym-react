function FeaturesSection() {
  const features = [
    { title: "Fast", desc: "Optimized performance" },
    { title: "Secure", desc: "Safe and reliable" },
    { title: "Scalable", desc: "Grows with your needs" },
  ];

  return (
    <section className="py-10 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Features</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg text-center 
                       bg-white dark:bg-gray-900"
          >
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
