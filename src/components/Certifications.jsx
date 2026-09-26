import { FaAward, FaBookOpen, FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
import { getCertificates } from "../services/certificationService";

function Certifications() {
  const certificates = getCertificates();

  return (
    <section id="certifications" className="relative py-24 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-[0.2em]">
            <FaAward /> Certifications
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
            Professional <span className="text-cyan-400">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Continuous learning, technology adoption, and applied cloud and software engineering credentials.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="no-certificates-empty">
            <div className="no-certificates-icon"><FaAward size={26} /></div>
            <h3 className="no-certificates-title">No certificates available</h3>
          </div>
        ) : (
          <div className="certificate-grid">
            {certificates.map((certificate, index) => (
              <article
                key={certificate.id}
                className="certificate-card group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/40 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/50"
              >
                <div className="certificate-card-top">
                  <span className="certificate-number">#{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="certificate-image-wrap">
                  {certificate.fileType === "image" ? (
                    <img src={certificate.fileUrl} alt={certificate.fileName} className="certificate-image" />
                  ) : (
                    <div className="certificate-file-preview">
                      <FaFilePdf className="certificate-file-icon" />
                      <span className="certificate-file-label">PDF Certificate</span>
                    </div>
                  )}
                </div>

                <div className="certificate-card-body">
                  <div className="certificate-icon-wrap">
                    <span className="certificate-icon"><FaAward size={20} /></span>
                    <span className="certificate-file-type">{certificate.fileType === "pdf" ? "PDF" : "Image"}</span>
                  </div>
                  <h3 className="certificate-title" title={certificate.fileName}>{certificate.fileName}</h3>
                  <div className="certificate-actions">
                    <a
                      className="certificate-view-button"
                      href={certificate.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center justify-center gap-2"><FaEye /> View Certificate</span>
                    </a>
                    <a
                      className="certificate-view-button"
                      href={certificate.fileUrl}
                      download={certificate.fileName}
                    >
                      <span className="inline-flex items-center justify-center gap-2"><FaDownload /> Download Certificate</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 text-slate-300 text-sm">
            <FaBookOpen className="text-cyan-400" />
            <span>{certificates.length} active certificates</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
