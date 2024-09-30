import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Loading from "./Loading";

function NavBar({ showAlert, alert }) {
  const nevigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    // console.log(location);
  }, [location]);

  const handleLogOut = () => {
    localStorage.removeItem("token");

    nevigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark active">
        <div className=" btn btn-success mx-4">
          <Link
            className={` notebook navbar-brand   nav-link ${location.pathname === "/" && "text-secondry" } `}
            to="/"
          >
            My NoteBook
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item active">
              <Link
                className={`nav-link ${location.pathname === "/home" && "text-success"
                  } `}
                to="/home"
              >
                Home{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" && "text-success"
                  } `}
                to="/about"
              >
                about
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/addnotes" && "text-success"
                  } `}
                to="/addnotes"
              >
                Add Notes
              </Link>
            </li>
            {!localStorage.getItem("token") ? (
              <li className="nav-item mx-4 login-signup">
                <li className="nav-item"> <Link className="nav-link" to="/signup">
                  <button
                    className={` ${location.pathname === "/signup"
                        ? "btn btn-success"
                        : "btn btn-warning"
                      } `}
                  >
                    Sign Up
                  </button>
                </Link>
                </li>

              <li className="nav-item">  <Link className="nav-link" to="/login">
                  <button
                    className={`  ${location.pathname === "/login"
                        ? "btn btn-success"
                        : "btn btn-warning"
                      } `}
                  >
                    Login
                  </button>
                </Link></li>
              </li>
            ) : (
              <li className="nav-item mx-5">
                <button
                  onClick={handleLogOut}
                  className={`  ${location.pathname === "/login"
                      ? "btn btn-success"
                      : "btn btn-warning"
                    } `}
                >
                  logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Alert alert={alert}></Alert>
      <Outlet />
    </>
  );
}

export default NavBar;
