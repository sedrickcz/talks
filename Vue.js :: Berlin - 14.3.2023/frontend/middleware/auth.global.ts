import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 2. Authenticate user
  const store = useAuthStore();
  const token = useCookie("strapi_jwt");

  if (token.value) {
    await store.fetchUserFromStrapi();
  }

  return;
});
