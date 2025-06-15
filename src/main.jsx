import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import SignIn from './Components/Extra/SignIn.jsx';
import SignUp from './Components/Extra/Signup.jsx';
import AboutUs from './Components/Extra/AboutUs.jsx';
import { HelmetProvider } from 'react-helmet-async';
import LearnQuranArticle from './pages/articles/learn-quran.jsx';
import ReadQuranArticle from './pages/articles/read-quran.jsx';
import PrivacyPolicy from './pages/articles/privacy-policy.jsx';
import Terms from './pages/articles/terms.jsx';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/aboutus',
    element: <AboutUs></AboutUs>
  },
  {
    path: '/articles/learn-quran',
    element: <LearnQuranArticle></LearnQuranArticle>
  },
  {
    path: '/articles/read-quran',
    element: <ReadQuranArticle></ReadQuranArticle>
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy></PrivacyPolicy>
  },
  {
    path: '/terms',
    element: <Terms></Terms>
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

//home page refresh
//logo refresh


//https://quranapi.pages.dev/getting-started/get-a-verse
//https://github.com/spa5k/tafsir_api