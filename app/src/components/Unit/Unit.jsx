import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./Unit.css";

function Unit() {
  const { userID } = useContext(UserContext);
  const [unitId, setUnitId] = useState("");
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayedUnitId, setDisplayedUnitId] = useState("");

  const fetchPersonnel = () => {
    if (!unitId.trim()) {
      setError("Please enter a valid Unit ID.");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://localhost:4000/units/${unitId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unit not found.");
        }
        return res.json();
      })
      .then((data) => {
        setPersonnel([data]);
        setDisplayedUnitId(unitId);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        setPersonnel([]);
      });
  };

  return (
    <div className="unit-container">
      <h1>Unit Page</h1>
      <h2 className="unit-subtitle">Enter Your Unit ID</h2>

      <div className="unit-input-container">
        <input
          type="text"
          placeholder="Enter Unit ID"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="unit-input"
        />
        <button onClick={fetchPersonnel} className="fetch-button">
          Fetch
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading personnel...</p>}

      {displayedUnitId && personnel.length > 0 ? (
        <div>
          <h3>Unit {displayedUnitId} Details</h3>
          <ul>
            {personnel.map((unit) => (
              <li key={unit.id}>{unit.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        displayedUnitId && !loading && <p>No details found for Unit {displayedUnitId}.</p>
      )}
    </div>
  );
}

export default Unit;