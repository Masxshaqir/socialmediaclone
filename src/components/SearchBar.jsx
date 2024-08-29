import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Form, Button, InputGroup } from "react-bootstrap";
import { searchPosts } from "../services/API/PostServices";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    console.log("Search Term:", searchValue);
    try {
      if (searchValue) {
        await searchPosts(searchValue);
      }
      // setAllPosts(responseData.result);
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <Button variant="primary" onClick={handleSearch}>
        <FaSearch />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
