import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// import imga from '../img/black.png';

function Sidebar() {
  const location = useLocation();
  const activePath = location.pathname;

  // Style for active link
  const activeStyle = {
    color: '#6941C6',  // Purple color for the active link
    fontWeight: 'bold',
  };

  return (
    <div className="d-flex flex-column py-3" style={{ height: '100vh', width: '100%' }}>
      <div className="d-flex flex-row align-items-center py-2">
        {/* <img src={imga} alt="Overview" className="me-3" style={{ height: '1.4rem', width: '1.4rem' }} /> */}
        <Link to="/" style={{ textDecoration: 'none', color: activePath === '/' ? '#6941C6' : 'inherit', fontWeight: activePath === '/' ? 'bold' : 'normal' }}>
          <div>Overview</div>
        </Link>
      </div>
      <div className="d-flex flex-row align-items-center py-2">
        {/* <img src={imga} alt="People Directory" className="me-3" style={{ height: '1.4rem', width: '1.4rem' }} /> */}
        <Link to="/employee" style={{ textDecoration: 'none', color: activePath === '/employee' ? '#6941C6' : 'inherit', fontWeight: activePath === '/directory' ? 'bold' : 'normal' }}>
          <div>People Directory</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;