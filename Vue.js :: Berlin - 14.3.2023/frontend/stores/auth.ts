export const useAuthStore = defineStore("auth", () => {
  const { login, logout, fetchUser, register } = useStrapiAuth();

  const user = ref();

  async function fetchUserFromStrapi() {
    const response = await fetchUser();
    user.value = response.value;
  }

  interface LoginUser {
    email: string;
    password: string;
  }

  async function loginUser({ email, password }: LoginUser) {
    try {
      const response = await login({
        identifier: email,
        password: password,
      });

      user.value = response.user.value;
    } catch (error) {
      console.log("Error login -> ", error);
      throw error;
    }
  }

  interface RegisterUser {
    email: string;
    password: string;
    username: string;
  }

  async function registerUser({ email, password, username }: RegisterUser) {
    try {
      const response = await register({ email, password, username });
      user.value = response.user.value;
    } catch (error) {
      console.log("Error register -> ", error);
      throw error;
    }
  }

  async function logoutUser() {
    logout();
    user.value = null;
  }

  return {
    user,
    fetchUserFromStrapi,
    loginUser,
    logoutUser,
    registerUser,
  };
});
