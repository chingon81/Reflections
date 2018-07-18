import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'reactstrap';

function StudentListItem(props) {
  function formatButton(person, color, getStudent = props.getStudent) {
    return (
      <Col key={person[0][0]}>
        <Button
          outline
          color={color}
          onClick={getStudent}
          value={JSON.stringify(person)}
        >
          {person[0][1]}
        </Button>
      </Col>
    );
  }

  const buttons = props.members.map((person) => {
    if (person[0][2] === 0) return formatButton(person, 'secondary');
    else if (person[0][2] === 1) return formatButton(person, 'warning');
    else if (person[0][2] === 2) return formatButton(person, 'success');
    return null;
  });

  return <span>{buttons.map((item) => item)}</span>;
}

StudentListItem.propTypes = {
  members: PropTypes.array.isRequired,
  getStudent: PropTypes.func.isRequired,
};

export default StudentListItem;
