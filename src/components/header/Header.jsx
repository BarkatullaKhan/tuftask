import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header__nav">
      <div className="item__list__container">
        <ul className="list">
          <li className="list__item">
            <Link to="/">Home</Link>
          </li>
          <li className="list__item">
            <Link to="/dashboard">Controls</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
