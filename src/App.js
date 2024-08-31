import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Home from './components/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './components/Admin/Admin_home/Admin_home';
import AdminLoanTypes from './components/Admin/Admin_loan_types/Admin_loan_types';
import AdminDocuments from './components/Admin/Admin_documents/Admin_documents';
import LoanView from './components/loan_view/loan_view';
import CustomerForm from './components/customer_form/customer_form';
import AdminAllCategories from './components/Admin/Admin_all_categories/Admin_all_categories';
import AdminIncomeCategories from './components/Admin/Admin_income_categories/Admin_income_categories';
import AdminTc from './components/Admin/Admin_tc/Admin_tc';
import ApplyLoan from './components/Apply_loan/Apply_loan';
import UpdateDocs from './components/Update_docs/Update_docs';
import MyEmis from './components/My_emis/My_emis';
import MyHistory from './components/My_history/My_history';
import PayEmi from './components/Pay_emi/Pay_emi';
import MyProfile from './components/My_profile/My_profile';
import ContactUs from './components/Contact_us/Contact_us';
import AdminCustomers from './components/Admin/Admin_customers/Admin_customers';
import AdminCustomerView from './components/Admin/Admin_customer_view/Admin_customer_view';
import AdminCustomerLoans from './components/Admin/Admin_customer_loans/Admin_customer_loans';
import AdminRatings from './components/Admin/Admin_ratings/Admin_ratings';
import LoanCalculator from './components/Loan_calculator/Loan_calculator';
import AdminCustomerLoansView from './components/Admin/Admin_customer_loans_view/Admin_customer_loans_view';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path='/admin' Component={AdminHome} />
        <Route path='/admin/loan_type' Component={AdminLoanTypes} />
        <Route path='/admin/documents' Component={AdminDocuments} />
        <Route path='/admin/category' Component={AdminAllCategories} />
        <Route path='/admin/incomecats' Component={AdminIncomeCategories} />
        <Route path='/admin/t_and_c' Component={AdminTc} />
        <Route path='/admin/customers' Component={AdminCustomers} />
        <Route path='/admin/customer/view' Component={AdminCustomerView} />
        <Route path='/admin/customer/loans' Component={AdminCustomerLoans} />
        <Route path='/admin/ratings' Component={AdminRatings} />
        <Route path='/admin/loan/view' Component={AdminCustomerLoansView} />

        {/* Admin */}

        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/loanview' Component={LoanView}/>
        <Route path='/customerform' Component={CustomerForm}/>
        <Route path='/customerform/update' Component={UpdateDocs}/>
        <Route path='/application' Component={ApplyLoan}/>
        <Route path='/my_emi' Component={MyEmis}/>
        <Route path='/pay_emi' Component={PayEmi}/>
        <Route path='/my_history' Component={MyHistory}/>
        <Route path='/my_profile' Component={MyProfile}/>
        <Route path='/contactus' Component={ContactUs}/>
        <Route path='/calculator' Component={LoanCalculator}/>

      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
