import { useEffect, useState } from "react";
import { getDb } from "../../FireBase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  FaTrashAlt,
  FaEdit,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

function Dashboard() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [employeeId, setEmployeeId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allData = await getDocs(collection(getDb, "Employees"));
    const array = allData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllEmployees(array);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(getDb, "Employees", id));
    loadData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeId) {
      await updateDoc(doc(getDb, "Employees", employeeId), employee);
    } else {
      await addDoc(collection(getDb, "Employees"), employee);
    }
    setEmployee({});
    setEmployeeId(0);
    loadData();
  };

  const handleUpdate = async (id) => {
    const oneEmployee = await getDoc(doc(getDb, "Employees", id));
    setEmployee(oneEmployee.data());
    setEmployeeId(id);
  };

  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(newOrder);
  };

  const filteredAndSortedEmployees = allEmployees
    .filter(
      (emp) =>
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortBy]?.toLowerCase?.() || "";
      const valB = b[sortBy]?.toLowerCase?.() || "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(
    filteredAndSortedEmployees.length / itemsPerPage
  );
  const paginatedEmployees = filteredAndSortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="dark bg-gray-800 text-gray-100 min-h-screen max-w-screen font-sans">
      <div className="p-6 flex flex-col items-center ">
        

        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 shadow-xl rounded-2xl p-8 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
            {employeeId ? "Edit Employee" : "Add Employee"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Name", type: "text", name: "name" },
              { label: "Email", type: "email", name: "email" },
              { label: "Phone Number", type: "number", name: "phoneNumber" },
              { label: "Date of Birth", type: "date", name: "dob" },
            ].map(({ label, type, name }) => (
              <div key={name} className="mb-6">
                <label className="block text-gray-300 text-xl font-semibold mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={`Enter ${label}`}
                  value={employee[name] || ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg text-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-1.5 text-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
            >
              {employeeId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
        
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-2 my-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2  rounded-lg bg-gray-700 border border-gray-600 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex gap-4">
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="phoneNumber">Sort by Phone Number</option>
              <option value="dob">Sort by DOB</option>
            </select>

            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        
        <div className="w-full mt-12 overflow-x-auto max-w-5xl">
          <table className="min-w-full bg-gray-700 text-white shadow-lg rounded-xl overflow-hidden text-lg md:text-center">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">Date of Birth</th>
                <th className="py-4 px-6">Delete</th>
                <th className="py-4 px-6">Update</th>
              </tr>
            </thead>

            <tbody>
              {paginatedEmployees.map((val) => (
                <tr
                  key={val.id}
                  className="border-b-2 border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-6 capitalize">{val.name}</td>
                  <td className="py-4 px-6">{val.email}</td>
                  <td className="py-4 px-6">{val.phoneNumber}</td>
                  <td className="py-4 px-6">{val.dob}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(val.id)}
                      className="text-red-400 hover:text-red-600 transition text-2xl"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleUpdate(val.id)}
                      className="text-blue-400 hover:text-blue-600 transition text-2xl"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-400 text-xl"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  currentPage === index + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
