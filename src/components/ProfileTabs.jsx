import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { AppContext } from "../App";

// eslint-disable-next-line react/prop-types
const ProfileTabs = ({ activeKey, setActiveKey }) => {
  const { following, userData } = useContext(AppContext);

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
          <Nav.Link
            eventKey="posts"
            className="text-decoration-none text-black"
          >
            ({userData?.posts?.length}) Posts
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="following"
            className="text-decoration-none text-black"
          >
            ({following?.length}) Following
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default ProfileTabs;
