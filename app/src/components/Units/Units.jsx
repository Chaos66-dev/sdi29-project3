import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";
import "./Units.css";

const unitEmblems = {
  "Space Systems Command (SSC)": "/ssc_emblem.png",
  "Space Operations Command (SpOC)": "/spoc_test.png",
  "Delta 4 (Space Force) - Missile Warning": "/delta4_emblem.png",
};

function Units() {
  const { userID } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [allUnits, setAllUnits] = useState([]);
  const [showAllUnits, setShowAllUnits] = useState(false);

  const fetchData = async (url, errorMessage) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(errorMessage);
      return await res.json();
    } catch (err) {
      console.error(`${errorMessage}:`, err.message);
      setError(errorMessage);
      return null;
    }
  };

  useEffect(() => {
    if (!id && userID) {
      const fetchEmployeeAndRedirect = async () => {
        const employeeData = await fetchData(`http://localhost:4000/employees/${userID}`, "Employee not found");
        if (!employeeData) return;

        const employee = Array.isArray(employeeData) ? employeeData[0] : employeeData;
        if (!employee) {
          setError("User not found. Please sign in with a valid User ID.");
          return;
        }
        navigate(`/Units/${employee.unit_id}`);
      };

      fetchEmployeeAndRedirect();
    }
  }, [userID, id, navigate]);

  useEffect(() => {
    if (id) {
      const fetchUnit = async () => {
        const unitData = await fetchData(`http://localhost:4000/units/${id}`, "Unit not found");
        if (unitData) {
          const unitObject = Array.isArray(unitData) ? unitData[0] : unitData;
          setUnit(unitObject);
        }
        setLoading(false);
      };

      fetchUnit();
    }
  }, [id]);

  const fetchAllUnitsWithEmployees = async () => {
    const unitsData = await fetchData("http://localhost:4000/units", "Failed to fetch units");
    const employeesData = await fetchData("http://localhost:4000/employees", "Failed to fetch employees");

    if (unitsData && employeesData) {
      const unitsWithEmployees = unitsData.map(unit => {
        const assignedEmployees = employeesData.filter(emp => emp.unit_id === unit.id);
        return { ...unit, employees: assignedEmployees };
      });

      setAllUnits(unitsWithEmployees);
      setShowAllUnits(true);
    }
  };

  return (
    <div className="unit-container">
      <h1>Units Page</h1>

      {!id && <p>Redirecting to your assigned unit...</p>}

      {loading && id && <p>Loading unit details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && unit && (
        <div>
          <h3>Unit {unit.id} Details</h3>
          <p><strong>Name:</strong> {unit.name}</p>

          <div className="unit-visual">
            {unitEmblems[unit.name] && (
              <img
                src={unitEmblems[unit.name]}
                alt={`${unit.name} Emblem`}
                className="unit-emblem"
              />
            )}

            {userID == 5 && (
              <button onClick={fetchAllUnitsWithEmployees} className="unit-button">
                View All Units and Assigned Employees
              </button>
            )}
          </div>
        </div>
      )}

      {showAllUnits && allUnits.length > 0 && (
        <div className="unit-list">
          <h3>All Units and Assigned Employees</h3>
          {allUnits.map(unit => (
            <div key={unit.id} className="unit-card">
              <h4>{unit.name}</h4>
              {unit.employees.length > 0 ? (
                <ul>
                  {unit.employees.map(emp => (
                    <li key={emp.id}>{emp.name} ({emp.rank})</li>
                  ))}
                </ul>
              ) : (
                <p>No employees assigned.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Units;