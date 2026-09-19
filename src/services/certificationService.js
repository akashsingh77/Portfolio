export const CERTIFICATION_STORAGE_KEY = "portfolio.certifications";
export const ADMIN_TOKEN_KEY = "portfolio.admin.jwt";

export function getCertificates() {
  const raw = localStorage.getItem(CERTIFICATION_STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify([]));
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    const normalized = parsed
      .filter((certificate) => certificate && typeof certificate === "object")
      .map((certificate) => ({
        id: String(certificate.id || makeSlug(certificate.fileName || "certificate")),
        fileName: String(certificate.fileName || ""),
        fileUrl: String(certificate.fileUrl || ""),
        fileType: certificate.fileType === "pdf" || certificate.fileType === "image" ? certificate.fileType : "pdf",
      }))
      .filter((certificate) => certificate.id && certificate.fileName && certificate.fileUrl && certificate.fileType);

    if (normalized.length !== parsed.length) {
      saveCertificates(normalized);
    }

    return normalized;
  } catch {
    localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

export function saveCertificates(certificates) {
  const cleanCertificates = certificates.map((certificate) => ({
    id: certificate.id,
    fileName: certificate.fileName,
    fileUrl: certificate.fileUrl,
    fileType: certificate.fileType,
  }));

  try {
    localStorage.setItem(CERTIFICATION_STORAGE_KEY, JSON.stringify(cleanCertificates));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("Certificate storage limit exceeded. Please remove older certificates or upload a smaller file.");
    }

    throw error;
  }
}

export function storeUploadedFile(file) {
  const acceptedTypes = {
    "application/pdf": "pdf",
    "image/png": "image",
    "image/jpeg": "image",
  };

  if (!acceptedTypes[file.type]) {
    return Promise.reject(new Error("Only PDF, JPG, and PNG certificates are allowed"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        fileUrl: reader.result,
        fileName: file.name,
        fileType: acceptedTypes[file.type],
      });
    };

    reader.onerror = () => reject(new Error("Unable to read selected file"));
    reader.readAsDataURL(file);
  });
}

function makeSlug(value) {
  return `${String(value || "certificate")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;
}

export function createAdminJwt(email = "admin@portfolio.dev") {
  const payload = {
    sub: "portfolio-admin",
    role: "admin",
    email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
  };

  return window.btoa(JSON.stringify(payload));
}

export function readAdminJwt() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export function isAdminAuthenticated() {
  const token = readAdminJwt();

  if (!token) return false;

  try {
    const payload = JSON.parse(window.atob(token));
    return payload.role === "admin" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function saveAdminJwt(jwt) {
  localStorage.setItem(ADMIN_TOKEN_KEY, jwt);
}

export function clearAdminJwt() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}
