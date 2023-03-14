export const useEventStore = defineStore("event", () => {
  // 1. Fetch events
  const events = ref();

  async function fetchEvents() {
    const { find } = useStrapi();

    const response = await find("events", { populate: "*" });
    events.value = response.data;
  }

  // Attending an event
  async function attendEvent({ event, user }: any) {
    const { update } = useStrapi();

    const attendees = event.attributes.attendees.data.map(
      (attendee: any) => attendee.id
    );
    attendees.push(user.id);

    try {
      await update("events", event.id, {
        attendees,
      });
      fetchEvents();
    } catch (error) {
      throw error;
    }
  }

  // Leaving an event
  async function leaveEvent({ event, user }: any) {
    const { update } = useStrapi();

    const attendees = event.attributes.attendees.data.filter(
      (attendee: any) => attendee.id !== user.id
    );

    try {
      await update("events", event.id, {
        attendees,
      });
      fetchEvents();
    } catch (error) {
      throw error;
    }
  }

  return {
    events,
    attendEvent,
    leaveEvent,
    fetchEvents,
  };
});
