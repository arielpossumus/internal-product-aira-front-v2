import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home'
import IframeAgent from '../Pages/IframeAgent'
import Login from '../Pages/Login'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta pública */}
                <Route path="/" element={<Login />} />
                <Route path="/:client/iframe" element={<IframeAgent />} />
                
                {/* Rutas protegidas */}
                <Route path="/:client" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
              
            </Routes>
        </BrowserRouter>
    )
}
