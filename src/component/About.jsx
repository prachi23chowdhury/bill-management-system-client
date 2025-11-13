import React from "react";
import { motion } from "framer-motion";
import useDocumentTitle from "../useDocomentTitle";

export default function About() {
     useDocumentTitle('About| MyApp'); 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-24">
      {/* Heade Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          About PayWise Bill
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl">
          PayWise Bill is your ultimate solution to manage, pay, and track your 
          bills efficiently. We aim to simplify your life with real-time updates, 
          smart notifications, and intuitive UI.
        </p>
      </motion.div>

     
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          {
            title: "Easy Payments",
            description: "Pay your bills in one click with safe and secure transactions.",
            icon: "💳",
          },
          {
            title: "Track Expenses",
            description: "Monitor all your bills and expenses in one place.",
            icon: "📊",
          },
          {
            title: "Notifications",
            description: "Never miss a due date with timely alerts and reminders.",
            icon: "🔔",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

     
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-gray-700 text-lg mb-4">
          Join thousands of users making their bill payments effortless.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
