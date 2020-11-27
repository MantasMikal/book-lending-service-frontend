import React from "react";
import { bool, node, oneOf, string } from "prop-types";
import classNames from "classnames";

import styles from "./Container.module.scss";
export const sizes = ["small", "medium", "large", "wide"];

/**
 * A component used to provide a maximum width for child components.
 * Optionally center-aligned, with preset size values available. Can
 * also provide gutter spacing.
 */
const Container = ({ center, children, className, gutter, fullHeight, size }) => (
  <div
    className={classNames(
      styles.Container,
      center && styles.center,
      gutter && styles.gutter,
      size && styles[size],
      fullHeight && styles.fullHeight,
      className
    )}
  >
    {children}
  </div>
);

Container.propTypes = {
  center: bool,
  children: node.isRequired,
  className: string,
  gutter: bool,
  fullHeight: bool,
  size: oneOf(sizes),
};

export default Container;
