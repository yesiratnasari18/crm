// Change the file extension to .tsx for TypeScript

import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Table: React.FC<Props> = ({ children }) => (
  <table className="table table-hover">{children}</table>
);

Table.displayName = 'Table';

export default Table;
