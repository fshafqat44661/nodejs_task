import React, { useState, useEffect } from "react";
import { addSuperhero, getSuperheroes } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState(5);
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const { data } = await getSuperheroes();
      const sortedHeroes = data.sort((a, b) => b.humilityScore - a.humilityScore);
      setSuperheroes(sortedHeroes);
    } catch (error) {
      toast.error("Failed to fetch superheroes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !superpower || humilityScore < 1 || humilityScore > 10) {
      toast.warn("Please fill all fields correctly!");
      return;
    }

    try {
      await addSuperhero({ name, superpower, humilityScore });
      fetchHeroes();
      toast.success("Superhero added successfully!");
      setName("");
      setSuperpower("");
      setHumilityScore(5);
    } catch (error) {
      toast.error("Error adding superhero!");
    }
  };

  return (
    <div className="container">
      <header className="header">Humble Superhero API</header>

      <div className="form-container">
        <h2>Add Superhero</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Superpower"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="10"
            value={humilityScore}
            onChange={(e) => setHumilityScore(Number(e.target.value))}
          />
          <button type="submit">Add Superhero</button>
        </form>
      </div>

      <div className="list-container">
        <h2>Superhero List</h2>
        {superheroes.length > 0 ? (
          <table className="superhero-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Superpower</th>
                <th>Humility Score</th>
              </tr>
            </thead>
            <tbody>
              {superheroes.map((hero) => (
                <tr key={hero.id}>
                  <td className="hero-name">{hero.name}</td>
                  <td className="hero-power">{hero.superpower}</td>
                  <td className="hero-score">{hero.humilityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No superheroes added yet.</p>
        )}
      </div>

      <footer className="footer">Built with ❤️ by Faizan Shafqat</footer>

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;
