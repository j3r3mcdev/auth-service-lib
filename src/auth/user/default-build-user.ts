export function defaultBuildUserObject(payload: any) {
  return {
    isAuthenticated: true,
    payload,
    roles: [],
    permissions: [],
  };
}
