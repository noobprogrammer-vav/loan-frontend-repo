import 'bootstrap/dist/css/bootstrap.min.css';
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

function App() {
  return (
    <div className="App">
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

        {/* Admin */}

        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={Signup} />
        <Route path='/loanview' Component={LoanView}/>
        <Route path='/customerform' Component={CustomerForm}/>
        <Route path='/application' Component={ApplyLoan}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
