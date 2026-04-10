function PricingSection() {
  const plans = [
    { name: "Basic", price: "$10/mo" },
    { name: "Pro", price: "$20/mo" },
    { name: "Enterprise", price: "$50/mo" },
  ];

  return (
    <section className="py-10 space-y-6">
      <h2 className="text-2xl font-semibold text-center">Pricing</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div
            key={i}
            className="p-6 border rounded-lg text-center 
                       bg-white dark:bg-gray-900"
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-xl font-bold mt-2">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
