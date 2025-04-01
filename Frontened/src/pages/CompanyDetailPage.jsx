import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        navigate('/signin');
        return;
      }
  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/companies/${companyId}/`, // Dynamic URL using environment variable
          {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        const result = await response.json(); // Get the full response
  
        if (response.ok) {
          setCompany(result.data); // Access the data property
        } else {
          setError(result.message || 'Error fetching company details');
        }
      } catch (error) {
        setError('Failed to fetch company details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCompanyDetails();
  }, [companyId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white">
              <h1 className="text-2xl font-bold">{company?.name || 'Unnamed Company'}</h1>
            </div>
      
            <div className="p-6 space-y-6">
              {/* Description */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">About Us</h2>
                <p className="text-gray-700">
                  {company?.description || 'No description provided'}
                </p>
              </div>
      
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Location</h2>
                  <p className="text-gray-700">
                    {company?.location || 'Location not specified'}
                  </p>
                </div>
      
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Email</h2>
                  {company?.contact_email ? (
                    <a 
                      href={`mailto:${company.contact_email}`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      {company.contact_email}
                    </a>
                  ) : (
                    <p className="text-gray-700">Email not provided</p>
                  )}
                </div>
              </div>
      
              {/* Website */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Website</h2>
                {company?.website ? (
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {company.website}
                  </a>
                ) : (
                  <p className="text-gray-700">Website not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

export default CompanyDetailPage;