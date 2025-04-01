import React, { useState } from 'react';

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage submission state

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    // Make a POST request to your Django backend to submit the contact form
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/users/contact/`, // Dynamically use the base URL from env variable
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // If submission is successful, show the success message
        if (data.message === 'Thank you for contacting us!') {
          alert('Your message has been sent successfully!');
          form.reset(); // Reset form fields after successful submission
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-blue-800 text-white py-16" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-lg font-semibold uppercase tracking-wider text-yellow-300">Contact Us</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white mb-4">
            Get in Touch with Us
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We would love to hear from you! Please fill out the form below to send us a message.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Left Section with Contact Info */}
            <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">Our Contact Info</h3>
              <p className="text-gray-600">
                You can reach us via the following methods:
              </p>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900">Phone</h4>
                  <a href="tel: 7291886231" className="text-blue-600 hover:text-blue-800">7291886231</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900">Email</h4>
                  <a href="harrysethi52@gmail.com" className="text-blue-600 hover:text-blue-800">harrysethi52@gmail.com</a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-900">Address</h4>
                  <a href="https://www.google.com/maps?q=312+Lovely+Street,+NY" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Delhi
                  </a>
                </div>
              </div>
            </div>

            {/* Right Section with Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
              <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Write your message..."
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white dark:border-gray-600"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
