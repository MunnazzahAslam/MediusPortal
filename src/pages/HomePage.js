import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { Provider } from "react-redux";
import store from "../store";

// pages
import FAQs from '../components/FAQs/FAQs'
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./authPages/Signin";
import Signup from "./authPages/Signup";
import ForgotPassword from "./authPages/ForgotPassword";
import ResetPassword from "./authPages/ResetPassword";
import Lock from "./authPages/Lock";
import NotFoundPage from "./authPages/NotFound";
import Case from '../components/Case/Case';
import ServerError from "./authPages/ServerError";
import AllPayments from "../components/Payments/AllPayments";
import OTP from '../pages/authPages/OTP';
import Users from '../components/Users/Users';
import User from '../components/Users/User';
import CheckEmail from '../pages/authPages/CheckEmail';
import AllCopyrights from "../components/Copyrights/AllCopyrights";
import AllPatents from '../components/Patents/AllPatents';
import AllTrademarks from '../components/Trademarks/AllTrademarks';
import AllDesigns from '../components/Designs/AllDesigns';
import City from '../components/City/City';
import Claim from '../components/Claim/Claim';
import IPFilter from '../components/IPFilter/IPFilter';
import passwordResetCode from './authPages/passwordResetCode';
import SinglePayment from '../components/Payments/SinglePayment';
// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Provider store={store}>
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithSidebar exact path={Routes.Signup.path} component={Signup} />
      <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
      <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
      <RouteWithLoader exact path={Routes.ResetPasswordCode.path} component={passwordResetCode} />
      <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
      <RouteWithLoader exact path={Routes.OTP.path} component={OTP} />
      <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
      <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
      <RouteWithSidebar exact path={Routes.CheckEmail.path} component={CheckEmail} />
      <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
      <RouteWithSidebar exact path={Routes.FAQs.path} component={FAQs} />
      <RouteWithSidebar exact path={Routes.City.path} component={City} />
      <RouteWithSidebar exact path={Routes.Claim.path} component={Claim} />
      <RouteWithSidebar exact path={Routes.IPFilter.path} component={IPFilter} />
      <RouteWithSidebar exact path={Routes.SinglePayment.path} component={SinglePayment} />
      <RouteWithSidebar exact path={Routes.User.path} component={User} />
      <RouteWithSidebar exact path={Routes.Case.path} component={Case} />
      {/* pages */}
      <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
      <RouteWithLoader exact path={Routes.Upgrade.path} component={Upgrade} />
      <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
      <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
      <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
      <RouteWithSidebar exact path={Routes.AllCopyrights.path} component={AllCopyrights} />
      <RouteWithSidebar exact path={Routes.AllPayments.path} component={AllPayments} />
      <RouteWithSidebar exact path={Routes.AllTrademarks.path} component={AllTrademarks} />
      <RouteWithSidebar exact path={Routes.AllDesigns.path} component={AllDesigns} />
      <RouteWithSidebar exact path={Routes.AllPatents.path} component={AllPatents} />

      {/* components */}
      <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
      <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
      <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
      <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
      <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
      <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
      <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
      <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
      <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
      <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
      <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
      <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
      <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
      <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
      <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
      <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

      {/* documentation */}
      <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
      <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
      <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
      <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
      <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
      <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
      <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

      <Redirect to={Routes.NotFound.path} />
    </Switch>
  </Provider>
);
