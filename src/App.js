import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Auth from './components/auth/Auth';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';
import Cart from './components/cart/Cart';
import Products from './components/products/Products';
import Admin from './components/admin/Admin';
import AdminProducts from './components/admin/AdminProducts';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/products' element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/adminproducts' element={<AdminProducts />} />
      </Routes>
      <ToastContainer autoclose={3000} />
    </BrowserRouter>
  );
}

export default App;
