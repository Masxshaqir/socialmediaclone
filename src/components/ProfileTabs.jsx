import Nav from "react-bootstrap/Nav";

const ProfileTabs = ({ activeKey, setActiveKey }) => {
  return (
    <div className="mt-2">
      <Nav
        fill
        variant="underline"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
        className="custom-tabs"
      >
        <Nav.Item>
          <Nav.Link eventKey="posts">Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="followers">Followers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="following">Following</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default ProfileTabs;
