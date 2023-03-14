<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const store = useAuthStore();

const user = ref({ email: "", password: "" });

const emit = defineEmits(["logged"]);

const onSubmit = async () => {
  try {
    await store.loginUser(user.value);
    emit("logged");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="grid grid-cols-1 gap-4 border border-primary p-8 rounded-xl bg-base-300 shadow-2xl shadow-primary"
  >
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">E-mail</span>
      </label>
      <input
        type="email"
        v-model="user.email"
        placeholder="rick@ilovemorty.me"
        class="input input-bordered input-primary w-full max-w-xs"
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        v-model="user.password"
        class="input input-primary input-bordered w-full max-w-xs"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <button class="btn btn-outline btn-wide btn-primary">Login</button>
    </div>
  </form>
</template>
