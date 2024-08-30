import React, { useContext, useState, useEffect } from "react";
import { Form, Row, Col, Button, Collapse } from "react-bootstrap";
import { AppContext } from "../App";
import { searchPosts } from "../services/API/PostServices";

const FilterPosts = () => {
  const { setAllPosts } = useContext(AppContext); // Accessing the global state to set filtered posts

  const [showFilters, setShowFilters] = useState(false); // State to toggle visibility

  const [filters, setFilters] = useState({
    username: "",
    title: "",
    keywords: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    popularity: "",
  });

  useEffect(() => {
    filterAndSortPosts();
  }, [filters]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterAndSortPosts = async () => {
    // Build query parameters
    const queryParams = new URLSearchParams();

    if (filters.username) {
      queryParams.append("user_name", filters.username);
    }
    if (filters.title) {
      queryParams.append("title", filters.title);
    }
    if (filters.keywords) {
      queryParams.append("content_keywords", filters.keywords);
    }
    if (filters.category) {
      queryParams.append("category", filters.category);
    }
    if (filters.dateFrom) {
      queryParams.append("post_time_after", filters.dateFrom);
    }
    if (filters.dateTo) {
      queryParams.append("post_time_before", filters.dateTo);
    }
    if (filters.popularity) {
      queryParams.append("popularity", filters.popularity);
    }

    // Make the API call
    try {
      const response = await searchPosts(queryParams.toString());
      const data = await response.json();
      setAllPosts(data.result); // Update global state with filtered posts
    } catch (error) {
      console.error("Failed to fetch filtered posts:", error);
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={toggleFilters}
        aria-controls="filter-collapse"
        aria-expanded={showFilters}
        className="mb-3"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      <Collapse in={showFilters}>
        <div id="filter-collapse">
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="filterUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by username"
                    name="username"
                    value={filters.username}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="filterTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by title"
                    name="title"
                    value={filters.title}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="filterKeywords">
                  <Form.Label>Content Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by content keywords"
                    name="keywords"
                    value={filters.keywords}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="filterCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Filter by category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="filterDateFrom">
                  <Form.Label>Date From</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="filterDateTo">
                  <Form.Label>Date To</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="sortPopularity">
                  <Form.Label>Sort by Votes</Form.Label>
                  <Form.Control
                    type="number"
                    name="popularity"
                    placeholder="Enter a number greater than 1"
                    min="1"
                    value={filters.popularity}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      </Collapse>
    </div>
  );
};

export default FilterPosts;
