import { useNavigate } from "react-router-dom";

function Nav({ setIsRegister }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (setIsRegister) {
      setIsRegister(false);
    } else {
      navigate("/login");
    }
  };

  const handleRegisterClick = () => {
    if (setIsRegister) {
      setIsRegister(true);
    } else {
      navigate("/login?register=true");
    }
  };

  return (
    <nav>
      <div className="w-full z-50 fixed bg-white flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center gap-4 ml-10">
          <img
            className="w-12 h-12 rounded-md"
            src="/libraryLogo.jpg"
            alt="Library Logo"
          />
          <h1 className="text-2xl font-bold text-primary">Library Hub</h1>
        </div>
        <div className="w-[30%] items-center flex justify-end mr-10 gap-2">
          <button
            onClick={handleLoginClick}
            className="font-semibold px-4 py-2 rounded-2xl hover:bg-blue-200"
          >
            Log In
          </button>
          <button
            onClick={handleRegisterClick}
            className="font-semibold px-4 py-2 rounded-2xl hover:bg-blue-200"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
