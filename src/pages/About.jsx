import { useData } from "../context/DataContext";
import PubCard from "../components/shared/PubCard";

export default function About({ setActiveTab }) {
  const { data } = useData();
  const { me, publications, cv } = data;
  const selectedPubs = publications.slice(0, 3);

  return (
    <div>
      {/* Two-column bio + avatar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-8 md:gap-10 items-start mb-6">
        <div>
          <h1 className="font-garamond text-4xl font-bold leading-tight mb-1">{me.name}</h1>
          <p className="text-sm text-gray-500 mb-5">{me.role}</p>
          {me.bio.map((para, i) => (
            <p
              key={i}
              className="text-[0.97rem] text-gray-700 leading-[1.75] mb-4"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
        </div>

        {/* Avatar */}
        <div className="flex justify-center md:pt-1">
          <div className="w-48 h-56 rounded-lg border border-border bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
            {me.avatar ? (
              <img src={me.avatar} alt={me.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-garamond text-4xl font-semibold text-gray-400">
                {me.initials}
              </span>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-border my-8" />

      {/* Selected Publications */}
      <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gray-400 border-b border-border pb-1.5 mb-5">
        Selected Projects
      </h2>

      {selectedPubs.length === 0 && (
        <p className="text-sm text-gray-400">No publications yet.</p>
      )}

      {/* {selectedPubs.map((pub) => (
        <PubCard key={pub.id} pub={pub} />
      ))} */}

      {publications.length > 3 && (
        <div className="mt-5">
          <button
            className="text-sm text-accent hover:underline"
            onClick={() => setActiveTab("publications")}
          >
            View all projects →
          </button>
        </div>
      )}

      {/* Education Section */}
      {cv.education && cv.education.length > 0 && (
        <>
          <hr className="border-t border-border my-8" />
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gray-400 border-b border-border pb-1.5 mb-5">
            Education
          </h2>
          <div className="space-y-6">
            {cv.education.map((edu) => (
              <div key={edu.id}>
                <p className="text-sm text-gray-500">{edu.period}</p>
                <p className="font-semibold text-[0.97rem] text-[#1a1a1a]">{edu.title}</p>
                <p className="text-[0.97rem] text-gray-700">{edu.detail}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Experience Section */}
      {cv.experience && cv.experience.length > 0 && (
        <>
          <hr className="border-t border-border my-8" />
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gray-400 border-b border-border pb-1.5 mb-5">
            Experience
          </h2>
          <div className="space-y-6">
            {cv.experience.map((exp) => (
              <div key={exp.id}>
                <p className="text-sm text-gray-500">{exp.period}</p>
                <p className="font-semibold text-[0.97rem] text-[#1a1a1a]">{exp.title}</p>
                <p className="text-[0.97rem] text-gray-700">{exp.detail}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
