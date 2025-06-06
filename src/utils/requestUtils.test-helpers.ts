import { patchGlobalFetch } from './requestUtils.js';

let defaultHeaders: Record<string, string> = {};

export function setupFetch(overrides?: any) {
  const mockFetch = (global.fetch = jest.fn());
  defaultHeaders = patchGlobalFetch({
    name: 'TestServer',
    version: '1.0.0',
    sha: 'abcdef',
    tag: 'no-tag',
    branch: 'default'
  });
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: async () => ({ success: true }),
    arrayBuffer: async () => new ArrayBuffer(0),
    ...overrides
  });
  return mockFetch;
}

export function assertHeadersSent(mockFetch: jest.Mock) {
  expect(mockFetch).toHaveBeenCalledTimes(1);
  const callArgs = mockFetch.mock.calls[0];
  const requestInit = callArgs[1];
  expect(requestInit?.headers).toMatchObject(defaultHeaders);
}
