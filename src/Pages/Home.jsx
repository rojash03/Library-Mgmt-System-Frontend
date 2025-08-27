import Nav from "../Components/nav";
import { useNavigate } from "react-router-dom";

import Details from "../data/data";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className="bg-gray-100 py-40 flex flex-col items-center">
        <div className="text-center px-6 md:px-32">
          <h1 className="text-7xl font-bold mb-10">
            Welcome to the Library Hub
          </h1>
          <span className="block mb-6 text-blue-600 font-semibold text-2xl">
            Discover a world of knowledge at your fingertips.
          </span>
            <p className="text-center md:px-28 font-semibold text-2xl text-gray-500 ">
              Explore a world of knowledge at your fingertips. Easily manage your
              book loans and returns while discovering your next great read with
              our intuitive library management system. Sign In to Your Library.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-lg mt-6"
              onClick={() => navigate("/login")}
            >
              Get Started with Library Hub
            </button>
          </div>
        </div>
          <div className="flex px-[10%] py-28 gap-8">
            {Details.map((detail) => (
              <div
                key={detail.id}
                className="bg-textColor p-8 rounded-xl border border-gray-200 hover:border-pink-400 transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"
              >
                <div className="text-center  flex-col">
                  <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                    {detail.icon}
                  </div>
                  <h4 className="text-lg font-bold text-pink-600">
                    {detail.hobby}
                  </h4>
                  <p className="mt-2 text-gray-600">{detail.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center mb-[5%]">
            <div className="bg-blue-100 rounded-3xl p-12 max-w-4xl mx-auto">
              <p className="text-2xl font-medium text-gray-900 mb-6">
                "This library management system has transformed how we serve our community. It's intuitive, efficient, and
                our patrons love how easy it is to use."
              </p>
              <p className="text-lg text-primary font-semibold">— Sarah Johnson, Head Librarian</p>
            </div>
          </div>
    </>
  );
}

export default Home;
