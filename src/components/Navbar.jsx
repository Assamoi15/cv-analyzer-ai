import { FaRobot } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <FaRobot />
        <h2>CV Analyzer AI</h2>
      </div>

      <div className="nav-user">
        <span>Recruiter Panel</span>
      </div>
    </div>
  );
}

export default Navbar;