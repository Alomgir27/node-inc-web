import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./screens/SignUp";
import SignUp2 from "./screens/SignUp2";
import Signin from "./screens/Signin";
import Business360 from "./screens/Business360";
import ClientsList from "./screens/ClientsList";
import Conversations from "./screens/Conversations";
import FinancesIncome from "./screens/FinancesIncome";
import FinancesExpense from "./screens/FinancesExpense";
import FinancesSuppliers from "./screens/FinancesSuppliers";
import Inventory from "./screens/Inventory";
import InventoryArticles from "./screens/InventoryArticles";
import FormCards from "./screens/formCards/FormCards";
import FinancesOverview from "./screens/FinancesOverview";
import Settings1 from "./screens/Settings1";
import Settings2 from "./screens/Settings2";
import Settings3 from "./screens/Settings3";
import Settings4 from "./screens/Settings4";
import WorkshopRealtime from "./screens/WorkshopRealtime";
import WorkshopAppointment from "./screens/WorkshopAppointment";
import WorkshopRequests from "./screens/WorkshopRequests";
import WorkshopRequestDetails from "./screens/WorkshopRequestDetails";
import WorkshopStorage from "./screens/WorkshopStorage";
import WorkshopArticles from "./screens/workshopArticles/WorkshopArticles";
import WorkshopNoded from "./screens/WorkshopNoded";

import CoursesLive from "./screens/CoursesLive";
import CoursesSchedule from "./screens/CoursesSchedule";
import CoursesRequests from "./screens/CoursesRequests";
// import CoursesDiscounts from "./screens/CoursesDiscounts";
import CoursesRegistration from "./screens/CoursesRegistration";
import EventsAndBlocks from "./screens/Courses&Activities/Events&Blocks";

import ModalForm from "./modals/ModalForm";
import ModalScan from "./modals/ModalScan";
import ModalNewVarient from "./modals/ModalNewVarient";
import ModalArticle from "./modals/ModalArticle";
import ModalNode from "./modals/ModalNode";
import ModalProfile from "./modals/ModalProfile";
import ModalClient from "./modals/ModalClient";
import ModalAppointment from "./modals/ModalAppointment";
import ModalSchedule from "./modals/ModalSchedule";
import ModalLiveActivity from "./modals/ModalLifeActivity";
import ModalInvoice from "./modals/ModalInvoice";
import ModalOrder from "./modals/ModalOrder";
import WorkshopEye from "./screens/WorkshopEye";
import WorkorderDetails from "./screens/WorkorderDetails";
import PrivateRoute from "./components/PrivateRoute";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/auth-context";
import WorkshopMaintanance from "./screens/WorkshopMaintanance";

function App() {
  const { setTokens, setUser } = useContext(AuthContext);
  useEffect(() => {
    // setTokens(JSON.parse(localStorage.getItem("tokens")));
    // setUser(JSON.parse(localStorage.getItem("user")));
  }, [setTokens, setUser]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/signup-1" element={<SignUp />} />
          <Route path="/signup-2" element={<SignUp2 />} /> */}
          <Route path="/signin" element={<Signin />} />

          <Route path="/360" element={<Navigate to="/business-360" />} />
          <Route
            path="/business-360"
            element={
              <PrivateRoute>
                <Business360 />
              </PrivateRoute>
            }
          />
          <Route
            path="/way"
            element={
              <PrivateRoute>
                <ClientsList />
              </PrivateRoute>
            }
          />
           <Route
            path="/way-client"
            element={
              <PrivateRoute>
                <ClientsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/conversations"
            element={
              <PrivateRoute>
                <Conversations />
              </PrivateRoute>
            }
          />
          <Route
            path="/finances-income"
            element={
              <PrivateRoute>
                <FinancesIncome />
              </PrivateRoute>
            }
          />
          <Route
            path="finances-overview"
            element={
              <PrivateRoute>
                <FinancesOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="finances-expense"
            element={
              <PrivateRoute>
                <FinancesExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="finances-suppliers"
            element={
              <PrivateRoute>
                <FinancesSuppliers />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory-articles"
            element={
              <PrivateRoute>
                <InventoryArticles />
              </PrivateRoute>
            }
          />
          <Route
            path="/form-cards"
            element={
              <PrivateRoute>
                <FormCards />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/business-settings"
            element={
              <PrivateRoute>
                <Settings2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Settings3 />
              </PrivateRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <PrivateRoute>
                <Settings4 />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-realtime"
            element={
              <PrivateRoute>
                <WorkshopRealtime />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-appointment"
            element={
              <PrivateRoute>
                <WorkshopAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-requests"
            element={
              <PrivateRoute>
                <WorkshopRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-request-details/:id"
            element={
              <PrivateRoute>
                <WorkshopRequestDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-storage"
            element={
              <PrivateRoute>
                <WorkshopStorage />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-articles"
            element={
              <PrivateRoute>
                <WorkshopArticles />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-noded"
            element={
              <PrivateRoute>
                <WorkshopNoded />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-workorder-details"
            element={
              <PrivateRoute>
                <WorkorderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses-live"
            element={
              <PrivateRoute>
                <CoursesLive />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses-schedule"
            element={
              <PrivateRoute>
                <CoursesSchedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses-discounts"
            element={
              <PrivateRoute>
                <EventsAndBlocks />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses-registration"
            element={
              <PrivateRoute>
                <CoursesRegistration />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-eye"
            element={
              <PrivateRoute>
                <WorkshopEye />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshop-maintanance"
            element={
              <PrivateRoute>
                <WorkshopMaintanance />
              </PrivateRoute>
            }
          />

          <Route path="/modal-1" element={<ModalForm isOpen />} />
          <Route path="/modal-2" element={<ModalScan isOpen />} />
          <Route path="/modal-3" element={<ModalNewVarient isOpen />} />
          <Route path="/modal-4" element={<ModalArticle isOpen />} />
          <Route path="/modal-5" element={<ModalNode isOpen />} />
          <Route path="/modal-6" element={<ModalProfile isOpen />} />
          <Route path="/modal-7" element={<ModalClient isOpen />} />
          <Route path="/modal-8" element={<ModalAppointment isOpen />} />
          <Route path="/modal-9" element={<ModalSchedule isOpen />} />
          <Route path="/modal-10" element={<ModalLiveActivity isOpen />} />
          <Route path="/modal-11" element={<ModalInvoice isOpen />} />
          <Route path="/modal-12" element={<ModalOrder isOpen />} />

          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
