import { VersionInfo } from './versionUtils.js';

let isPatched = false;
let originalFetch: (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export function patchGlobalFetch(versionInfo: VersionInfo): {
  'User-Agent': string;
} {
  originalFetch = global.fetch;
  const headers = {
    'User-Agent': `${versionInfo.name}/${versionInfo.version} (${versionInfo.branch}, ${versionInfo.tag}, ${versionInfo.sha})`
  };
  if (!isPatched) {
    global.fetch = async function (
      input: string | URL | Request,
      init?: RequestInit
    ): Promise<Response> {
      const modifiedInit: RequestInit = {
        ...init,
        headers: {
          ...(init?.headers || {}),
          ...headers
        }
      };
      return originalFetch(input, modifiedInit);
    };
    isPatched = true;
  }

  return headers;
}

export function cleanup() {
  if (isPatched) {
    global.fetch = originalFetch;
    isPatched = false;
  }
}
