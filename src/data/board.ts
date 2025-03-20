import React, { useState } from 'react';

interface Task {
  id_contact: number;
  nama: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  id_list: number;
}

interface Columns {
  [key: string]: {
    name: string;
    items: Task[];
  };
}

const App = () => {
  const [columns, setColumns] = useState<Columns>({
    prospect: { name: 'Prospect', items: [] },
    contacting: { name: 'Contacting', items: [] },
    discussion: { name: 'Discussion', items: [] },
    negotiation: { name: 'Negotiation', items: [] },
    complete: { name: 'Complete', items: [] },
  });
};

export default App;
