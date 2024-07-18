import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import ManageUsers from "../pages/ManageUsers";
import AllTransactions from "../pages/AllTransactions";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/home',
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/home',
                element: (
                    <PrivateRoute>
                        <Home>

                        </Home>
                    </PrivateRoute>),
            },
            {
                path: '/home/manage-user',
                element: (
                    <PrivateRoute>
                        <ManageUsers>

                        </ManageUsers>
                    </PrivateRoute>
                ),
            },
            {
                path: '/home/all-transaction',
                element: (
                    <PrivateRoute>
                        <AllTransactions>

                        </AllTransactions>
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: '/register',
        element: <Register></Register>
    }
])