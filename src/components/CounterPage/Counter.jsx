import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
// import './Counter.css';

const styles = {
  counterLabel: {
    display: 'inline-block',
    marginRight: '20px',
    fontSize: '20px'
  }
};

const propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number
};

const defaultProps = {
  onClick: () => {},
  value: 0
};

class Counter extends Component {
  render() {
    const { onClick, value } = this.props;

    return (
      <div>
        <div style={styles.counterLabel}>
          Value: {value}
        </div>
        <Button onClick={onClick}>+</Button>
      </div>
    );
  }
}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default Counter;
