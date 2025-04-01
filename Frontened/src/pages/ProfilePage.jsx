// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({});
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();
  
  
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const authToken = localStorage.getItem('auth_token');
//       if (!authToken) {
//         navigate('/signin');
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch('http://127.0.0.1:8000/users/profile/', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${authToken}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//           setUpdatedUser(data);
//         } else {
//           setError(data.message || 'Error fetching profile');
//         }
//       } catch (error) {
//         setError('Error fetching profile data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccessMessage('');

//     const authToken = localStorage.getItem('auth_token');
//     try {
//       const response = await fetch('http://127.0.0.1:8000/users/profile/', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`,
//         },
//         body: JSON.stringify(updatedUser),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUser(data);
//         localStorage.setItem('user', JSON.stringify(data));
//         window.dispatchEvent(new Event('authChange'));
//         setSuccessMessage('Profile updated successfully!');
//         setIsEditing(false);
//       } else {
//         setError(data.message || 'Error updating profile');
//       }
//     } catch (error) {
//       setError('Error updating profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProfile = async () => {
//     const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage
    
//     if (!userId) {
//       setError('User ID is missing. Please ensure you are logged in.');
//       return;
//     }
  
//     if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
//       setLoading(true);
//       const authToken = localStorage.getItem('auth_token');
    
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/users/delete/${userId}/`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${authToken}`,
//           },
//         });
    
//         if (response.ok) {
//           localStorage.removeItem('auth_token');
//           localStorage.removeItem('user');
//           localStorage.removeItem('userId');  // Clear userId as well
//           window.dispatchEvent(new Event('authChange'));
//           navigate('/');
//         } else {
//           setError('Error deleting profile');
//         }
//       } catch (error) {
//         setError('Error deleting profile');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <p className="text-lg mb-4">Please log in to access your profile.</p>
//           <button 
//             onClick={() => navigate('/signin')} 
//             className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-indigo-600 p-6 text-white">
//           <h1 className="text-2xl font-bold">User Profile</h1>
//         </div>

//         <div className="p-6">
//           {error && (
//             <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               {error}
//             </div>
//           )}

//           {successMessage && (
//             <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
//               {successMessage}
//             </div>
//           )}

//           {isEditing ? (
//             <form onSubmit={handleUpdateProfile}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     value={updatedUser.username || ''}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     value={updatedUser.email || ''}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">First Name</label>
//                   <input
//                     type="text"
//                     name="first_name"
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     value={updatedUser.first_name || ''}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Last Name</label>
//                   <input
//                     type="text"
//                     name="last_name"
//                     className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//                     value={updatedUser.last_name || ''}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   {loading ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <>
//               <div className="flex items-center space-x-6 mb-6">
//                 <img
//                   src={user.profile_picture || '/default-avatar.png'}
//                   alt="Profile"
//                   className="w-20 h-20 rounded-full object-cover"
//                 />
//                 <div>
//                   <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
//                   <p className="text-gray-600">@{user.username}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Email</h3>
//                   <p className="mt-1 text-sm text-gray-900">{user.email}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Role</h3>
//                   <p className="mt-1 text-sm text-gray-900 capitalize">{user.role?.replace('_', ' ')}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">First Name</h3>
//                   <p className="mt-1 text-sm text-gray-900">{user.first_name}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
//                   <p className="mt-1 text-sm text-gray-900">{user.last_name}</p>
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={handleDeleteProfile}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Delete Account
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        navigate('/signin');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/users/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setUpdatedUser(data);

          // Ensure userId is stored in localStorage
          localStorage.setItem('userId', data.id);
        } else {
          setError(data.message || 'Error fetching profile');
        }
      } catch (error) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const authToken = localStorage.getItem('auth_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/users/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        window.dispatchEvent(new Event('authChange'));
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(data.message || 'Error updating profile');
      }
    } catch (error) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('auth_token');

    if (!userId || !authToken) {
      setError('Missing user ID or authorization token.');
      return;
    }

    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setLoading(true);

      try {
        const response = await fetch(`http://127.0.0.1:8000/users/delete/${userId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
          window.dispatchEvent(new Event('authChange'));
          navigate('/');
        } else {
          const data = await response.json();
          setError(data.message || 'Error deleting profile');
        }
      } catch (error) {
        setError('Error deleting profile');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg mb-4">Please log in to access your profile.</p>
          <button 
            onClick={() => navigate('/signin')} 
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/vector-gratis/fondo-semitono-circulos_23-2148907689.jpg)' }}>
      <div className="bg-opacity-60 bg-black text-white py-12 px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white rounded-t-lg">
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {successMessage}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      value={updatedUser.username || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      value={updatedUser.email || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      value={updatedUser.first_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      value={updatedUser.last_name || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center space-x-6 mb-6">
                  <img
                    src={user.profile_picture || 'https://clipart-library.com/2023/855-Free-Clipart-Of-A-Male-Avatar.jpg'}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
                    <p className="text-gray-600">@{user.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{user.role?.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{user.first_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{user.last_name}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDeleteProfile}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Account
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
