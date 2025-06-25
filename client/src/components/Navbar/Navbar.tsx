import React, {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { logout } from "../../features/user/userSlice";
import { userAppDispatch, userAppSelect } from "../../store";

const Navbar: React.FC = () => {
  const userState = userAppSelect((state) => state.user.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = userAppDispatch();
  const navigate = useNavigate();

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logOffUser = (ev: ReactMouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-10 py-3">
      <NavLink
        to="/dashboard"
        className="flex items-center gap-4 text-[#121416]"
      >
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em]">
          Shadow Share
        </h2>
      </NavLink>

      <div className="flex flex-1 justify-end gap-8">
        {userState && (
          <button
            ref={buttonRef}
            type="button"
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer"
            style={{
              backgroundImage: `url(${
                "https://placehold.co/40x40/CCCCCC/000000?text=" +
                userState.name.split("")[0]
              })`,
            }}
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          ></button>
        )}

        <div
          ref={dropdownRef}
          className={`z-50 ${
            isDropdownOpen ? "block" : "hidden"
          } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 absolute right-10 top-14`}
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {userState?.name}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {userState?.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                onClick={() => setIsDropdownOpen(false)}
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Timeline
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsDropdownOpen(false)}
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Profile
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={logOffUser}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
