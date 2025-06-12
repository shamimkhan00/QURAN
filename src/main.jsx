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

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },{
    path: '/signin',
    element: <SignIn />,
  },{
    path: '/signup',
    element: <SignUp />,
  },{
    path: '/aboutus',
    element: <AboutUs></AboutUs>
  }
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


//home page refresh
//logo refresh


//https://quranapi.pages.dev/getting-started/get-a-verse
//https://github.com/spa5k/tafsir_api