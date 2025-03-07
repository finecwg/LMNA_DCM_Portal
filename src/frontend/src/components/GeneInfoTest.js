import React, { useState } from "react";
import axios from "axios";

function GeneInfoTest() {
  const [gene, setGene] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get(
        `http://localhost:8000/api/gene-info?gene=${gene}`
      );
      setResponse(result.data);
      console.log("API Response:", result.data);
    } catch (err) {
      setError(err.message);
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h4>Gene Info API Test</h4>
      <div className="row">
        <div className="input-field col s6">
          <input
            type="text"
            value={gene}
            onChange={(e) => setGene(e.target.value)}
            placeholder="Enter gene name (e.g., LMNA)"
          />
        </div>
        <div className="col s6">
          <button
            className="btn waves-effect waves-light"
            onClick={testApi}
            disabled={loading}
          >
            Test API
          </button>
        </div>
      </div>

      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}

      {error && <div className="card-panel red lighten-4">Error: {error}</div>}

      {response && (
        <div className="card-panel">
          <h5>API Response:</h5>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GeneInfoTest;
