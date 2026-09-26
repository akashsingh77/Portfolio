import { FaAward, FaFilePdf, FaImage } from "react-icons/fa";
import { getCertificates } from "../services/certificationService";

function CertificationAdmin({ onReturnToPortfolio }) {
  const certificates = getCertificates();

  return (
    <div className="min-h-screen px-6 py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]"><FaAward /> Certificate Files</div>
            <h1 className="text-4xl font-bold text-white mt-4">Certification <span className="text-cyan-400">Management</span></h1>
          </div>
          <button onClick={onReturnToPortfolio} className="rounded-xl border border-slate-700 px-5 py-3 text-slate-200 hover:border-cyan-300 hover:text-cyan-300">Portfolio</button>
        </div>

        <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7">
          <h2 className="text-2xl font-bold text-white">Publish certificates permanently</h2>
          <p className="text-slate-400 mt-4">
            Add PDF, JPG, JPEG, or PNG files to <code className="text-cyan-300">frontend/public/certificates/</code>, then add each exact filename to <code className="text-cyan-300">CERTIFICATE_FILES</code> in <code className="text-cyan-300">frontend/src/services/certificationService.js</code>. Commit and redeploy the site to publish them.
          </p>
          <h3 className="text-lg font-bold text-white mt-8">Configured certificates ({certificates.length})</h3>
          <div className="mt-4 space-y-3">
            {certificates.length === 0 ? (
              <p className="rounded-2xl border border-slate-700 p-6 text-center text-slate-400">No certificates available</p>
            ) : certificates.map((certificate) => (
              <article key={certificate.id} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300">{certificate.fileType === "pdf" ? <FaFilePdf /> : <FaImage />}</span>
                  <span className="font-semibold text-white">{certificate.fileName}</span>
                </div>
                <div className="mt-2 font-mono text-slate-300 truncate">{certificate.fileUrl}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CertificationAdmin;
