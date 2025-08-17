// src/pages/MedicineSearch.js
import React, { useState } from "react";
import axios from "axios";

const MedicineSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return; // prevent empty search
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/medicines?name=${query}`);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Medicine</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter medicine name..."
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {results.length === 0 && !loading && <p>No medicines found.</p>}
        {results.map((medicine) => (
          <li
            key={medicine.id}
            className="border p-2 mb-2 rounded shadow-sm"
          >
            <h2 className="font-semibold">{medicine.name}</h2>
            <p>{medicine.description}</p>
            <p className="text-sm text-gray-500">Price: {medicine.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineSearch;
