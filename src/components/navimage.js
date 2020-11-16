/**
 * Wrap an image tag as a React component to allow router linking.
 */

import React from 'react';
import { useHistory } from 'react-router-dom';

const NavImage = (props) => {
    const history = useHistory();
    return <img alt={props.alt} src={props.src} onClick={() => history.push(props.to)} />;
}
export default NavImage;
