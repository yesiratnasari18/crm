export type TaskT = {
	id_contact: string;
	nama: string;
	perusahaan: string;
	email: string;
	no_telp: number;
	alamat?: string;
	tags: { title: string; bg: string; text: string }[];
};

type Column = {
	name: string;
	items: TaskT[];
};

export type Columns = {
	[key: string]: Column;
};


// data.js
export const contacts = [
    { id: 1, name: 'John Doe', company: 'ABC Corp', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', company: 'XYZ Inc', email: 'jane@example.com', phone: '987-654-3210', address: '456 Elm St' },
    // tambahkan kontak lainnya
];



// data.ts
export const leads = [
    { id: 1, name: 'John Doe', status: 'Prospecting', updateDate: '2024-01-15', notes: 'Mengumpulkan informasi awal' },
    { id: 2, name: 'Jane Smith', status: 'Contacting', updateDate: '2024-01-16', notes: 'Email dikirim' },
    { id: 3, name: 'Ali Ahmad', status: 'Discussion', updateDate: '2024-01-17', notes: 'Menyusun proposal' },
    { id: 4, name: 'Rina Sari', status: 'Negotiation', updateDate: '2024-01-18', notes: 'Membahas harga dan syarat' },
    { id: 5, name: 'Budi Santoso', status: 'Complete', updateDate: '2024-01-19', notes: 'Penjualan selesai' },
];

