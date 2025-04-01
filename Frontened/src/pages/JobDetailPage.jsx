import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetailPage = () => {
  const { jobId } = useParams(); // Get the jobId from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyStatus, setApplyStatus] = useState(''); // For displaying application status message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        navigate('/signin');
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/job-listings`, // Dynamic URL using the environment variable
          {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          const selectedJob = data.data.find((job) => job.id === parseInt(jobId)); // Find the job by id
          if (selectedJob) {
            setJob(selectedJob);
          } else {
            setError('Job not found');
          }
        } else {
          setError(data.message || 'Error fetching job details');
        }
      } catch (error) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, navigate]);

  const handleApplyJob = async () => {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/jobs/${jobId}/apply/`, // Dynamic URL using environment variable for the base URL
        {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setApplyStatus('Successfully applied for the job!');
      } else {
        setApplyStatus(data.message || 'Error applying for the job');
      }
    } catch (error) {
      setApplyStatus('Failed to apply for the job');
    }
  };

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
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-simple-jobs-to-sum-up-business-image_20826.jpg")' }} // Add your background image URL here
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden bg-opacity-80">
        <div className="bg-indigo-700 p-8 text-white rounded-t-lg">
          <h1 className="text-3xl sm:text-4xl font-bold">{job?.title}</h1>
          <p className="text-lg mt-2">{job?.location}</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="text-lg text-gray-700">
            <p>{job?.description}</p>
          </div>

          <div>

  <h3 className="text-xl font-semibold text-indigo-600">Skills Required:</h3>
  <ul className="list-disc pl-6 space-y-1 text-gray-700">
    {Array.isArray(job?.skills_required) ? (
      job?.skills_required.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))
    ) : (
      <li>No skills required listed</li> // Fallback if it's not an array
    )}
  </ul>
</div>


          <div>
            <h3 className="text-xl font-semibold text-indigo-600">Experience Required:</h3>
            <p className="text-gray-700">{job?.experience_required} years</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">Salary Range:</h3>
            <p className="text-gray-700">{job?.salary_range || 'Not provided'}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">Job Type:</h3>
            <p className="text-gray-700">{job?.job_type || 'Not specified'}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">Remote Option:</h3>
            <p className="text-gray-700">{job?.remote_option ? 'Yes' : 'No'}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">Benefits:</h3>
            <p className="text-gray-700">{job?.benefits || 'Not specified'}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">Contact Email:</h3>
            <p className="text-gray-700">{job?.contact_email || 'Not provided'}</p>
          </div>

          {/* Apply for Job Button */}
          <div className="mt-6">
            <button
              onClick={handleApplyJob}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Apply for Job
            </button>
          </div>

          {/* Apply Status Message */}
          {applyStatus && (
            <div className="mt-4 text-center text-lg">
              <p className={`${applyStatus.includes('Successfully') ? 'text-green-500' : 'text-red-500'}`}>
                {applyStatus}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
