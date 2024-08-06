import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

  useState(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log(data);
        setEmployees(data);
      })
      .catch((error) => {
        console.log("Error Occurred => ", error);
        alert("failed to fetch data");
      });
  }, []);

  return (
    <>
      <div className="main">
        <div className="header">
          <h1 className="mainheading">Employee Data Table</h1>
        </div>
        <div className="tabledata">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.length !== 0 ? (
                <>
                  {currentEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.role}</td>
                    </tr>
                  ))}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button
            disabled={currentPage === 1 ? true : false}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
          >
            Previous
          </button>
          <div>{currentPage}</div>
          <button
            disabled={
              currentPage === parseInt(employees.length / 10 + 1) ? true : false
            }
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
