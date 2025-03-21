import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./Unit.css";

function Unit() {
  const { userID } = useContext(UserContext);
  const [unitId, setUnitId] = useState("");
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const fetchPersonnel = () => {
    if (!unitId.trim()) {
      setError("Please enter a valid Unit ID.");
      return;
    }

    setLoading(true);
    setError("");

    //Mock data
    setTimeout(() => {
      const mockUnitData = {
        1: [
          { id: 1, name: "John Doe", rank: "Sergeant", age: 30, gender: "Male" },
          { id: 2, name: "Lisa Brown", rank: "Corporal", age: 26, gender: "Female" },
        ],
        2: [
          { id: 3, name: "Jane Smith", rank: "Lieutenant", age: 28, gender: "Female" },
          { id: 4, name: "Robert Green", rank: "Private", age: 24, gender: "Male" },
        ],
        3: [
          { id: 5, name: "Alex Johnson", rank: "Captain", age: 35, gender: "Non-Binary" },
          { id: 6, name: "Emily Davis", rank: "Major", age: 32, gender: "Female" },
        ],
        4: [
          { id: 7, name: "Michael White", rank: "General", age: 45, gender: "Male" },
          { id: 8, name: "Samantha Black", rank: "Commander", age: 38, gender: "Female" },
        ],
      };


      setPersonnel(mockUnitData[unitId] || []);
      setLoading(false);
      setHasFetched(true);
    }, 1000);
  };

  //   fetch(`http://localhost:8081/units/${unitId}`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Unit not found.");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPersonnel(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //       setPersonnel([]);
  //     });
  // };

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
          Fetch Personnel
        </button>
      </div>

      {hasFetched && !loading && (
        personnel.length > 0 ? (
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
        ) : (
          <p>No personnel found for Unit {unitId}.</p>
        )
      )}
    </div>
  );
}

export default Unit;