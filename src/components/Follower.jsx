/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Follower = ({ follower }) => {

  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid #ccc",
        }}
      >
        <FaUser size={20} />
      </div>
      <div className="d-flex flex-column justify-content-start align-items-start">
        <Link
          to={`/profile/${follower?.email}`}
          className="text-decoration-none text-black"
        >
          {`${follower?.first_name} ${follower?.last_name}`}
        </Link>
        <small className="text-muted">{follower?.email}</small>
      </div>
    </div>
  );
};

export default Follower;
