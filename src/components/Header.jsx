
// eslint-disable-next-line react/prop-types
const Header = ({currentRoute}) => {

  return (
    <div
      className="d-none d-md-flex justify-content-between align-items-center p-3 border-bottom border-1 border-lightgray"
      style={{
        position: "fixed",
        top: 0,
        left: "250px",
        right: "300px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <div>{currentRoute === "/" ? "Home" : currentRoute === "/profile" ? "Profile" : "Page"}</div>
    </div>
  );
};

export default Header;
