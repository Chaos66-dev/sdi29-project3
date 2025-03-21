import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./Units.css";

function Units() {
  const { userID, unitID } = useContext(UserContext); // User's assigned Unit ID
  const [unitId, setUnitId] = useState(unitID || "");
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserUnit = () => {
    if (!unitId.trim()) {
      setError("Please enter a valid Unit ID.");
      return;
    }

    // Ensure user can ONLY fetch their assigned unit
    if (unitID && unitId !== unitID) {
      setError("You are not authorized to view this Unit.");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://localhost:4000/units/${unitId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unit not found.");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUnit(data[0]);
        } else {
          setUnit(null);
          setError("Unit not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        setUnit(null);
      });
  };

  return (
    <div className="unit-container">
      <h1>Units Page</h1>
      <h2 className="unit-subtitle">Enter Your Unit ID</h2>

      <div className="unit-input-container">
        <input
          type="text"
          placeholder="Enter Unit ID"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="unit-input"
        />
        <button onClick={fetchUserUnit} className="fetch-button">
          Fetch Unit
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading data...</p>}

      {unit && (
        <div>
          <h3>Unit {unit.id} Details</h3>
          <p>Name: {unit.name}</p>
        </div>
      )}

      {!loading && unit === null && (
        <p>No details found for the entered Unit ID.</p>
      )}
    </div>
  );
}

export default Units;
