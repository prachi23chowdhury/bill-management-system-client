import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router';
import img1 from "../../public/assets/electricity12.png";
import img2 from "../../public/assets/1586435726146.png";
import img3 from "../../public/assets/Standard-Chartered-Credit-Cards-Autobill-Payment-Cashback.webp";


const slides = [
  {
    id: 1,
    title: 'Pay electricity bills online — fast & secure',
    description: 'Skip queues. Pay your monthly electricity bill in under 2 minutes and get confirmation instantly.',
    image: img1
  },
  {
    id: 2,
    title: 'Earn 10% cashback on first bill pay',
    description: 'New users get 10% cashback (up to ৳100) on their first bill payment. Apply code: FIRSTPAY.',
    image: img3
  },
  {
    id: 3,
    title: 'Schedule recurring payments',
    description: 'Never miss a due date — set up recurring payments and relax.',
    image: img2
  }
];

const Banner = ({ className = '' }) => {
  const [index, setIndex] = useState(0);
  const length = slides.length;

  // autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const prev = () => setIndex((i) => (i - 1 + length) % length);
  const next = () => setIndex((i) => (i + 1) % length);

  return (
    <section className={`relative ${className}`} aria-label="Promotional banner">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-lg">
        <div className="relative h-64 sm:h-80 md:h-96">
          <AnimatePresence initial={false}>
            {slides.map((slide, i) => (
              i === index && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  {/* Use <img> for better control with imported assets + object-fit */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    aria-hidden="true"
                  />

                  {/* stronger overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                  {/* Content: use a semi-opaque glass panel so text is always legible */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="px-6 sm:px-12 md:px-16 max-w-2xl">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
                        <motion.h2
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.15 }}
                          className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow"
                        >
                          {slide.title}
                        </motion.h2>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3 text-sm sm:text-base text-gray-100"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.45 }}
                          className="mt-4 flex gap-3"
                        >
                          <Link to="/pay" className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium shadow hover:opacity-95">Pay Now</Link>
                          <Link to="/learn-more" className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10">Learn more</Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60">
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button onClick={next} aria-label="Next" className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60">
              <FaChevronRight />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'} focus:outline-none`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
