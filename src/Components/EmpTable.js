import React, { useState } from "react";

const EmpTable = () => {
  const [editEmp, setEditEmp] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: "", 
    department: "", 
    email: "", 
    state: "" 
  });
  const [empList, setEmpList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    state: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
// function for add operation 
  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required!");
    if (!form.department.trim()) return alert("Department is required!");
    if (!form.email.trim()) return alert("Email is required!");
    if (!form.state.trim()) return alert("State is required!");

    const newEmp = {
      id: Date.now(),
      ...form
    };
    setEmpList([...empList, newEmp]);
    setForm({ name: "", department: "", email: "", state: "" });
  };

  // delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmpList(empList.filter(emp => emp.id !== id));
    }
  };
// edit form function 
  const handleEditClick = (emp) => {
    setEditEmp(emp.id);
    setEditForm({
      name: emp.name,
      department: emp.department,
      email: emp.email,
      state: emp.state,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setEmpList(
      empList.map(emp =>
        emp.id === editEmp ? { ...emp, ...editForm } : emp
      )
    );
    setEditEmp(null);
  };

  const handleEditCancel = () => {
    setEditEmp(null);
  };

  return (
    <div className="container">
      {/* Add Form */}
      <div className="container-fluid border mb-5 p-4">
        <h4 className="text-center text-info mb-4 border-bottom border-top pb-2">Add Employee</h4>
        <form className="row justify-content-center" onSubmit={handleAdd}>
          <div className="col-md-2 mb-2">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2 mb-2">
            <input
              type="text"
              className="form-control"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2 mb-2">
            <input
              type="text"
              className="form-control"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-2 mb-2 d-flex align-items-center">
            <button type="submit" className="btn btn-success w-100">
              Add
            </button>
          </div>
        </form>
      </div>



      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-primary text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">No employees found.</td>
              </tr>
            ) : (
              empList.map((emp, index) => (
                <tr key={emp.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>
                  <td>{emp.state}</td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-warning me-1" 
                      onClick={() => handleEditClick(emp)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* popup */}
      {editEmp !== null && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleEditSave}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Employee</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleEditCancel}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="name"
                      placeholder="Name"
                      value={editForm.name}
                      onChange={handleEditChange}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      name="department"
                      placeholder="Department"
                      value={editForm.department}
                      onChange={handleEditChange}
                    />
                    <input
                      type="email"
                      className="form-control mb-2"
                      name="email"
                      placeholder="Email"
                      value={editForm.email}
                      onChange={handleEditChange}
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      placeholder="State"
                      value={editForm.state}
                      onChange={handleEditChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleEditCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpTable;