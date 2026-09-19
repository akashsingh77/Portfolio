import { useState, useEffect } from "react";
import {
  FaAward,
  FaPlus,
  FaSave,
  FaTrash,
  FaUpload,
  FaSignOutAlt,
  FaFilePdf,
  FaImage,
} from "react-icons/fa";
import {
  clearAdminJwt,
  createAdminJwt,
  getCertificates,
  isAdminAuthenticated,
  saveAdminJwt,
  saveCertificates,
  storeUploadedFile,
} from "../services/certificationService";

const emptyDraft = {
  id: "",
  fileName: "",
  fileUrl: "",
  fileType: "pdf",
};

function CertificationAdmin({ onReturnToPortfolio }) {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const [email, setEmail] = useState("admin@portfolio.dev");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const [certificates, setCertificates] = useState(getCertificates());
  const [draft, setDraft] = useState({ ...emptyDraft });
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!authenticated) {
      setCertificates(getCertificates());
    }
  }, [authenticated]);

  const login = (event) => {
    event.preventDefault();

    if (email.trim().toLowerCase() === "admin@portfolio.dev" && password.trim() === "admin123") {
      const jwt = createAdminJwt(email);
      saveAdminJwt(jwt);
      setAuthenticated(true);
      setError("");
      return;
    }

    setError("Invalid admin credentials. Use admin@portfolio.dev / admin123");
  };

  const logout = () => {
    clearAdminJwt();
    setAuthenticated(false);
    setDraft({ ...emptyDraft });
  };

  const handleFile = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("pdf") && !file.type.startsWith("image/png") && !file.type.startsWith("image/jpeg")) {
      setError("Please upload a PDF, JPG, or PNG certificate file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploaded = await storeUploadedFile(file);
      setDraft({
        id: makeSlug(file.name),
        fileName: uploaded.fileName,
        fileUrl: uploaded.fileUrl,
        fileType: uploaded.fileType,
      });
      setNotice("Certificate file selected");
    } catch (err) {
      setError(err.message || "Unable to upload certificate file");
    } finally {
      setUploading(false);
    }
  };

  const saveCertificate = (event) => {
    event.preventDefault();

    if (!draft.fileUrl || !draft.fileName) {
      setError("Please upload a certificate PDF, JPG, or PNG file");
      return;
    }

    const existing = certificates.some((certificate) => certificate.id === draft.id);
    const next = {
      id: existing ? `${draft.id}-${Date.now().toString(36)}` : draft.id,
      fileName: draft.fileName,
      fileUrl: draft.fileUrl,
      fileType: draft.fileType,
    };

    const updated = [...certificates, next];

    try {
      saveCertificates(updated);
      setCertificates(updated);
      setDraft({ ...emptyDraft });
      setError("");
      setNotice("Certificate uploaded");
    } catch (err) {
      setError(err.message || "Unable to save certificate");
      setNotice("");
    }
  };

  const deleteCertificate = (id) => {
    const remaining = certificates.filter((certificate) => certificate.id !== id);
    setCertificates(remaining);
    saveCertificates(remaining);
    setNotice("Certificate removed");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-8">
          <div className="text-center mb-8">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300">
              <FaAward size={28} />
            </span>
            <h2 className="text-3xl font-bold text-white mt-5">
              Certification <span className="text-cyan-400">Admin</span>
            </h2>
          </div>

          <form onSubmit={login} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">
                Admin Email
              </label>
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">
                Password
              </label>
              <input
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-rose-300">{error}</div>}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              Sign in with JWT
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onReturnToPortfolio}
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              Return to portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">
              <FaAward /> Admin Console
            </div>
            <h1 className="text-4xl font-bold text-white mt-4">
              Certification <span className="text-cyan-400">Management</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onReturnToPortfolio}
              className="rounded-xl border border-slate-700 px-5 py-3 text-slate-200 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={logout}
              className="rounded-xl bg-slate-800 px-5 py-3 text-slate-200 border border-slate-700 hover:border-cyan-300 hover:text-cyan-300 transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-rose-200 mb-6">
            {error}
          </div>
        )}

        {notice && (
          <div className="rounded-2xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-3 text-cyan-200 mb-6">
            {notice}
          </div>
        )}

        <div className="grid lg:grid-cols-[420px_minmax(420px,1fr)] gap-8">
          <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Upload Certificate
              </h2>
            </div>

            <form className="mt-6 space-y-5" onSubmit={saveCertificate}>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Certificate File
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-cyan-400/60 bg-slate-800 px-4 py-4">
                  <span className="flex items-center gap-3 text-slate-200">
                    <FaUpload />
                    <span className="text-sm">
                      {draft.fileName || "No file selected"}
                    </span>
                  </span>
                  <span className="text-cyan-300 text-xs uppercase">
                    {draft.fileType === "pdf" ? "PDF" : "Image"}
                  </span>
                  <input
                    className="hidden"
                    id="certificate-upload"
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    onChange={handleFile}
                  />
                </label>
                <label
                  htmlFor="certificate-upload"
                  className="mt-3 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  <FaUpload /> Upload Certificate
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <FaSave /> Save Certificate
                  </span>
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-slate-700 px-4 py-3 text-slate-200 hover:border-cyan-300 hover:text-cyan-300"
                  onClick={() => {
                    setDraft({ ...emptyDraft });
                    setError("");
                    setNotice("");
                  }}
                >
                  Clear
                </button>
              </div>

              {uploading && <div className="text-cyan-300">Uploading file...</div>}
            </form>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Certificate List</h2>
                <p className="text-sm text-slate-400 mt-2">
                  {certificates.length} published certificates
                </p>
              </div>
              <button
                className="rounded-xl border border-cyan-400/50 px-4 py-2 text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300"
                onClick={() => {
                  setDraft({ ...emptyDraft });
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <FaPlus /> Upload Certificate
                </span>
              </button>
            </div>

            <div className="mt-6 space-y-4 max-h-[560px] overflow-auto pr-2">
              {certificates.length === 0 && (
                <div className="rounded-2xl border border-slate-700 p-8 text-center text-slate-400">
                  No certificates uploaded.
                </div>
              )}

              {certificates.map((certificate) => (
                <article key={certificate.id} className="rounded-2xl border border-slate-700 bg-slate-800/50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-300">
                          {certificate.fileType === "pdf" ? <FaFilePdf /> : <FaImage />}
                        </span>
                        <h3 className="font-semibold text-white">
                          {certificate.fileName}
                        </h3>
                      </div>
                      <div className="mt-2 font-mono text-slate-300 truncate">
                        {certificate.fileType === "pdf" ? "PDF document" : "Image certificate"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-lg border border-rose-400/70 p-2 text-rose-300 hover:bg-rose-400/20"
                        onClick={() => deleteCertificate(certificate.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function makeSlug(value) {
  return `${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
}

export default CertificationAdmin;
