import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import { useState } from 'react'; // Import useState

import AdminLogin from './pages/AdminLogin';
import Blogs from './pages/blogs/AllBlogs';
import RootLayout from './root/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Blogs/>}/>
      <Route path='admin/login' element={<AdminLogin/>} />
    </Route>
  )
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize the login state

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
