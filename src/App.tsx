import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginView from "./views/LoginView.tsx";
import {ReactNode} from "react";
import UserService from "./services/UserService.ts";
import DashboardView from "./views/DashboardView.tsx";

function AuthenticatedPath(props: { children: ReactNode }) {
    return UserService.isAuthenticated() ? props.children :
        <Navigate to={"/login"} replace/>
}

function App() {
    return (<BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthenticatedPath>
                            <DashboardView/>
                        </AuthenticatedPath>
                    }
                />
                <Route path="login" element={<LoginView/>}/>
                <Route path="*" element={<Navigate to={"/"}/>}/>
            </Routes>
        </BrowserRouter>)
}

export default App
