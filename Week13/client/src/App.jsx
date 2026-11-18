import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  species: "",
  habitat: "",
  rarity: "Common",
  description: "",
};

function App() {
  const [creatures, setCreatures] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadCreatures(searchTerm = search) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/creatures?search=${encodeURIComponent(searchTerm)}`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to load creatures");
      }
      setCreatures(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCreatures();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //create creature/update
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/creatures/${editingId}` : "/api/creatures";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save creature");
      }

      setFormData(emptyForm);
      setEditingId(null);
      setMessage(
        editingId
          ? "Creature updated successfully!"
          : "Creature created successfully!",
      );
      await loadCreatures();
    } catch (err) {
      setError(err.message);
    }
  }

  //edit creature
  function handleEdit(creature) {
    setEditingId(creature._id);
    setFormData({
      name: creature.name,
      species: creature.species,
      habitat: creature.habitat,
      rarity: creature.rarity,
      description: creature.description,
    });
    setMessage("");
    setError("");
  }

  //delete creature
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this creature?")) return;
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/creatures/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to delete creature");
      }

      setMessage("Creature deleted successfully!");
      await loadCreatures();
      if (editingId === id) {
        cancelEdit();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
    setError("");
  }

  //search
  function handleSearch(event) {
    const value = event.target.value;
    setSearch(value);
    loadCreatures(value);
  }

  return (
    <main className="container">
        <header className="hero">
            <p className="hero-text">Creature Management</p>
            <h1>Creature Catalog</h1>
            <p>Search, create, update, or delete a collection of mythical creatures.</p>
        </header>

        <section className="panel">
            <h2>{editingId ? "Edit Creature" : "Create Creature"}</h2>
            <form onSubmit={handleSubmit} className="creature-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Species:
                    <input
                        type="text"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Habitat:
                    <input
                        type="text"
                        name="habitat"
                        value={formData.habitat}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Rarity:
                    <select
                        name="rarity"
                        value={formData.rarity}
                        onChange={handleChange}
                        required
                    >
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                    </select>
                </label>
                <label className="wide">
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </label>
                <div className="form-actions wide">
                <button type="submit"> {editingId ? "Save Creature" : "Add Creature"} </button>
                    {editingId && (
                        <button type="button" onClick={cancelEdit} className="cancel-button">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            {message && <p className="success" role="status">{message}</p>}
            {error && <p className="error" role="alert">{error}</p>}
        </section>

        <section className="catalog">
            <div className="catalog-header">
                <div>
                    <h2>Creature Catalog</h2>
                    <p>All creatures in the database</p>
                </div>
                <input
                clsassName="search"
                type="search"
                placeholder="Search by name, species, or habitat"
                value={search}
                onChange={handleSearch}
                />
            </div>
            {loading ? (
                <p>Loading creatures...</p>
            ) : error ? (
                <p className="error" role="alert">{error}</p>
            ) : creatures.length === 0 ? (
                <p>No creatures found.</p>
            ) : (
                <ul className="creature-list">
                    {creatures.map((creature) => (
                        <li key={creature._id} className="creature-card">
                            <h3>{creature.name}</h3>
                            <p><strong>Species:</strong> {creature.species}</p>
                            <p><strong>Habitat:</strong> {creature.habitat}</p>
                            <p><strong>Rarity:</strong> {creature.rarity}</p>
                            <p><strong>Description:</strong> {creature.description}</p>
                            <div className="card-actions">
                                <button onClick={() => handleEdit(creature)}>Edit</button>
                                <button onClick={() => handleDelete(creature._id)} className="delete-button">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
        <section className="footer">
            <p>Created by Neville</p>
        </section>
    </main>
  );
}

export default App;