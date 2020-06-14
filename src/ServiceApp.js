import React from 'react';
import { useSelector } from 'react-redux';

import Sidebar from './components/Sidebar';
import Routes from './Routes';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const ServiceApp = () => {
  const auth = useSelector(state => state.auth);

  return auth.isAuthResolved ? (
    <>
      <Navbar loadFresh auth={auth} id="navbar-main" />
      <Navbar auth={auth} id="navbar-clone" />
      <Sidebar />
      <Routes />
    </>
  ) : (
    <Spinner />
  );
};

export default ServiceApp;

// import React from 'react';
// import { connect } from 'react-redux';

// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Routes from './Routes';
// import Spinner from './components/Spinner';

// import { logout } from './actions';

// class ServiceApp extends React.Component {
//   handleLogout = () => this.props.dispatch(logout());

//   renderApplication = auth => (
//     <React.Fragment>
//       <Navbar
//         loadFresh
//         id="navbar-main"
//         logout={this.handleLogout}
//         auth={auth}
//       />
//       <Navbar auth={auth} logout={this.handleLogout} id="navbar-clone" />
//       <Sidebar />
//       <Routes />
//     </React.Fragment>
//   );

//   render() {
//     const { auth } = this.props;
//     return auth.isAuthResolved ? this.renderApplication(auth) : <Spinner />;
//   }
// }

// const mapStateToProps = state => ({ auth: state.auth });

// export default connect(mapStateToProps)(ServiceApp);
