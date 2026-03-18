import { useState, useEffect } from "react";
import { useData } from "./context/DataContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import PubCard from "./components/shared/PubCard";
import TagPill from "./components/shared/TagPill";

const TABS = [
  { id: "about", label: "About" },
  { id: "publications", label: "Publications" },
  { id: "blog", label: "Blog" },
  { id: "cv", label: "Open Source" },
];


function About({ setTab }) {
  const { data } = useData();
  const selectedPubs = data.publications?.slice(0, 3) || [];
  const me = data.me || {};
  const cv = data.cv || {};
  
  return (
    <div>
      {/* Two-column bio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6">
        <div className="md:col-span-2">
          <h1 className="font-garamond text-4xl font-bold mb-1 leading-tight">
            {me.name}
          </h1>
          <div className="text-lg text-gray-600 mb-6">{me.role}</div>
          {me.bio?.map((para, i) => (
            <p
              key={i}
              className="leading-relaxed text-base text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
        </div>

        {/* Avatar */}
        <div className="flex justify-center md:justify-end">
          <div className="w-40 h-48 rounded-lg border border-border bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {me.avatar ? (
              <img
                src={me.avatar}
                alt={me.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-garamond text-4xl text-gray-400 font-semibold">
                {me.initials}
              </span>
            )}
          </div>
        </div>
      </div>

      <hr className="border-border my-8" />

      <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 border-b border-border pb-1 mb-6 mt-9">
        Selected Projects
      </div>
      <div>
        {selectedPubs.map((pub, i) => (
          <PubCard key={i} pub={pub} />
        ))}
      </div>
      <div className="mt-5">
        <button
          onClick={() => setTab("publications")}
          className="text-gray-600 hover:text-accent transition-colors text-sm"
        >
          View all projects →
        </button>
      </div>

      {/* Education Section */}
      {cv.education && cv.education.length > 0 && (
        <>
          <hr className="border-border my-8" />
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 border-b border-border pb-1 mb-6">
            Education
          </div>
          <div className="space-y-6">
            {cv.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-sm text-gray-500">{edu.period}</p>
                <p className="font-semibold text-base text-[#1a1a1a]">{edu.title}</p>
                <p className="text-base text-gray-700">{edu.detail}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Experience Section */}
      {cv.experience && cv.experience.length > 0 && (
        <>
          <hr className="border-border my-8" />
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 border-b border-border pb-1 mb-6">
            Experience
          </div>
          <div className="space-y-6">
            {cv.experience.map((exp) => (
              <div key={exp.id}>
                <p className="text-sm text-gray-500">{exp.period}</p>
                <p className="font-semibold text-base text-[#1a1a1a]">{exp.title}</p>
                <p className="text-base text-gray-700">{exp.detail}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Publications() {
  const { data } = useData();
  const pubs = data.publications || [];
  const years = [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a);
  const hasStar = pubs.some((p) => p.authors.some((a) => a.star));
  
  return (
    <div>
      {years.map((year) => (
        <div key={year}>
          <div className="font-garamond text-2xl font-bold text-[#1a1a1a] mb-1 border-b border-border pb-1 mt-8">
            {year}
          </div>
          {pubs.filter((p) => p.year === year).map((pub, i) => (
            <PubCard key={i} pub={pub} />
          ))}
        </div>
      ))}
      {hasStar && (
        <div className="text-sm text-gray-600 mt-4">
          <sup>*</sup> Equal contribution.
        </div>
      )}
    </div>
  );
}

function Blog() {
  const { data } = useData();
  const posts = data.blogPosts || [];
  
  return (
    <div>
      <hr className="border-border" />
      {posts.map((post, i) => (
        <a
          key={i}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="block py-5 border-b border-border hover:no-underline"
        >
          <div className="text-xs text-gray-500 mb-1 tracking-wide">
            {post.date}
          </div>
          <div className="font-garamond text-xl font-semibold text-[#1a1a1a] mb-2 leading-snug hover:text-accent transition-colors">
            {post.title}
          </div>
          <div className="text-sm text-gray-600 leading-relaxed mb-3">
            {post.excerpt}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((t) => (
              <TagPill key={t} tag={t} />
            ))}
          </div>
        </a>
      ))}
    </div>
  );
}

function OpenSourcePage() {
  const { data } = useData();
  const openSource = data?.openSource || [];
  
  console.log("OpenSourcePage - data:", data);
  console.log("OpenSourcePage - openSource:", openSource);
  
  return (
    <div>
      <hr className="border-border" />
      {openSource.length === 0 ? (
        <p className="text-sm text-gray-400 py-5">No open source projects yet. Go to admin to add some!</p>
      ) : (
        openSource.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="block py-5 border-b border-border hover:no-underline"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs text-gray-500 mb-1 tracking-wide">
                  {project.language} • ⭐ {project.stars}
                </div>
                <div className="font-garamond text-xl font-semibold text-[#1a1a1a] mb-2 leading-snug hover:text-accent transition-colors">
                  {project.title}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              {project.description}
            </div>
          </a>
        ))
      )}
    </div>
  );
}


export default function App() {
  const [activeTab, setActiveTab] = useState("about");
  const isAdminPath = window.location.pathname.includes("/admin");

  useEffect(() => {
    if (isAdminPath) {
      window.history.replaceState({}, "", "/admin");
    }
  }, [isAdminPath]);

  return (
    <div className="min-h-screen flex flex-col text-[#1a1a1a] bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        
        * { box-sizing: border-box; }
        a { color: #1a56db; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* Admin Page - No navbar/footer */}
      {isAdminPath ? (
        <AdminDashboard />
      ) : (
        <>
          {/* Navbar */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <main className="flex-1 max-w-3xl w-full mx-auto px-6 md:px-10 py-10 md:py-16 pb-16">
            {activeTab === "about" && <About setTab={setActiveTab} />}
            {activeTab === "publications" && <Publications />}
            {activeTab === "blog" && <Blog />}
            {activeTab === "cv" && <OpenSourcePage />}
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
