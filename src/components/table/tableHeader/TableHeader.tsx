// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: any, // You can keep 'any' here for more flexibility
};

const TableHeader = ({ children }: Props) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableHeader;
