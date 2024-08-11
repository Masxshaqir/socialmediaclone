import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Followers from "../components/Followers";

const Home = () => {
  return (
    <div className="container-fluid">
      <Row>
        <Col md={3} className="d-flex justify-content-center">
          <Sidebar />
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <Content />
        </Col>
        <Col md={3} className="d-flex justify-content-center">
          <Followers />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
