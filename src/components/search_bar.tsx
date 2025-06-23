import React, { useState } from "react";

type SearchBarProps = {
  onSearchTermChange: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchTermChange }) => {
  // Initializes component state
  const [term, setTerm] = useState<string>("");

  // Rendering the components
  return (
    <div className="search-bar">
      <input
        value={term}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newTerm = event.target.value;
          setTerm(newTerm);
          onSearchTermChange(newTerm);
        }}
      />
    </div>
  )
}

export default SearchBar;
