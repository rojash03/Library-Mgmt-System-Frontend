import { toast } from "react-toastify";
import Sidebar from "../Components/Librarian/Sidebar";

function Profile() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 w-full p-6 ml-[18%]">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p>Manage your account settings and preferences.</p>
      </div>
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full">
          <section className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Role</span>
              <span className="inline-block px-3 py-1 text-sm rounded-full border border-gray-300 capitalize">
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Member Since</span>
              <span className="text-gray-600">January 2024</span>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              toast.success("Profile updated successfully!");
            }}>
              <div>
                <label htmlFor="name" className=" mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full border rounded px-3 py-2 "
                />
              </div>

              <div>
                <label htmlFor="email" className=" mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border rounded px-3 py-2 "
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Save Changes
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
    </div>
  );
}

export default Profile;
