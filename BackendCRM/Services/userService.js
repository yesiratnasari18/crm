const dbCon = require('../config/dbConfig');
const env = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Use an environment variable for security key
const securityKey = process.env.SESS_SECRET;

// Dashboard: Verify session or JWT token
const dashboard = async (req, res) => {
  // Check if session is available (for session-based authentication)
  if (req.session && req.session.nama) {
    return res.json({ valid: true, nama: req.session.nama });
  }

  // Optionally, verify JWT token (for stateless authentication)
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ status: 401, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, securityKey);
    return res.json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Invalid or expired token' });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sqlQuery = 'SELECT * FROM user WHERE email = ?';
    dbCon.query(sqlQuery, [email], async (error, data) => {
      if (error) {
        return res.status(500).json({ status: 500, message: "Database query error", error: error });
      }

      if (data.length === 0) {
        return res.status(400).json({ status: 400, message: "User not found" });
      }

      const user = data[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ status: 400, message: "Incorrect password" });
      }

      const token = jwt.sign({ email: user.email, role: user.roles }, securityKey, { expiresIn: '10s' });

      return res.json({
        status: 200,
        message: "Login successful",
        token: token,
        role: user.roles,
      });
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal server error", error: error });
  }
};


// User Login: Check credentials and generate JWT token
// const userLogin = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login request received:", { email });

//   try {
//     const sqlQuery = 'SELECT * FROM user WHERE email = ?';
//     dbCon.query(sqlQuery, [email], async (error, data) => {
//       if (error) {
//         console.error("Database query error:", error);
//         return res.status(500).json({ status: 500, message: "Database query error", error: error });
//       }

//       if (data.length === 0) {
//         console.log("User not found for email:", email);
//         return res.status(400).json({ status: 400, message: "User not found" });
//       }

//       const user = data[0];
//       console.log("User data fetched from database:", user);

//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         console.log("Incorrect password for email:", email);
//         return res.status(400).json({ status: 400, message: "Incorrect password" });
//       }

//       if (!user.roles) {
//         console.error("Role is missing for user:", user.email);
//         return res.status(500).json({ status: 500, message: "Role not found for the user" });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ email: user.email, role: user.roles }, securityKey, { expiresIn: '10s' });
//       console.log("Token generated successfully:", token);

//       return res.json({
//         status: 200,
//         message: "Login successful",
//         token: token,
//         role: user.roles,
//         loginMessage: "You have logged in successfully!"
//       });
//     });
//   } catch (error) {
//     console.error("Internal server error:", error);
//     return res.status(500).json({
//       status: 500,
//       message: "Internal server error",
//       error: error,
//     });
//   }
// };



const userData = async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, securityKey, (err, user) => {
      if (err) {
        return res.status(401).json({ status: "error", message: "Token expired or invalid", error: err });
      }
      return user;
    });

    if (!user) {
      return res.status(401).json({ status: "error", message: "Invalid token" });
    }

    const useremail = user.email;
    const sqlQuery = 'SELECT * FROM user WHERE email = ?';

    dbCon.query(sqlQuery, [useremail], (error, data) => {
      if (error) {
        return res.status(500).json({ status: "error", message: "Database query error", error });
      }

      if (data.length === 0) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      res.json({ status: "ok", message: "Weclcome to dashboard", data: data[0] });
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error,
    });
  }
};

const getKontak = (req, res) => {
  const query = `
            SELECT 
        kontak.id_contact AS id,
        kontak.nama,
        kontak.perusahaan,
        kontak.no_telp,
        kontak.email,
        kontak.alamat,
        kontak.produk,
        kontak.jumlah,
        kontak.harga,
        kontak.catatan,
        list.nama_list AS status,
        JSON_OBJECT(
            'title', sektor.nama_sektor,
            'bg', sektor.bg_color,  -- Correct field for background color
            'text', sektor.text_color  -- Correct field for text color
        ) AS sektor
    FROM 
        kontak
    LEFT JOIN 
        sektor ON kontak.id_sektor = sektor.id_sektor
    LEFT JOIN 
        list ON kontak.id_list = list.id_list;
    `;

  dbCon.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching tasks:', error);
      return res.status(500).json({ status: 'error', message: 'Error fetching tasks', error });
    }

    // Parse sektor JSON for each contact
    const tasks = results.map(task => ({
      ...task,
      sektor: task.sektor ? JSON.parse(task.sektor) : null,
    }));

    res.status(200).json({ status: 'ok', tasks });
  });
};

const getKontakCount = (req, res) => {
  // Define the SQL queries correctly
  const queryTotalKontak = `
    SELECT COUNT(*) AS total_contacts
    FROM kontak;
  `;
  const queryTotalPenjualan = `
    SELECT SUM(harga) AS total_penjualan 
    FROM kontak;
`;
  const querySummary = `
    SELECT COUNT(*) AS total_leads 
    FROM kontak;
  `;

  // Execute the first query
  dbCon.query(queryTotalKontak, (error, results) => {
    if (error) {
      console.error('Error fetching total contacts:', error);
      return res.status(500).json({ status: 'error', message: 'Error fetching total contacts', error });
    }

    const totalContacts = results[0].total_contacts;

    // Execute the second query
    dbCon.query(queryTotalPenjualan, (error, results) => {
      if (error) {
        console.error('Error fetching total sales:', error);
        return res.status(500).json({ status: 'error', message: 'Error fetching total sales', error });
      }

      const totalPenjualan = results[0].total_penjualan;

      // Execute the third query
      dbCon.query(querySummary, (error, results) => {
        if (error) {
          console.error('Error fetching total leads:', error);
          return res.status(500).json({ status: 'error', message: 'Error fetching total leads', error });
        }

        const totalLeads = results[0].total_leads;

        // Respond with the combined result
        res.status(200).json({
          status: 'ok',
          total_contacts: totalContacts,
          total_penjualan: totalPenjualan,
          total_leads: totalLeads
        });
      });
    });
  });
};



// Add new contact
// Tambah Kontak
const addKontak = (req, res) => {
  const { nama, perusahaan, email, no_telp, alamat, tag } = req.body;

  const sqlQuery = 'INSERT INTO kontak (nama, perusahaan, email, no_telp, alamat, tag) VALUES (?, ?, ?, ?, ?, ?)';
  dbCon.query(sqlQuery, [nama, perusahaan, email, no_telp, alamat, tag], (error, results) => {
    if (error) {
      console.error("Error while adding contact:", error);
      return res.status(500).json({ status: 500, message: "Error adding contact", error });
    }

    return res.status(201).json({ status: 201, message: "Contact added successfully", contactId: results.insertId });
  });
};




// Delete contact
// Hapus Kontak
const deleteKontak = (req, res) => {
  const { id } = req.params;  // Extract ID from the URL parameter
  if (!id) {
    return res.status(400).json({ status: 400, message: "Contact ID is required" });
  }

  const sqlQuery = 'DELETE FROM kontak WHERE id_contact = ?';
  dbCon.query(sqlQuery, [id], (error, results) => {
    if (error) {
      console.error("Error while deleting contact:", error);
      return res.status(500).json({ status: 500, message: "Error deleting contact", error });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ status: 404, message: "Contact not found" });
    }

    return res.status(200).json({ status: 200, message: "Contact deleted successfully" });
  });
};


const getColumns = (req, res) => {
  const queryColumns = "SELECT * FROM list";

  dbCon.query(queryColumns, (err, columns) => {
    if (err) {
      console.error("Error while fetching columns:", err);
      return res.status(500).json({ error: "Error fetching columns", details: err.message });
    }

    const columnsWithTasksPromises = columns.map((column) => {
      const queryTasks = `
                SELECT k.*, s.nama_sektor, s.bg_color, s.text_color
                FROM kontak k
                LEFT JOIN sektor s ON k.id_sektor = s.id_sektor
                WHERE k.id_list = ?
            `;
      return new Promise((resolve, reject) => {
        dbCon.query(queryTasks, [column.id_list], (err, tasks) => {
          if (err) {
            return reject(err);
          }
          resolve({
            id: column.id_list,
            name: column.nama_list,
            tasks: tasks.map(task => ({
              id_contact: task.id_contact,
              id_list: task.id_list,
              nama: task.nama,
              perusahaan: task.perusahaan,
              email: task.email,
              no_telp: task.no_telp,
              alamat: task.alamat,
              produk: task.produk,
              jumlah: task.jumlah,
              harga: task.harga,
              catatan: task.catatan,
              sektor: {
                title: task.nama_sektor || "No Sector",
                bg: task.bg_color || "#f0f0f0",
                text: task.text_color || "#000",
              },
            })) || [],
          });
        });
      });
    });

    Promise.all(columnsWithTasksPromises)
      .then((columnsWithTasks) => {
        res.status(200).json({ status: "ok", columns: columnsWithTasks });
      })
      .catch((err) => {
        console.error("Error while fetching tasks for columns:", err);
        res.status(500).json({ error: "Error fetching tasks for columns", details: err.message });
      });
  });
};


const getSektor = async (req, res) => {
  try {
    const sektorQuery = 'SELECT * FROM sektor';
    dbCon.query(sektorQuery, (err, results) => {
      if (err) {
        console.error('Error fetching sektor data:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ sektor: results });
    });
  } catch (error) {
    console.error('Unexpected error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// const addCont = async (req, res) => {
//   const {
//     nama,
//     perusahaan,
//     email,
//     no_telp,
//     alamat,
//     produk,
//     jumlah,
//     harga,
//     catatan,
//     columnId, // id_list dari frontend
//     sektorId
//   } = req.body;

//   // Set id_list default ke 1 jika tidak disediakan
//   const idList = columnId || 1;

//   if (!nama || !sektorId) {
//     return res.status(400).json({ error: "Nama dan Sektor wajib diisi!" });
//   }

//   const query = `
//         INSERT INTO kontak 
//         (nama, perusahaan, email, no_telp, alamat, produk, jumlah, harga, catatan, id_list, id_sektor) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   const values = [
//     nama,
//     perusahaan,
//     email,
//     no_telp,
//     alamat,
//     produk,
//     jumlah,
//     harga,
//     catatan,
//     idList, // Menggunakan id_list default jika columnId tidak disediakan
//     sektorId
//   ];

//   try {
//     dbCon.query(query, values, (err, result) => {
//       if (err) {
//         console.error("Error inserting task:", err.message);
//         return res.status(500).json({ error: "Error inserting task", details: err.message });
//       }

//       const insertedTaskId = result.insertId;

//       // Fetch sektor details for the response
//       const sektorQuery = "SELECT * FROM sektor WHERE id_sektor = ?";
//       dbCon.query(sektorQuery, [sektorId], (sektorErr, sektorResult) => {
//         if (sektorErr) {
//           console.error("Error fetching sektor details:", sektorErr.message);
//           return res.status(500).json({ error: "Error fetching sektor details", details: sektorErr.message });
//         }

//         const sektor = sektorResult[0] || {
//           nama_sektor: "No Sector",
//           bg_color: "#f0f0f0",
//           text_color: "#000",
//         };

//         res.status(200).json({
//           status: "ok",
//           contactId: insertedTaskId,
//           nama,
//           perusahaan,
//           email,
//           no_telp,
//           alamat,
//           produk,
//           jumlah,
//           harga,
//           catatan,
//           sektor: {
//             nama_sektor: sektor.nama_sektor,
//             bg_color: sektor.bg_color,
//             text_color: sektor.text_color,
//           },
//         });
//       });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error.message);
//     res.status(500).json({ error: "Unexpected error", details: error.message });
//   }
// };

const addCont = async (req, res) => {
  const {
    nama,
    perusahaan,
    email,
    no_telp,
    alamat,
    produk,
    jumlah,
    harga,
    catatan,
    add_date,
    columnId, // id_list from frontend
    sektorId,
  } = req.body;

  // Default columnId to 1 if not provided
  const idList = columnId || 1;

  // Check if nama and sektorId are present
  if (!nama || !sektorId) {
    return res.status(400).json({ error: "Nama dan Sektor wajib diisi!" });
  }

  // Log values for debugging
  console.log({
    nama,
    perusahaan,
    email,
    no_telp,
    alamat,
    produk,
    jumlah,
    harga,
    catatan,
    add_date,
    idList,
    sektorId,
  });

  const query = `
        INSERT INTO kontak 
        (nama, perusahaan, email, no_telp, alamat, produk, jumlah, harga, catatan, add_date, id_list, id_sektor ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    nama,
    perusahaan,
    email,
    no_telp,
    alamat,
    produk,
    jumlah,
    harga,
    catatan,
    add_date,
    idList,
    sektorId,
  ];

  try {
    dbCon.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting task:", err.message);
        return res.status(500).json({ error: "Error inserting task", details: err.message });
      }

      const insertedTaskId = result.insertId;

      // Fetch sector details
      const sektorQuery = "SELECT * FROM sektor WHERE id_sektor = ?";
      dbCon.query(sektorQuery, [sektorId], (sektorErr, sektorResult) => {
        if (sektorErr) {
          console.error("Error fetching sector details:", sektorErr.message);
          return res.status(500).json({ error: "Error fetching sector details", details: sektorErr.message });
        }

        const sektor = sektorResult[0] || {
          nama_sektor: "No Sector",
          bg_color: "#f0f0f0",
          text_color: "#000",
        };

        res.status(200).json({
          status: "ok",
          contactId: insertedTaskId,
          nama,
          perusahaan,
          email,
          no_telp,
          alamat,
          produk,
          jumlah,
          harga,
          catatan,
          add_date,
          sektor: {
            nama_sektor: sektor.nama_sektor,
            bg_color: sektor.bg_color,
            text_color: sektor.text_color,
          },
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Unexpected error", details: error.message });
  }
};


const updateKontak = (req, res) => {
  const {
    id, nama, perusahaan, no_telp, email, alamat, produk, jumlah, harga, catatan,
  } = req.body;

  const query = `
      UPDATE kontak
      SET 
          nama = ?,
          perusahaan = ?,
          no_telp = ?,
          email = ?,
          alamat = ?,
          produk = ?,
          jumlah = ?,
          harga = ?
      WHERE id_contact = ?;
    `;

  db.query(
    query,
    [nama, perusahaan, no_telp, email, alamat, produk, jumlah, harga, catatan, id],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ status: "error", message: "Failed to update data" });
      }
      res.json({ status: "ok", message: "Data updated successfully" });
    }
  );
};


// PATCH /user/task/move
const moveTask = async (req, res) => {
  const { taskId, fromColumnId, toColumnId } = req.body;
  try {
    // Update the task's column ID in the database
    const task = await Task.update({ id_list: toColumnId }, {
      where: { id_contact: taskId, id_list: fromColumnId }
    });

    if (task[0] > 0) {
      res.json({ status: 'ok', message: 'Task moved successfully' });
    } else {
      res.status(400).json({ status: 'error', message: 'Task not found or column mismatch' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

const reorderTask = async (req, res) => {
  const { taskId, columnId, newIndex } = req.body;
  try {
    // Update the task's order within the same column
    const task = await Task.update({ index: newIndex }, {
      where: { id_contact: taskId, id_list: columnId }
    });

    if (task[0] > 0) {
      res.json({ status: 'ok', message: 'Task reordered successfully' });
    } else {
      res.status(400).json({ status: 'error', message: 'Task not found or column mismatch' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};


const updateCont = (req, res) => {
  const { id } = req.params;
  const { 
    nama, 
    perusahaan, 
    email, 
    no_telp, 
    alamat, 
    produk, 
    jumlah, 
    harga, 
    catatan, 
    id_sektor // Ensure the id_sektor is passed
  } = req.body;

  const query = `
    UPDATE kontak
    SET 
      nama = ?, 
      perusahaan = ?, 
      email = ?, 
      no_telp = ?, 
      alamat = ?, 
      produk = ?, 
      jumlah = ?, 
      harga = ?, 
      catatan = ?, 
      id_sektor = ? 
    WHERE id_contact = ?
  `;

  dbCon.query(
    query,
    [nama, perusahaan, email, no_telp, alamat, produk, jumlah, harga, catatan, id_sektor, id], 
    (err, result) => {
      if (err) {
        console.error("Error updating contact:", err);
        return res.status(500).json({ error: "Failed to update contact" });
      }

      res.json({ status: "ok", message: "Contact updated successfully" });
    }
  );
};




const getUsers = (req, res) => {
  const query = "SELECT * FROM user";
  dbCon.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(result);
  });
};


const addUser = (req, res) => {
  const { nama, email, password, roles } = req.body;

  // Validasi data input
  if (!nama || !email || !password || !roles) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO user (nama, email, password, roles) VALUES (?, ?, ?, ?)";
  dbCon.query(query, [nama, email, password, roles], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "User added successfully", userId: result.insertId });
  });
};



const updateUser = (req, res) => {
  const { id } = req.params;
  const { nama, email, password, roles } = req.body;

  if (!nama || !email || !password || !roles) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "UPDATE user SET nama = ?, email = ?, password = ?, roles = ? WHERE id_user = ?";

  dbCon.query(query, [nama, email, password, roles, id], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};



const deleteUser = (req, res) => {
  const { id } = req.params;

  // First, check if the user exists in the database
  const checkUserQuery = "SELECT * FROM user WHERE id_user = ?";
  dbCon.query(checkUserQuery, [id], (err, result) => {
    if (err) {
      console.error("Error checking if user exists:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Proceed to delete the user
    const deleteQuery = "DELETE FROM user WHERE id_user = ?";
    dbCon.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: "Database error" });
      }

      console.log(`User with ID ${id} deleted successfully`);
      res.status(200).json({ message: "User deleted successfully" });
    });
  });
};

const updateTaskListHandler = (req, res) => {
  // Mengambil taskId dan newListId dari body permintaan
  const { taskId, newListId } = req.body;

  // Validasi input
  if (!taskId || !newListId) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input: taskId and newListId are required.',
    });
  }

  // Query untuk memperbarui kolom id_list pada tabel kontak
  const sqlQuery = 'UPDATE kontak SET id_list = ? WHERE id_contact = ?';

  dbCon.query(sqlQuery, [newListId, taskId], (error, results) => {
    if (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to update task.',
        details: error.message, // Berikan detail kesalahan untuk debugging
      });
    }

    if (results.affectedRows === 0) {
      // Jika tidak ada baris yang diperbarui, berarti taskId tidak ditemukan
      return res.status(404).json({
        status: 'error',
        message: 'Task not found or no changes made.',
      });
    }

    // Jika berhasil diperbarui
    res.status(200).json({
      status: 'ok',
      message: 'Task updated successfully.',
    });
  });
};

const getBobot = (req, res) => {
  const query = "SELECT * FROM bobot";

  dbCon.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results); // Mengembalikan hasil dalam format JSON
  });
};


const updateBobot = (req, res) => {
  const { id_bobot } = req.params;
  const { kriteria, nilai } = req.body;

  // Validate the input fields
  if (!kriteria || !nilai) {
    return res.status(400).json({ error: 'Both Kriteria and Nilai are required' });
  }

  // Define the query to update the bobot record in the database
  const query = "UPDATE bobot SET kriteria = ?, nilai = ? WHERE id_bobot = ?";

  // Execute the query with the provided values
  dbCon.query(query, [kriteria, nilai, id_bobot], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Internal server error while updating bobot' });
    }

    // Check if any rows were affected (i.e., if the bobot with the given ID was found)
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Bobot with the specified ID not found' });
    }

    // Send a success response with the updated data
    res.status(200).json({
      message: 'Bobot updated successfully',
      id_bobot,
      kriteria,
      nilai
    });
  });
};


const getDataFromDatabase = (id_list, id_sektors, column) => {
  return new Promise((resolve, reject) => {
    const placeholders = id_sektors.map(() => '?').join(',');
    db.query(`
      SELECT SUM(${column}) AS total
      FROM kontak
      WHERE id_list = ? AND id_sektor IN (${placeholders})`,
      [id_list, ...id_sektors],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]?.total || 0); // Ensure results[0] exists before accessing total
      }
    );
  });
};

const getJumlahTransaksi = (id_list, id_sektors) => {
  return new Promise((resolve, reject) => {
    const placeholders = id_sektors.map(() => '?').join(',');
    db.query(`
      SELECT COUNT(DISTINCT id_sektor) AS jumlah_transaksi
      FROM kontak
      WHERE id_list = ? AND id_sektor IN (${placeholders})`,
      [id_list, ...id_sektors],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]?.jumlah_transaksi || 0);
      }
    );
  });
};

const evaluateKriteria = (jumlah_pembelian, jumlah_nilai, bobot) => {
  const kriteria1 = bobot[0]?.nilai <= jumlah_pembelian ? "Yes" : "No";
  const kriteria2 = bobot[1]?.nilai <= jumlah_nilai ? "Yes" : "No";
  return { kriteria1, kriteria2 };
};

const evaluateKriteria3 = (kriteria1, kriteria2) => {
  if (kriteria1 === "Yes" && kriteria2 === "Yes") {
    return "Peluang";
  } else if (kriteria1 === "Yes" && kriteria2 === "No") {
    return "Peluang dan gali lagi";
  } else if (kriteria1 === "No" && kriteria2 === "Yes") {
    return "Peluang dan dicoba lagi";
  } else {
    return "Sedikit peluangnya";
  }
};

const evaluate = async (req, res) => {
  const id_list = 4; // Can be passed dynamically if needed

  const id_sektors = req.query.id_sektors;
  if (!id_sektors || !Array.isArray(id_sektors) || id_sektors.length === 0) {
    return res.status(400).json({ error: 'id_sektors is required and must be an array of values' });
  }

  try {
    const jumlah_pembelian = await getDataFromDatabase(id_list, id_sektors, 'jumlah');
    const jumlah_nilai = await getDataFromDatabase(id_list, id_sektors, 'harga');
    const jumlah_transaksi = await getJumlahTransaksi(id_list, id_sektors);

    const bobot = await getBobot(); // Ensure this function fetches the 'bobot' from your database

    const { kriteria1, kriteria2 } = evaluateKriteria(jumlah_pembelian, jumlah_nilai, bobot);
    const kriteria3 = evaluateKriteria3(kriteria1, kriteria2);

    const sektorDetails = id_sektors.map(sektor => {
      // The sector colors and titles can be managed in a dictionary
      const sektorMapping = {
        'Manufaktur': { title: "Manufaktur", bg: "#C1FFC1", text: "#000000" },
        'Retail': { title: "Retail", bg: "#FFE4C1", text: "#000000" },
        // Add other sectors here...
      };

      return sektorMapping[sektor] || { title: sektor, bg: "#FFFFFF", text: "#000000" }; // Default case
    });

    const response = {
      jumlah_pembelian,
      jumlah_nilai,
      jumlah_transaksi,
      kriteria1,
      kriteria2,
      kriteria3,
      sektor_title: sektorDetails.map(sektor => sektor.title),
      sektor_bg: sektorDetails.map(sektor => sektor.bg),
      sektor_text: sektorDetails.map(sektor => sektor.text),
    };

    res.json(response);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAnalysis = (req, res) => {
  const listId = req.params.listId; // Assuming the list ID is passed as a URL parameter

  // Log the listId to verify it's being passed correctly
  console.log('List ID:', listId);

  // Fetch all sectors
  const querySektor = 'SELECT * FROM sektor';

  dbCon.query(querySektor, (err, sectors) => {
    if (err) {
      console.error("Error while fetching sektor data:", err);
      return res.status(500).json({ error: "Error fetching sektor data", details: err.message });
    }

    // Fetch the necessary data grouped by 'id_sektor' from the 'kontak' table, for id_list = 5 only
    const queryKontakPerSektor = `
          SELECT 
              k.id_sektor, 
              IFNULL(SUM(CASE WHEN k.jumlah > 0 THEN k.jumlah ELSE 0 END), 0) AS total_pembelian, 
              IFNULL(SUM(CASE WHEN k.harga REGEXP '^[0-9]+$' THEN CAST(k.harga AS DECIMAL(10, 2)) ELSE 0 END), 0) AS total_nilai, 
              IFNULL(COUNT(DISTINCT k.id_contact), 0) AS total_transaksi
          FROM kontak k
          WHERE k.id_list = ?  -- Filter by listId
          GROUP BY k.id_sektor`;

    dbCon.query(queryKontakPerSektor, [4], (err, result) => {  // Ensure the list ID is 5
      if (err) {
        console.error("Error while fetching kontak data by sektor:", err);
        return res.status(500).json({ error: "Error fetching kontak data by sektor", details: err.message });
      }

      // Log the query result for debugging
      console.log('Kontak Data Per Sektor:', result);

      // Fetch the criteria weights from 'bobot' table
      const queryBobot = 'SELECT * FROM bobot';
      dbCon.query(queryBobot, (err, bobot) => {
        if (err) {
          console.error("Error while fetching bobot data:", err);
          return res.status(500).json({ error: "Error fetching bobot data", details: err.message });
        }

        // Log the criteria weights for debugging
        console.log('Bobot Data:', bobot);

        // Create a map of sektor results by id_sektor for quick lookup
        const resultMap = result.reduce((acc, sektor) => {
          acc[sektor.id_sektor] = sektor;
          return acc;
        }, {});

        // Process each sector and ensure defaults of 0
        const sektorAnalysis = sectors.map((sektor) => {
          const { id_sektor, nama_sektor } = sektor;
          const sektData = resultMap[id_sektor] || { total_pembelian: 0, total_nilai: 0, total_transaksi: 0 };

          const { total_pembelian, total_nilai, total_transaksi } = sektData;

          // Log data for debugging
          console.log(`Sektor: ${nama_sektor}, Pembelian: ${total_pembelian}, Nilai: ${total_nilai}, Transaksi: ${total_transaksi}`);

          // Apply the criteria logic for each sektor
          const kriteria1 = bobot.find(b => b.id_bobot === 1) && total_pembelian >= bobot.find(b => b.id_bobot === 1).nilai ? "Yes" : "No";
          const kriteria2 = bobot.find(b => b.id_bobot === 2) && total_nilai >= bobot.find(b => b.id_bobot === 2).nilai ? "Yes" : "No";
          const kriteria3 = (kriteria1 === "Yes" && kriteria2 === "Yes") ? "Peluang"
            : (kriteria1 === "Yes" && kriteria2 === "No") ? "Peluang dan gali lagi"
              : (kriteria1 === "No" && kriteria2 === "Yes") ? "Peluang dan dicoba lagi"
                : "Sedikit peluangnya";

          return {
            id_sektor,
            nama_sektor,
            total_pembelian: total_pembelian || 0, // Default to 0 if empty
            total_nilai: total_nilai || 0,         // Default to 0 if empty
            total_transaksi: total_transaksi || 0, // Default to 0 if empty
            kriteria1,
            kriteria2,
            kriteria3,
          };
        });

        // Respond with the analysis for each sector
        res.status(200).json({
          status: "ok",
          analysis: sektorAnalysis,
        });
      });
    });
  });
};


const getSalesReport = (req, res) => {
  const query = `
    SELECT 
      k.id_contact, k.nama, k.perusahaan, k.email, k.no_telp, k.alamat, k.produk, 
      k.jumlah, k.harga,
      (k.jumlah * k.harga) AS total_sales
    FROM kontak k
    WHERE k.id_list = 4
  `;

  dbCon.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching sales data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }

    // Calculate total sales for all records
    const totalSales = results.reduce((acc, row) => acc + (row.jumlah * row.harga), 0);

    // Send response with sales data and total sales
    res.json({
      data: results,
      totalSales: totalSales,
    });
  });
};

const searchHandler = (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }

  const searchQuery = `%${query}%`;

  const sql = `
    SELECT 
      'kontak' AS source,
      k.id_contact AS id,
      k.nama AS name,
      k.email AS email,
      k.perusahaan AS company,
      k.no_telp AS phone,
      k.alamat AS address,
      k.produk AS product,
      k.jumlah AS quantity,
      k.harga AS price,
      k.catatan AS note
    FROM kontak k
    WHERE k.nama LIKE ? OR 
          k.email LIKE ? OR 
          k.perusahaan LIKE ? OR 
          k.no_telp LIKE ? OR 
          k.alamat LIKE ? OR 
          k.produk LIKE ?
    UNION
    SELECT 
      'list' AS source,
      l.id_list AS id,
      l.nama_list AS name,
      NULL AS email,
      NULL AS company,
      NULL AS phone,
      NULL AS address,
      NULL AS product,
      NULL AS quantity,
      NULL AS price,
      NULL AS note
    FROM list l
    WHERE l.nama_list LIKE ?
    UNION
    SELECT 
      'sektor' AS source,
      s.id_sektor AS id,
      s.nama_sektor AS name,
      NULL AS email,
      NULL AS company,
      NULL AS phone,
      NULL AS address,
      NULL AS product,
      NULL AS quantity,
      NULL AS price,
      NULL AS note
    FROM sektor s
    WHERE s.nama_sektor LIKE ?
    UNION
    SELECT 
      'user' AS source,
      u.id_user AS id,
      u.nama AS name,
      u.email AS email,
      NULL AS company,
      NULL AS phone,
      NULL AS address,
      NULL AS product,
      NULL AS quantity,
      NULL AS price,
      NULL AS note
    FROM user u
    WHERE u.nama LIKE ? OR 
          u.email LIKE ?
  `;

  // Menjalankan query dengan parameter pencarian
  dbCon.query(sql, [
    searchQuery, searchQuery, searchQuery, searchQuery, searchQuery, searchQuery,
    searchQuery, searchQuery,
    searchQuery, searchQuery,
    searchQuery, searchQuery
  ], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json({ results });
  });
};

// Then, you would use it in your app like this:



module.exports = { userLogin, dashboard, userData, getKontak, updateKontak, addKontak, deleteKontak, getColumns, addCont, moveTask, reorderTask, updateCont, getSektor, getUsers, addUser, updateUser, deleteUser, updateTaskListHandler, getBobot, updateBobot, evaluate, getAnalysis, getKontakCount, getSalesReport, searchHandler };
