import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../common/AuthLayout/AuthLayout'
import SignIn from '../SignIn/SignIn'
import MasterLayout from '../common/MasterLayout/MasterLayout'
import UsersList from '../UsersList/UsersList'
import UserData from '../UserData/UserData'
import NotFound from '../NotFound/NotFound'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Home from '../Home/Home'
import Profile from '../Profile/Profile'

function App() {

  const routes = createBrowserRouter([
    {
      path: '', element: <AuthLayout />, errorElement:<NotFound/>,
      children: [
        {
          path: 'signin', element: <SignIn />
        },
        { index: true, element: <SignIn /> }
      ]
    }, {
      path: 'home', element: <MasterLayout />, errorElement: <NotFound/>,
      children: [
        {
           index: true, element: <Home/> },
        {
          path: 'userslist', element: <UsersList />
        },
        { 
          path: 'userdata', element: <UserData />
         },
        {
           path: 'profile', element: <Profile />
           },

      ]

    }])
  return (
    <>
    <RouterProvider router={routes}>

    </RouterProvider>
    <ToastContainer/>
    </>
  )
}

export default App
