import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-md sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
            <p className="mb-6 text-gray-600">Have questions? Send us a message and we'll get back to you shortly.</p>
            <div className="space-y-3">
              <p className="font-medium text-orange-600">Email: Anitahshopee101@gmail.com</p>
              <p className="font-medium text-orange-600">Phone: 977 9765575323</p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-orange-500" />
            <input type="email" placeholder="Email Address" className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-orange-500" />
            <textarea placeholder="Your Message" rows="5" className="w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-orange-500"></textarea>
            <button type="button" className="rounded-md bg-orange-600 py-3 font-bold text-white transition hover:bg-orange-700">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
