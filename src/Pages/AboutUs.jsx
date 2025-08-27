import Sidebar from "../Components/Librarian/Sidebar";

function AboutUs() {
  return (
    <div className="bg-gray-100">
    <div className="ml-[20%]">
      <Sidebar />
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold mb-4">About Our Library</h1>
        <p className="text-xl text-gray-600">
          A modern digital solution for library management and book borrowing
        </p>
      </div>

      <div className="flex gap-20 ml-8 p-10">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We believe that access to knowledge should be simple, efficient, and enjoyable.
          </p>
          <p className="text-gray-700">
            Our Library Management System bridges the gap between traditional library services and digital convenience.
          </p>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="space-y-3 text-gray-700">
            {[
              "Comprehensive book catalog with detailed information",
              "Easy search and discovery features",
              "Simple one-click borrowing system",
              "Real-time availability tracking",
              "Professional librarian management tools",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-6 text-center">
          {[
            {
              colorBg: "bg-blue-100",
              colorIcon: "text-blue-600",
              title: "1. Create Account",
              desc: "Sign up as a borrower or librarian to access the system features",
              svgPath:
                "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
            },
            {
              colorBg: "bg-green-100",
              colorIcon: "text-green-600",
              title: "2. Browse & Search",
              desc: "Discover books using our powerful search and filtering capabilities",
              svgPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            },
            {
              colorBg: "bg-purple-100",
              colorIcon: "text-purple-600",
              title: "3. Borrow & Enjoy",
              desc: "Borrow books with a single click and manage your reading list",
              svgPath:
                "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            },
          ].map(({ colorBg, colorIcon, title, desc, svgPath }, i) => (
            <div key={i} className="flex-1">
              <div className={`w-16 h-16 ${colorBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg
                  className={`w-8 h-8 ${colorIcon}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={svgPath} />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Perfect For</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {[
            {
              title: "Small Libraries",
              desc: "Community libraries looking to digitize their operations",
            },
            {
              title: "Schools",
              desc: "Educational institutions managing student book access",
            },
            {
              title: "Community Centers",
              desc: "Local organizations providing reading resources",
            },
          ].map(({ title, desc }, i) => (
            <div key={i} className="p-4 border rounded-lg flex-1">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-600 mb-10">
          Ready to transform your library experience? Join thousands of users who have already made the switch to digital library management.
        </p>
      </div>
    </div>
    </div>
  );
}

export default AboutUs;
