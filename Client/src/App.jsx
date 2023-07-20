import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'


import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'
import RootLayout from './root/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='admin/login' element={<AdminLogin/>}/>

    </Route>
  )
)
function App() {
  return(
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
