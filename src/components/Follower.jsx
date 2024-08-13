import { FaUser  } from "react-icons/fa";

const Follower = () => {
  return (
    <div className="d-flex align-items-center gap-2">
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
        <FaUser
          size={20}
        />
      </div>
      <div className="d-flex flex-column justify-content-start align-items-start">
        <b>Usama Serag</b>
        <small className="text-muted">usamaserag@home.com</small>
      </div>
    </div>
  );
};

export default Follower;
