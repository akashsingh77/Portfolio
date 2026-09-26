// Add certificate filenames after placing the files in frontend/public/certificates/.
// Vite serves files from public at the site root (or configured base path).
export const CERTIFICATE_FILES = [
  "dsa certificate.PDF",
  "java full stack certificate.PDF",
  "DataScience certificate.jpeg",
];

const SUPPORTED_CERTIFICATE_EXTENSIONS = new Set(["pdf", "jpg", "jpeg", "png"]);

export function getCertificates() {
  const baseUrl = import.meta.env.BASE_URL;

  return CERTIFICATE_FILES
    .filter((fileName) => {
      const extension = fileName.split(".").pop()?.toLowerCase();
      return SUPPORTED_CERTIFICATE_EXTENSIONS.has(extension);
    })
    .map((fileName) => {
      const encodedFileName = fileName.split("/").map(encodeURIComponent).join("/");
      const extension = fileName.split(".").pop().toLowerCase();
      return {
        id: fileName,
        fileName,
        fileUrl: `${baseUrl}certificates/${encodedFileName}`,
        fileType: extension === "pdf" ? "pdf" : "image",
      };
    });
}
