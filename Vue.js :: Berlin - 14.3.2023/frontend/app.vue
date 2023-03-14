<script setup lang="ts">
// 1. Getting and events
import { useEventStore } from "~/stores/event";
import { useAuthStore } from "~/stores/auth";

const eventStore = useEventStore();
await eventStore.fetchEvents();

// 2. Login / Register

const authStore = useAuthStore();

const form = ref();
</script>

<template>
  <div class="grid grid-cols-1 justify-items-center p-16 gap-16">
    <h1
      class="text-4xl font-bold bg-gradient-to-r from-secondary to-primary inline-block text-transparent bg-clip-text mb-8"
    >
      Vue.js // Berlin Events of Interest
    </h1>

    <!-- 2. Login / Register -->
    <section class="grid grid-cols-1 gap-8">
      <div
        v-if="!authStore.user"
        class="tabs tabs-boxed bg-base-300 shadow-2xl w-full justify-center"
        :class="{
          'shadow-secondary': form === 'register',
          'shadow-primary': form === 'primary',
        }"
      >
        <a
          class="tab tab-lg"
          :class="{ 'tab-active': form === 'login' }"
          @click="form = 'login'"
          >Login</a
        >
        <a
          class="tab tab-lg"
          :class="{ 'tab-active': form === 'register' }"
          @click="form = 'register'"
          >Register</a
        >
      </div>
      <div v-else class="grid grid-flow-col gap-4">
        <span>Logged user: </span>
        <div class="badge badge-secondary badge-outline badge-lg">
          {{ authStore.user.username }}
        </div>

        <button class="btn btn-error btn-xs" @click="authStore.logoutUser">
          Log out
        </button>
      </div>

      <AppLoginForm v-if="form === 'login'" @logged="form = null" />
      <AppRegistrationForm
        v-if="form === 'register'"
        @registered="form = null"
      />
      <pre></pre>
    </section>

    <!-- 1. Get Events -->
    <section v-if="eventStore.events" class="grid grid-flow-row gap-16">
      <div
        class="card bg-base-300 shadow-2xl shadow-secondary border border-primary px-16 pt-16"
        v-for="event in eventStore.events"
      >
        <figure class="max-h-80">
          <img
            :src="useStrapiMedia(event.attributes.cover.data.attributes.url)"
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body items-center text-center gap-8">
          <h2 class="card-title text-primary text-4xl">
            {{ event.attributes.title }}
          </h2>
          <div class="badge badge-lg badge-secondary">
            Date: {{ new Date(event.attributes.start_at).toLocaleString() }}
          </div>
          <p>{{ event.attributes.description }}</p>

          <div>
            <div class="text-lg font-bold mb-4">
              Attendees:
              <div class="badge badge-lg badge-secondary">
                {{ event.attributes.attendees.data.length }}
              </div>
            </div>

            <div
              class="badge badge-accent badge-outline ml-4"
              v-for="attendee in event.attributes.attendees.data"
            >
              {{ attendee.attributes.username }}
            </div>
          </div>

          <div class="card-actions mt-8" v-if="authStore.user">
            <button
              v-if="event.attributes.attendees.data.find((attendee:any) => attendee.id === authStore.user.id)"
              class="btn btn-outline btn-wide btn-error"
              @click="eventStore.leaveEvent({ event, user: authStore.user })"
            >
              Leave event
            </button>
            <button
              v-else
              class="btn btn-outline btn-wide btn-primary"
              @click="eventStore.attendEvent({ event, user: authStore.user })"
            >
              Attend
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
