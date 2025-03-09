import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CarInfoPage } from "./user/CarInfoPage";
import { InfoPage } from "./InfoPage";
import { LoginPage } from "./LoginPage";
import { RoleSelection } from "./RoleSelection";
import { TechInvoicePage } from "./tech/TechInvoicePage";
import { TechVehiclePage } from "./tech/TechVehiclePage";
import { TechSettings } from "./tech/TechSettingsPage";
import { AddTechPage } from "./tech/AddTechPage";
import { AddCustomerPage } from "./tech/AddCustomerPage";
import { AddVehiclePage } from "./tech/AddVehiclePage";
import { loginStatusAtom } from "../state/atoms";
import { useRecoilValue } from "recoil";
import {ServiceInfoPage} from "./user/ServiceInfoPage";
import {AddService} from "./tech/AddService";
import {AddComponent} from "./tech/AddComponent";
import { Customers } from "./tech/Customers";

export const Pages = () => {
  const ProtectedRoute = () => {
    const loginStatus = useRecoilValue(loginStatusAtom);
    if (loginStatus.role !== 'technician' && loginStatus.role !== 'customer') {
      return <Navigate to='/' replace />;
    }
    return <Outlet />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RoleSelection />} />
        <Route path='/info' element={< InfoPage/>} />
        <Route path='/login/:role' element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/carinfo' element={<CarInfoPage />} />
          <Route path='/serviceinfo' element={<ServiceInfoPage />} />
          <Route path='/techinvoice' element={<TechInvoicePage />} />
          <Route path='/techvehicle' element={<TechVehiclePage />} />
          <Route path='/techsettings' element={<TechSettings />} />
          <Route path='/addtech' element={<AddTechPage />} />
          <Route path='/addcustomer' element={<AddCustomerPage />} />
          <Route path='/addvehicle' element={<AddVehiclePage />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/addcomponent' element={<AddComponent />} />
          <Route path='/customers' element={<Customers />} />
        </Route>

        <Route path='*' element={<h1>Wrong route: 404!</h1>}></Route>

        
      </Routes>
    </BrowserRouter>
  );
}