import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./Unit.css";

function Unit() {
  const { userID, setUserID } = useContext(UserContext);
  const [unitId, setUnitId] = useState("");
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPersonnel = () => {
    if (!unitId.trim()) {
      setError("Please enter a valid Unit ID.");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://localhost:8081/units/${unitId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unit not found.");
        }
        return res.json();
      })
      .then((data) => {
        setPersonnel(data);
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
      <h2 className="unit-subtitle">Enter Your Unit ID</h2> {/* 🔹 Added class here */}

      <div className="unit-input-container">
        <input
          type="text"
          placeholder="Enter Unit ID"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="unit-input"
        />
        <button onClick={fetchPersonnel} className="fetch-button">
          Fetch Personnel
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading personnel...</p>}

      {personnel.length > 0 && (
        <div>
          <h3>Personnel in Unit {unitId}</h3>
          <ul>
            {personnel.map((emp) => (
              <li key={emp.id}>
                {emp.name} - Rank: {emp.rank}, Age: {emp.age}, Gender: {emp.gender}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Unit;