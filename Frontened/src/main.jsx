import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './components/HomePage';  // Make sure the HomePage component is created
import About from './components/About';       // Make sure About component is created
import LoginPage from './pages/LoginPage';   // Make sure LoginPage component is created
import RegisterPage from './pages/RegisterPage';  // Make sure RegisterPage component is created
import JobsPage from './pages/JobsPage';      // Make sure JobsPage component is created
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import JobDetailPage from './pages/JobDetailPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import PostJobPage from './pages/PostJobPage';
import PostCompanyPage from './pages/PostCompanyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },  // HomePage component rendered at root
      { path: 'about', element: <About /> }, // About page
      { path: 'contact', element: <ContactPage /> }, // Contact page (Make sure you have a Contact component)
      // { path: 'user/:userid', element: <User /> }, // User page (Make sure you have a User component)
      // { path: 'github', element: <Github /> },  // Github page (Make sure you have a Github component)
      { path: 'jobs', element: <JobsPage /> }, // Jobs page
      { path: 'register', element: <RegisterPage /> }, // Register page
      { path: 'signin', element: <LoginPage /> }, // Sign In page
      { path: 'profile', element: <ProfilePage /> }, // Profile page
      { path: 'jobs/job-listings/:jobId', element: <JobDetailPage /> }, // Individual Job Detail page
      { path: 'companies/:companyId', element: <CompanyDetailPage /> }, 
      { path: 'post-job', element: <PostJobPage /> },
      { path: 'post-company', element: <PostCompanyPage /> },
    
    ]
    
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
