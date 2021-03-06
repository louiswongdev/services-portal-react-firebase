// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ServiceItem from '../components/service/ServiceItem';
import Hero from '../components/Hero';
import { fetchServices } from '../actions';

function Home() {
  const services = useSelector(state => state.services.all);
  const dispatch = useDispatch();

  // const loadServices = useCallback(async () => {
  //   try {
  //     await dispatch(fetchServices());
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  const loadServices = useCallback(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const renderServices = services =>
    services.map(service => <ServiceItem key={service.id} service={service} />);

  return (
    <div>
      <Hero />

      <section className="section section-feature-grey is-medium">
        <div className="container">
          <div className="title-wrapper has-text-centered">
            <h2 className="title is-2">Great Power Comes </h2>
            <h3 className="subtitle is-5 is-muted">
              With great Responsability
            </h3>
            <div className="divider is-centered"></div>
          </div>

          <div className="content-wrapper">
            <div className="columns is-multiline">
              {renderServices(services)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

// class Home extends React.Component {
//   state = {
//     services: [],
//   };

//   componentDidMount() {
//     this.props.dispatch(fetchServices());
//   }

//   renderServices = services =>
//     services.map(service => <ServiceItem key={service.id} service={service} />);

//   render() {
//     const { services } = this.props;
//     return (
//       <div>
//         <Hero />
//         <section className="section section-feature-grey is-medium">
//           <div className="container">
//             <div className="title-wrapper has-text-centered">
//               <h2 className="title is-2">Great Power Comes </h2>
//               <h3 className="subtitle is-5 is-muted">
//                 With great Responsability
//               </h3>
//               <div className="divider is-centered"></div>
//             </div>

//             <div className="content-wrapper">
//               <div className="columns">{this.renderServices(services)}</div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({ services: state.services.all });

// export default connect(mapStateToProps)(Home);
