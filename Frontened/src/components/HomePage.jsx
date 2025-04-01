import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]); // Store top 4 jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch the featured jobs from the API
  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL; // Access the base URL from .env file in Vite
      try {
        const response = await fetch(`${baseUrl}/jobs/job-listings`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          const topJobs = data.data.slice(0, 4); // Get the top 4 jobs from the API response
          setFeaturedJobs(topJobs);
        } else {
          setError('Error fetching job listings');
        }
      } catch (error) {
        setError('Failed to fetch job listings');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  // Handle "Explore Jobs" button click
  const handleExploreJobsClick = () => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      navigate('/jobs');  // Navigate to Jobs page if logged in
    } else {
      navigate('/signin');  // Navigate to Sign In page if not logged in
    }
  };

  // Handle "Apply Now" button click for each job
  const handleApplyNowClick = (jobId) => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      navigate(`/jobs/job-listings/${jobId}`);  // Navigate to Job Detail page
    } else {
      navigate('/signin');  // Navigate to Sign In page if not logged in
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <main 
    className="bg-gray-50 min-h-screen p-8"
    style={{ backgroundImage: "url('http://jobs.makeitmsp.org/images/background-index.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
      {/* Intro Section */}
      <section className="intro text-center mb-12 py-16 bg-blue-600 text-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold tracking-wide">Welcome to JobPortal</h2>
        <p className="text-lg mt-4 mb-6 font-medium">Your next career opportunity is just a click away. Find your dream job today.</p>
        <button
          className="bg-yellow-500 text-gray-800 px-8 py-4 rounded-lg shadow-md text-lg font-semibold hover:bg-yellow-600 transition duration-300"
          onClick={handleExploreJobsClick}
        >
          Explore Jobs
        </button>
      </section>
      <section className="featured-jobs">
  <h3 className="text-3xl font-semibold text-gray-800 mb-8">Featured Jobs</h3>
  <div className="job-listing grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {featuredJobs.length > 0 ? (
      featuredJobs.map((job) => (
        <div key={job.id} className="job-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h4 className="text-xl font-semibold text-gray-700">{job.title}</h4>
          <p className="text-lg text-gray-500 mt-2">{job.company?.name || 'Unknown Company'}</p> {/* Handle company name */}
          <p className="text-sm text-gray-500 mt-2">{job.job_type || 'Not Specified'}</p> {/* Handle job type */}
          {/* Apply Now button: Conditional behavior based on sign-in status */}
          <button
            className="bg-green-500 text-white mt-6 py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            onClick={() => handleApplyNowClick(job.id)}  // Pass the jobId to the handler
          >
            Apply Now
          </button>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No featured jobs available at the moment.</p>
    )}
  </div>
</section>

    </main>
  );
};

export default HomePage;
