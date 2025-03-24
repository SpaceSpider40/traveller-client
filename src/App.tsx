import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginView from "./views/LoginView.tsx";
import {ReactNode} from "react";
import UserService from "./services/UserService.ts";
import TripDetailsView from "./views/TripDetailsView.tsx";
import NavView from "./views/NavView.tsx";
import TripView from "./views/TripView.tsx";

function AuthenticatedPath(props: { children: ReactNode }) {
    return UserService.isAuthenticated() ? props.children :
        <Navigate to={"/login"} replace/>
}

function App() {
    return <BrowserRouter>
        <AuthenticatedPath>
            <NavView/>
        </AuthenticatedPath>
        <Routes>

            <Route
                path="/"
                element={
                    <AuthenticatedPath>
                        <TripView/>
                    </AuthenticatedPath>
                }
            />
            <Route
                path={"/trip/:id"}
                element={
                    <AuthenticatedPath>
                        <TripDetailsView/>
                    </AuthenticatedPath>
                }
            />

            <Route path="login" element={<LoginView/>}/>
            <Route path="*" element={<Navigate to={"/"}/>}/>
        </Routes>
    </BrowserRouter>
}

export default App
