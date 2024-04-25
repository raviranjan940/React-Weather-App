import React from "react";

function SearchEngine({ query, setQuery, search }) {
  const handleSearch = () => {
    search({ key: "Enter" }); // Simulate pressing Enter key
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder="enter city name"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button type="button" onClick={handleSearch}>
        <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
      </button>
    </div>
  );
}

export default SearchEngine;
