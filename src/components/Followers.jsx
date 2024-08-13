import Follower from "./Follower";

const Followers = () => {
  return (
    <>
      <div
        className="d-none d-lg-block position-fixed top-0 bottom-0 end-0 p-2 text-center vh-100 border-start border-1 border-lightgray"
        style={{ width: "300px" }}
      >
        <div className="flex-column">
          <h5>Followers</h5>
          <Follower />
        </div>
      </div>
    </>
  );
};

export default Followers;
