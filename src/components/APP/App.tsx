import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthLayout from '../common/AuthLayout/AuthLayout'
import MasterLayout from '../common/MasterLayout/MasterLayout'
import Home from '../Home/Home'
import NotFound from '../NotFound/NotFound'
import Profile from '../Profile/Profile'
import SignIn from '../SignIn/SignIn'
import UserData from '../UserData/UserData'
import UsersList from '../UsersList/UsersList'
import './App.css'

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
          path: 'userdata/:userId', element: <UserData />
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
