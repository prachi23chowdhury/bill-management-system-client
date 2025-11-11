import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaFire, FaTint, FaWifi } from "react-icons/fa";

const categories = [
  {
    name: "Electricity",
    icon: <FaBolt className="text-yellow-400 text-4xl" />,
    color: "from-yellow-100 to-yellow-200",
  },
  {
    name: "Gas",
    icon: <FaFire className="text-red-500 text-4xl" />,
    color: "from-red-100 to-red-200",
  },
  {
    name: "Water",
    icon: <FaTint className="text-blue-400 text-4xl" />,
    color: "from-blue-100 to-blue-200",
  },
  {
    name: "Internet",
    icon: <FaWifi className="text-green-400 text-4xl" />,
    color: "from-green-100 to-green-200",
  },
];

const Category = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Bill Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-20">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-br ${cat.color} rounded-2xl shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition duration-300 hover:shadow-xl`}
          >
            {cat.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {cat.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;
