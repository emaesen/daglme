<template>
  <div>
    <EarthCareGlobalTV></EarthCareGlobalTV>
    <InSharedOneness></InSharedOneness>
  </div>
</template>

<script>
import InSharedOneness from "./InSharedOneness.vue";
import EarthCareGlobalTV from "./EarthCareGlobalTV.vue";

export default {
  name: "Sponsors",
  components: {
    InSharedOneness,
    EarthCareGlobalTV
  }
};
</script>