import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    setError("");
    setSummary("");

    if (!name || !skills || !experience) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://ai-resume-generator-jd3q.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          skills: skills,
          experience: experience
        })
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div id="main-container">
      <h2>AI Resume Summary Generator</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <button onClick={generateSummary}>
        Generate Summary
      </button>

      {loading && <p>Generating summary...</p>}

      {error && <p>{error}</p>}

      {summary && (
        <div id="output-box">
          <h3>Generated Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
