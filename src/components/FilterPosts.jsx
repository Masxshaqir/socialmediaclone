import React, { useContext, useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { AppContext } from "../App";
import { getAllPosts } from "../services/API/PostServices";

const FilterPosts = () => {
  const { allPosts, setAllPosts } = useContext(AppContext); // Accessing the global state for all posts
  const [filters, setFilters] = useState({
    username: '',
    title: '',
    keywords: '',
    category: '',
  });

  const [sortCriteria, setSortCriteria] = useState({
    date: '',
    popularity: ''
  });

  const clonePosts = [...allPosts]

  useEffect(() => {
    filterAndSortPosts();
  }, [filters, sortCriteria]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSortCriteria({ ...sortCriteria, [name]: value });
  };

  const filterAndSortPosts = async() => {
    let tempPosts = [...allPosts];

    // Apply filters
    const isFilterEmpty = Object.values(filters).every(value => value === '');

    if (!isFilterEmpty) {
      tempPosts = tempPosts.filter(post => {
        const fullName = `${post.user__first_name} ${post.user__last_name}`;
        return (
          (filters.username === '' || fullName.toLowerCase().includes(filters.username.toLowerCase())) &&
          (filters.title === '' || post.title.toLowerCase().includes(filters.title.toLowerCase())) &&
          (filters.keywords === '' || post.content.toLowerCase().includes(filters.keywords.toLowerCase())) &&
          (filters.category === '' || post.category.toLowerCase().includes(filters.category.toLowerCase()))
        );
      });
    }

    // Apply sorting
    // Sorting by date
    if (sortCriteria.date) {
      tempPosts = tempPosts.sort((a, b) => {
        const dateA = new Date(a.post_time);
        const dateB = new Date(b.post_time);
        return sortCriteria.date === 'newToOld' ? dateB - dateA : dateA - dateB;
      });
    }

    // Sorting by votes
    if (sortCriteria.popularity) {
      tempPosts = tempPosts.sort((a, b) => {
        return sortCriteria.popularity === 'bigToSmall' ? b.vote_counts - a.vote_counts : a.vote_counts - b.vote_counts;
      });
    }

    setAllPosts(tempPosts); // Update global state with filtered and sorted posts
    if (isFilterEmpty) {
        const response = await getAllPosts();

      // Await the parsing of the response body as JSON
      const responseData = await response.json();

      setAllPosts(responseData.result);
    }
  };

  return (
    <div>
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
            <Form.Group controlId="sortDate">
              <Form.Label>Sort by Date</Form.Label>
              <Form.Control as="select" name="date" value={sortCriteria.date} onChange={handleSortChange}>
                <option value="">Select...</option>
                <option value="newToOld">New to Old</option>
                <option value="oldToNew">Old to New</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sortPopularity">
              <Form.Label>Sort by Votes</Form.Label>
              <Form.Control as="select" name="popularity" value={sortCriteria.popularity} onChange={handleSortChange}>
                <option value="">Select...</option>
                <option value="bigToSmall">Big to Small</option>
                <option value="smallToBig">Small to Big</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterPosts;
