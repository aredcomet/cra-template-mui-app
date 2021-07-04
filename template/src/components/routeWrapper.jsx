import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

function RouteWrapper({
  component: Component,
  layout: Layout,
  title,
  ...rest
}) {
  return (
    <Route
    /* eslint react/jsx-props-no-spreading: */
      {...rest}
      render={(props) => (
        <Layout title={title} {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,

};

export default RouteWrapper;
