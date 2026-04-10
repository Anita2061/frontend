import React from 'react';

const Service = () => {
  const mainServices = [
    { title: 'Fast Delivery', desc: 'Free shipping on orders over 5k. Get your items within 24 hours inside Valley.', icon: 'Delivery' },
    { title: '24/7 Support', desc: 'Our dedicated team is available anytime via live chat or phone to help with your orders.', icon: 'Support' },
    { title: 'Secure Payment', desc: 'We use bank-level 256-bit encryption to ensure your transactions are 100% safe.', icon: 'Secure' },
    { title: 'Easy Returns', desc: 'Not happy with your purchase? Return it within 7 days for a full, no-questions-asked refund.', icon: 'Returns' },
    { title: 'Store Pickup', desc: 'Order online and pick up your items at any of our 500+ local partner locations.', icon: 'Pickup' },
    { title: 'Authenticity Guarantee', desc: 'We source directly from brands to guarantee that every product is 100% original.', icon: 'Original' },
  ];

  return (
    <div className="bg-white">
      <section className="bg-orange-50 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl">How Can We Help You?</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          At Bare & Bold, we are committed to providing the best shopping experience with world-class logistics and customer care.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-800">Our Services</h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-orange-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainServices.map((service) => (
            <div key={service.title} className="group rounded-2xl border border-gray-100 p-8 shadow-sm transition-all duration-300 hover:bg-orange-600 hover:text-white hover:shadow-xl">
              <div className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500 transition group-hover:text-orange-100">{service.icon}</div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="leading-relaxed text-gray-500 group-hover:text-orange-50">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 px-4 py-16 text-black sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-500">1000+</div>
            <div className="text-sm uppercase tracking-widest text-black">Happy Customers</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-500">24/7</div>
            <div className="text-sm uppercase tracking-widest text-black">Customer Care</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-500">70+</div>
            <div className="text-sm uppercase tracking-widest text-black">Districts Reached</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-500">100%</div>
            <div className="text-sm uppercase tracking-widest text-black">Secure Checkout</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
