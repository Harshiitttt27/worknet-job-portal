import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJobPage = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [location, setLocation] = useState('');
  const [experienceRequired, setExperienceRequired] = useState('');
  const [status, setStatus] = useState('active');
  const [companyName, setCompanyName] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobType, setJobType] = useState('full_time');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [remoteOption, setRemoteOption] = useState(false);
  const [benefits, setBenefits] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook to handle page navigation in React Router v6
  // Check if the user is an admin when the component is mounted
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // API call to check the user's role
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/users/check-role/`, {
        
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        });

        console.log('API Response:', response.data);  // Debugging response

        // Check if the user is an admin based on their role
        if (response.data.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setError('Failed to check user status');
      }
    };

    checkAdminStatus();
  }, []);

  // Handle job form submission
  const handleJobSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all required fields are filled
    if (!jobTitle || !jobDescription || !location || !companyName) {
      setError('All fields are required');
      return;
    }

    const jobData = {
      title: jobTitle,
      description: jobDescription,
      skills_required: skillsRequired.split(',').map((skill) => skill.trim()),  // Keep it as an array of skills
      location: location,
      experience_required: experienceRequired,
      status: status,
      company_name: companyName,
      salary_range: salaryRange,
      job_type: jobType,
      application_deadline: applicationDeadline,
      remote_option: remoteOption,
      benefits: benefits,
      contact_email: contactEmail,
    };

    try {
      
      const token = localStorage.getItem('auth_token');
if (!token) {
  setError('You are not authenticated.');
  return;
}

const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/jobs/createjob`, jobData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      if (response.status === 201) {
        setSuccessMessage('Job posted successfully!');
        // Reset form fields after successful submission
        setJobTitle('');
        setJobDescription('');
        setSkillsRequired('');
        setLocation('');
        setExperienceRequired('');
        setStatus('active');
        setCompanyName('');
        setSalaryRange('');
        setJobType('full_time');
        setApplicationDeadline('');
        setRemoteOption(false);
        setBenefits('');
        setContactEmail('');
      }
    } catch (err) {
      setError('Failed to post job. Please try again later.');
    }
  };

 
  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage: "url('https://wallpaperaccess.com/full/4321838.jpg')", // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-lg w-full bg-white bg-opacity-90 rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-700 mb-6">
            You must be an admin to post a job.
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-gradient-jobs-business-investment-image_13903.jpg')" }}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Post a New Job</h1>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-500 text-white p-3 rounded mb-4">
              <strong>Success:</strong> {successMessage}
            </div>
          )}

          <form onSubmit={handleJobSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-gray-700 font-medium">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter job title"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-gray-700 font-medium">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills Required */}
            <div>
              <label className="block text-gray-700 font-medium">Skills Required</label>
              <input
                type="text"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                placeholder="Enter skills separated by commas"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Experience Required */}
            <div>
              <label className="block text-gray-700 font-medium">Experience Required</label>
              <input
                type="number"
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                placeholder="Enter years of experience"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-gray-700 font-medium">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-gray-700 font-medium">Salary Range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="Enter salary range"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-gray-700 font-medium">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="full_time">Full-time</option>
                <option value="part_time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-gray-700 font-medium">Application Deadline</label>
              <input
                type="datetime-local"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remote Option */}
            <div>
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={remoteOption}
                  onChange={() => setRemoteOption(!remoteOption)}
                  className="mr-2"
                />
                Remote Option
              </label>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-gray-700 font-medium">Benefits</label>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="Enter benefits"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-gray-700 font-medium">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter contact email"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-4 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
