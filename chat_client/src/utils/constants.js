const AUTH_ROUTES = "api/auth";

const _serverRoutes = {
  AUTH_ROUTES,
  SIGNUP_ROUTE: `${AUTH_ROUTES}/signup`,
  LOGIN_ROUTE: `${AUTH_ROUTES}/login`,
};

export const serverRoutes = Object.freeze(_serverRoutes);
