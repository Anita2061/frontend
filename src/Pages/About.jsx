import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Inventory Tracking',
    description: 'Real-time stock visibility helps teams avoid over-ordering and shortages.',
    accent: 'border-orange-500',
    icon: 'Stock',
  },
  {
    title: 'Data Analytics',
    description: 'See product performance and category activity with a cleaner overview.',
    accent: 'border-blue-500',
    icon: 'Insights',
  },
  {
    title: 'Fast Performance',
    description: 'Built with React and Vite for a quicker, smoother management experience.',
    accent: 'border-green-500',
    icon: 'Speed',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10 md:p-12">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Product Management <span className="text-orange-600">System</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            A streamlined solution designed to help businesses organize, track, and manage their inventory with precision and ease.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className={`rounded-2xl border-b-4 ${feature.accent} bg-white p-6 shadow-sm`}>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">{feature.title}</h3>
              <p className="text-sm leading-6 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gray-800 p-8 text-center text-white sm:p-10">
          <h2 className="mb-4 text-2xl font-semibold">Ready to manage your stock?</h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/service"
              className="rounded-lg bg-orange-600 px-8 py-3 font-medium text-white transition-colors hover:bg-orange-700"
            >
              View Services
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-gray-400 bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-gray-700"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
