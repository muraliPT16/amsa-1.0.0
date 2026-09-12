/**
 * Resolves an asset path to work both locally and in subpath deployments like GitHub Pages (e.g. /repo_name/).
 * Handles absolute URLs, data URIs, and root-relative paths.
 */
export function getAssetPath(path?: string): string {
  if (!path) return '';

  // If already an absolute URL or data URI, return as-is
  if (/^(https?:|data:|blob:|\/\/)/i.test(path)) {
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In Vite, import.meta.env.BASE_URL defaults to './' or the configured base
  const baseUrl = import.meta.env.BASE_URL || './';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${cleanPath}`;
}
