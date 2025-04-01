// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // For navigation

// const JobsPage = () => {
//   const [jobListings, setJobListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobListings = async () => {
//       const authToken = localStorage.getItem('auth_token'); // Get the auth token
//       if (!authToken) {
//         navigate('/signin'); // Redirect if user is not signed in
//         return;
//       }

//       try {
//         const response = await fetch('http://127.0.0.1:8000/jobs/job-listings', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${authToken}`, // Sending auth token for authenticated access
//           },
//         });
//         const data = await response.json();

//         if (response.ok) {
//           setJobListings(data.data); // Set the fetched job listings
//         } else {
//           setError(data.message || 'Error fetching job listings');
//         }
//       } catch (error) {
//         setError('Failed to fetch job listings');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobListings();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-indigo-600 p-6 text-white">
//           <h1 className="text-2xl font-bold">Job Listings</h1>
//         </div>

//         <div className="p-6">
//           {error && (
//             <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               {error}
//             </div>
//           )}
          
//           <ul className="space-y-4">
//             {jobListings.map((job) => (
//               <li key={job.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold">{job.title}</h3>
//                 <p className="text-gray-500">{job.location}</p>
//                 <p className="mt-2 text-gray-700">{job.description}</p>
//                 <div className="mt-4 flex justify-between items-center">
//                   <Link
//                     to={`/jobs/job-listings/${job.id}`}
//                     className="text-indigo-600 hover:text-indigo-700"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobsPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const JobsPage = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobListings = async () => {
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        navigate('/signin');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/jobs/job-listings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setJobListings(data.data);
        } else {
          setError(data.message || 'Error fetching job listings');
        }
      } catch (error) {
        setError('Failed to fetch job listings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobListings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-simple-jobs-to-sum-up-business-image_20826.jpg')" }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold">Job Listings</h1>
          <p className="text-lg mt-2">Find your next dream job with us!</p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <ul className="space-y-6">
            {jobListings.map((job) => (
              <li key={job.id} className="bg-gray-50 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
                <h3 className="text-2xl font-semibold text-indigo-600">{job.title}</h3>
                <p className="text-gray-500">{job.location}</p>
                <p className="mt-2 text-gray-700">{job.description}</p>
                
                {/* Company name link - only show if company data exists */}
                {job.company && (
                  <div className="mt-4">
                    <Link
                      to={`/companies/${job.company.id}`}
                      className="text-indigo-600 hover:text-indigo-800 text-lg font-medium"
                    >
                      {job.company.name}
                    </Link>
                  </div>
                )}
                
                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to={`/jobs/job-listings/${job.id}`}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-lg"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
