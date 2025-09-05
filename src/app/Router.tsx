import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './page';

// Import all the sample pages
import Qo_c001_landing from '../pages/samples/qo_c001_landing';
import Qo_c002_menu from '../pages/samples/qo_c002_menu';
import Qo_c003_item_details from '../pages/samples/qo_c003_item_details';
import Qo_c004_cart from '../pages/samples/qo_c004_cart';
import Qo_c005_checkout from '../pages/samples/qo_c005_checkout';
import Qo_c006_payment from '../pages/samples/qo_c006_payment';
import Qo_c007_order_status from '../pages/samples/qo_c007_order_status';
import Qo_c008_confirmation from '../pages/samples/qo_c008_confirmation';
import Qo_s001_staff_login from '../pages/samples/qo_s001_staff_login';
import Qo_s002_dashboard from '../pages/samples/qo_s002_dashboard';
import Qo_s003_order_management from '../pages/samples/qo_s003_order_management';
import Qo_s004_kitchen_display from '../pages/samples/qo_s004_kitchen_display';
import Qo_s005_menu_management from '../pages/samples/qo_s005_menu_management';
import Qo_s006_table_management from '../pages/samples/qo_s006_table_management';
import Qo_s007_customer_service from '../pages/samples/qo_s007_customer_service';
import Qo_s008_staff_analytics from '../pages/samples/qo_s008_staff_analytics';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/samples/qo_c001_landing" element={<Qo_c001_landing />} />
      <Route path="/samples/qo_c002_menu" element={<Qo_c002_menu />} />
      <Route path="/samples/qo_c003_item_details" element={<Qo_c003_item_details />} />
      <Route path="/samples/qo_c004_cart" element={<Qo_c004_cart />} />
      <Route path="/samples/qo_c005_checkout" element={<Qo_c005_checkout />} />
      <Route path="/samples/qo_c006_payment" element={<Qo_c006_payment />} />
      <Route path="/samples/qo_c007_order_status" element={<Qo_c007_order_status />} />
      <Route path="/samples/qo_c008_confirmation" element={<Qo_c008_confirmation />} />
      <Route path="/samples/qo_s001_staff_login" element={<Qo_s001_staff_login />} />
      <Route path="/samples/qo_s002_dashboard" element={<Qo_s002_dashboard />} />
      <Route path="/samples/qo_s003_order_management" element={<Qo_s003_order_management />} />
      <Route path="/samples/qo_s004_kitchen_display" element={<Qo_s004_kitchen_display />} />
      <Route path="/samples/qo_s005_menu_management" element={<Qo_s005_menu_management />} />
      <Route path="/samples/qo_s006_table_management" element={<Qo_s006_table_management />} />
      <Route path="/samples/qo_s007_customer_service" element={<Qo_s007_customer_service />} />
      <Route path="/samples/qo_s008_staff_analytics" element={<Qo_s008_staff_analytics />} />
    </Routes>
  );
};

export default AppRouter;
