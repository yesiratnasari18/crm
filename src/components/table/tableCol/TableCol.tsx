// Change the file extension to .tsx for TypeScript

import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface Props {
  children: ReactNode; // Use ReactNode in TypeScript
}

const TableBody: React.FC<Props> = ({ children }) => <tbody>{children}</tbody>;

TableBody.displayName = 'TableBody';

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableBody;
