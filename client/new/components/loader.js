import React from 'react';
import PropTypes from 'prop-types';
import { PulseLoader } from 'react-spinners';
import { Collapse } from 'reactstrap';

export default function Loader(props) {
  return (
    <Collapse isOpen={!props.drop}>
      <h3>Loading...</h3>
      <PulseLoader />
    </Collapse>
  );
}

Loader.propTypes = {
  drop: PropTypes.bool.isRequired,
};
