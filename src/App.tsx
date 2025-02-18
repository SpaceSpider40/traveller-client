import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginView from "./views/LoginView.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/login"} replace/>}/>
                <Route path="login" element={<LoginView/>}/>
                <Route path="*" element={<Navigate to={"/"}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
