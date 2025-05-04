function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // ========== LIST & DELETE EMPLOYEES ==========
  async function loadEmployees() {
    const response = await fetch('/api/employees');
    const employees = await response.json();
    const tbody = document.querySelector('#employee-table tbody');
    if (!tbody) return;
    tbody.innerHTML = employees.map(emp => `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.designation}</td>
        <td>${emp.salary}</td>
        <td>${emp.joiningDate ? new Date(emp.joiningDate).toLocaleDateString() : ''}</td>
        <td>
          <a href="/edit-employee.html?id=${emp._id}" class="button">Edit</a>
          <button onclick="deleteEmployee('${emp._id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  }
  
  window.deleteEmployee = async function(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    loadEmployees();
  };
  
  // ========== ADD EMPLOYEE ==========
  const addEmployeeForm = document.getElementById('add-employee-form');
  if (addEmployeeForm) {
    addEmployeeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const [name, department, designation, salary, joiningDate] = e.target.elements;
      await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value,
          department: department.value,
          designation: designation.value,
          salary: parseFloat(salary.value),
          joiningDate: joiningDate.value
        })
      });
      window.location.href = '/index.html';
    });
  }
  
  // ========== EDIT EMPLOYEE ==========
  async function loadEmployeeForEdit() {
    const id = getQueryParam('id');
    if (!id) return;
  
    const response = await fetch(`/api/employees`);
    const employees = await response.json();
    const emp = employees.find(e => e._id === id);
    if (!emp) {
      alert('Employee not found!');
      window.location.href = '/index.html';
      return;
    }
  
    document.getElementById('name').value = emp.name;
    document.getElementById('department').value = emp.department;
    document.getElementById('designation').value = emp.designation;
    document.getElementById('salary').value = emp.salary;
    document.getElementById('joiningDate').value = emp.joiningDate ? emp.joiningDate.split('T')[0] : '';
  }
  
  const editEmployeeForm = document.getElementById('edit-employee-form');
  if (editEmployeeForm) {
    loadEmployeeForEdit();
    editEmployeeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = getQueryParam('id');
      const name = document.getElementById('name').value;
      const department = document.getElementById('department').value;
      const designation = document.getElementById('designation').value;
      const salary = document.getElementById('salary').value;
      const joiningDate = document.getElementById('joiningDate').value;
  
      await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, department, designation, salary: parseFloat(salary), joiningDate })
      });
  
      window.location.href = '/index.html';
    });
  }
  
  // ========== PAGE INITIALIZATION ==========
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    loadEmployees();
  }
  