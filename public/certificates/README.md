Add permanent certificate files to this folder as PDF, JPG, JPEG, or PNG.

Also add each exact filename to `CERTIFICATE_FILES` in
`frontend/src/services/certificationService.js`. Commit both the files and
the manifest change, then redeploy. The site builds certificate URLs using
Vite's configured base path so the links work on Vercel deployments.
