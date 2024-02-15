import {
  VITE_API_AUTH_0_DOMAIN,
  VITE_API_AUTH_0_CLIENT_ID,
  VITE_API_AUTH_0_AUDIENCE
} from "@/config/auth"
import { createAuth0 } from "@auth0/auth0-vue"

export const auth_0 = createAuth0({
  domain: VITE_API_AUTH_0_DOMAIN,
  clientId: VITE_API_AUTH_0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: VITE_API_AUTH_0_AUDIENCE
  },
  cacheLocation: "localstorage",
  useRefreshTokens: true
})
