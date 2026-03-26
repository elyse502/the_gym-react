import { useState, useEffect } from "react";

const NameTransferLists = () => {
  const firstList = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Ethan Hunt",
    "Fiona Green",
    "Grace Wilson",
    "Henry Jackson",
    "Isabella Davis",
    "Jack White",
  ];

  const [secondList, setSecondList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= firstList.length) return;

    const interval = setInterval(() => {
      setSecondList((prev) => [...prev, firstList[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, firstList]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid grid-cols-2 gap-8">
        {/* First List */}
        <div className="bg-blue-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">First List</h2>
          <ul className="space-y-2">
            {firstList.map((name, index) => (
              <li key={`first-${name}-${index}`} className="text-blue-700">
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* Second List */}
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-green-800 mb-4">Second List</h2>
          <ul className="space-y-2">
            {secondList.map((name, index) => (
              <li key={`second-${name}-${index}`} className="text-green-700">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NameTransferLists;
