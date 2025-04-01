import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const PostCompanyPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is admin
  const [createdCompanyId, setCreatedCompanyId] = useState(null); // Store created company ID
  const navigate = useNavigate(); // Hook to handle page navigation in React Router v6

  useEffect(() => {
    // Fetch user role to check if the user is an admin
    const checkUserRole = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/users/check-role/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        });

        if (response.data.role === 'admin') {
          setIsAdmin(true);  // User is admin, allow access to post company
        } else {
          setError('You must be an admin to create a company.');
        }
      } catch (err) {
        setError('Failed to check user role.');
      }
    };

    checkUserRole();
  }, []);

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !description || !location || !website || !contactEmail) {
      setError('All fields are required.');
      return;
    }
  
    const companyData = {
      name,
      description,
      location,
      website,
      contact_email: contactEmail,
    };
  
    try {
      // Try to create the company first
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/companies`, 
        companyData,
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
  
      if (response.status === 201) {
        setSuccessMessage('Company created successfully!');
        const companyId = response.data.id;
  
        if (companyId) {
          setCreatedCompanyId(companyId);
  
          // Try to create the job only if the company was created
          const jobData = {
            company_id: companyId,
            job_title: 'Example Job Title',
            // Add other job-specific fields here if needed
          };
  
          try {
            const jobResponse = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/jobs/`, // Dynamically constructed URL
              jobData, 
             {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              },
            });
  
            if (jobResponse.status === 201) {
              setSuccessMessage('Job created successfully!');
            } else {
              throw new Error('Failed to create job.');
            }
          } catch (jobError) {
            setError('Failed to create job. The company was created, but job creation failed.');
          }
  
          // Redirect to the company details page after success
          setTimeout(() => {
            navigate(`/company/${companyId}`);
          }, 2000);
        }
      } else {
        throw new Error('Failed to create company.');
      }
    } catch (error) {
      setError(error.response ? error.response.data.detail || error.message : 'Failed to create company. Please try again later.');
    }
  };
  

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage: "url('https://vistapointe.net/images/company-3.jpg')", // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-700 mb-6">
            You must be an admin to post a company.
          </p>
          <button
            onClick={() => navigate('/')} // You can change this action to any other action like redirecting to home
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div
      className="bg-cover bg-center min-h-screen p-6"
      style={{
        backgroundImage: "url('https://vistapointe.net/images/company-3.jpg')", // Replace with your image URL
      }}
    >
      <div className="max-w-screen-lg mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Post a New Company</h1>
  
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
  
        <form onSubmit={handleCompanySubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Company Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter company name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold">Company Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter company description"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Enter website URL"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold">Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Enter contact email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Post Company
            </button>
          </div>
        </form>
  
        {createdCompanyId && (
          <div className="mt-6">
            <button
              onClick={() => navigate(`/company/${createdCompanyId}`)} // Redirect to company details page
              className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              View Company Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
 } 

export default PostCompanyPage;
