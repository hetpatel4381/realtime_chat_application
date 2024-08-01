const AUTH_ROUTES = "api/auth";

const _serverRoutes = {
  AUTH_ROUTES,
  SIGNUP_ROUTE: `${AUTH_ROUTES}/signup`,
  LOGIN_ROUTE: `${AUTH_ROUTES}/login`,
  GET_USER_INFO: `${AUTH_ROUTES}/user-info`,
  UPDATE_PROFILE: `${AUTH_ROUTES}/update-profile`,
};

export const serverRoutes = Object.freeze(_serverRoutes);
