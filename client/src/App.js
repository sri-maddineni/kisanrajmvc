import { Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { About } from "./pages/About"
import { Pagenotfound } from "./pages/Pagenotfound"
import { Contact } from './pages/Contact';

import { Toaster } from 'react-hot-toast';

import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import AuthState from './context/AuthState';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';

import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import SellCommodity from './pages/user/SellCommodity';
import Listings from './pages/user/Listings';
import BuyCommodity from './pages/user/BuyCommodity';
import ProposalsSent from './pages/user/ProposalsSent';
import ProposalsRecieved from './pages/user/ProposalsRecieved';
import Responses from "./pages/ContextUser/Responses"
import EquipmentCategory from "./pages/user/EquipmentCategory"
import Equipment from "./pages/user/Equipment"
import HireEquipment from "./pages/user/HireEquipment"
import EquipmentListing from "./pages/user/EquipmentListing"
import PostRequirement from "./pages/user/PostRequirement"
import NegHistoy from './pages/user/NegHistory'





function App() {
  return (
    <>
      <AuthState>
        <Toaster />

        <Routes>
          <Route path='/' element={<Homepage />} />

          

          //private routes


          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='user' element={<Dashboard />} />
            <Route path='user/proposals-recieved' element={<ProposalsRecieved />} />

            <Route path='user/orders' element={<Orders />} />
            <Route path='user/listings-posted' element={<Listings />} />
            <Route path='user/profile' element={<Profile />} />
            <Route path='user/product/:pid' element={<UpdateProduct />} />
            <Route path='user/sell-commodity' element={<SellCommodity />} />
            <Route path='user/buy-commodity' element={<BuyCommodity />} />

            <Route path='user/history/negotiations' element={<NegHistoy />} />

            <Route path='user/responses/:pid' element={<Responses />} />
            <Route path='user/post-potential' element={<PostRequirement />} />

            <Route path='user/post-equipment' element={<Equipment />} />
            <Route path='user/hire-equipment' element={<HireEquipment />} />
            <Route path='user/my-equipment-listing' element={<EquipmentListing />} />
          </Route>

          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/create-category' element={<CreateCategory />} />
            <Route path='admin/create-product' element={<CreateProduct />} />
            <Route path='admin/product/:pid' element={<UpdateProduct />} />
            <Route path='admin/users' element={<Users />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='user/create-equipment-category' element={<EquipmentCategory />} />
          </Route>


          <Route path='/forgot-password' element={<ForgotPassword />} />


          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Pagenotfound />} />

          <Route path='/buy-commodity' element={<BuyCommodity />} />
        </Routes>

      </AuthState>
    </>


  );
}

export default App;
