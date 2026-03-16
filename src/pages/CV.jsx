import { useData } from "../context/DataContext";
import CvBlock from "../components/shared/CvBlock";

const SectionHeader = ({ label }) => (
  <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gray-400 border-b border-border pb-1.5 mt-8 mb-1">
    {label}
  </h2>
);

export default function CV() {
  const { data } = useData();
  const { cv, me } = data;

  return (
    <div>
      {/* PDF section */}
      <div className="mb-6">
        {cv.pdfUrl ? (
          <div>
            <a
              href={cv.pdfUrl}
              download={cv.pdfFileName || "cv.pdf"}
              className="inline-flex items-center gap-1.5 text-sm text-accent border border-accent rounded px-3 py-1.5 hover:bg-accent hover:text-white transition-colors mb-5"
            >
              ↓ Download CV {cv.pdfFileName ? `(${cv.pdfFileName})` : "(PDF)"}
            </a>
            <div className="w-full border border-border rounded overflow-hidden bg-gray-50">
              <iframe
                src={cv.pdfUrl}
                title="CV PDF"
                className="w-full"
                style={{ height: "70vh" }}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">
            No PDF uploaded — showing CV sections below. Upload a PDF in the admin panel.
          </p>
        )}
      </div>

      {/* CV sections (always shown as reference) */}
      <SectionHeader label="Education" />
      <CvBlock items={cv.education} />

      <SectionHeader label="Experience" />
      <CvBlock items={cv.experience} />

      <SectionHeader label="Awards" />
      <CvBlock items={cv.awards} />

      <SectionHeader label="Service" />
      <CvBlock items={cv.service} />
    </div>
  );
}
