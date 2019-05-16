<template>
  <div class="presenters view">
    <h1>About the Presenters</h1>

    <p class="margin-top20">
      The Daily Global Meditation is presented by
      <router-link to="/presenters/mary-saint-marie">Mary Saint-Marie</router-link>,
      <router-link to="/presenters/angelique-jan-pera">Angelique Jan Pera</router-link> 
      and
      <router-link to="/presenters/edward-maesen">Edward Maesen</router-link>,
      in association with
      <router-link to="/presenters/earthcare-global-tv">EarthCare Global TV</router-link>
      and
      <router-link to="/presenters/in-shared-oneness">In Shared Oneness</router-link> retreats.
      <br>
      <span class="instruction">(Click any of these names to view their information below)</span>
    </p>

    <transition name="view-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "about",
  components: {}
};
</script>