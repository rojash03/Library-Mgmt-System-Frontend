import AddBookForm from "../../Components/AddBookForm";
import Sidebar from "../../Components/Librarian/Sidebar";

function AddBooks() {
  const handleModelForm = (value) => {
    console.log("modelForm called with value:", value);
  };

  const fetchBooks = () => {
    console.log("fetchBooks called");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-[18%] bg-white shadow-md hidden md:block">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-full bg-gray-100 p-8 rounded-lg shadow-md">
          <AddBookForm modelForm={handleModelForm} fetchBooks={fetchBooks} />
      </div>
      </main>
    </div>
  );
}

export default AddBooks;
