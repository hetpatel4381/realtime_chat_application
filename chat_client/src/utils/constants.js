const AUTH_ROUTES = "api/auth";
const CONTACTS_ROUTES = "api/contacts";
const MESSAGES_ROUTES = "api/messages";
const CHANNEL_ROUTES = "api/channel";

const _serverRoutes = {
  AUTH_ROUTES,
  SIGNUP_ROUTE: `${AUTH_ROUTES}/signup`,
  LOGIN_ROUTE: `${AUTH_ROUTES}/login`,
  GET_USER_INFO: `${AUTH_ROUTES}/user-info`,
  UPDATE_PROFILE: `${AUTH_ROUTES}/update-profile`,
  ADD_PROFILE_IMAGE: `${AUTH_ROUTES}/add-profile-image`,
  REMOVE_PROFILE_IMAGE: `${AUTH_ROUTES}/remove-profile-image`,
  LOGOUT: `${AUTH_ROUTES}/logout`,

  SEARCH_CONTACTS: `${CONTACTS_ROUTES}/search`,
  GET_DM_CONTACTS: `${CONTACTS_ROUTES}/get-contacts-for-dm`,
  GET_ALL_CONTACTS: `${CONTACTS_ROUTES}/get-all-contacts`,

  GET_ALL_MESSAGES_ROUTE: `${MESSAGES_ROUTES}/get-messages`,
  UPLOAD_FILE_ROUTE: `${MESSAGES_ROUTES}/upload-file`,

  CREATE_CHANNEL_ROUTE: `${CHANNEL_ROUTES}/create-channel`,
  GET_USER_CHANNELS_ROUTE: `${CHANNEL_ROUTES}/get-user-channels`,
  GET_CHANNEL_MESSAGES: `${CHANNEL_ROUTES}/get-channel-messages`,
};

export const serverRoutes = Object.freeze(_serverRoutes);
