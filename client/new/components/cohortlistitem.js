import React from 'react';
import { Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

function CohortListItem(props) {
  const cohortList = props.cohorts;
  return (
    <span>
      {cohortList.map(cohort => (
        <Col key={cohort.id}>
          <Button
            outline
            color="primary"
            key={cohort.id}
            value={cohort.cohort.members}
            onClick={this.getMembers}
          >
            {cohort.cohort.name}
          </Button>
        </Col>
      ))}
    </span>
  );
}

CohortListItem.proptypes = {
  cohorts: PropTypes.array.isRequired,
};

export default CohortListItem;
