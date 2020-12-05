import React from "react";
import PropTypes from 'prop-types'

import { Spin } from "antd";
import styles from "./Spinner.module.scss";

const Spinner = ({ size = "large" }) => {
  return (
    <div className={styles.Spinner}>
      <Spin size={size} />
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string
}

export default Spinner;
