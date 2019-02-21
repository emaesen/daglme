<template>
  <div class="about view">

    <h1>About the Daily Global Meditation</h1>

    <p>
      The Daily Global Meditation is a call for peoples around the world to participate in a short daily meditation or prayer at 8PM local time.<br>
      If 8PM is an inconvenient time, one may choose any other hour of the day and align with individuals for which that hour is their local 8PM.
    </p>

    <div class="poetic compact">
      <div>
        A daily meditation for the Earth and the Sky.
      </div>
      <div class="margin-top5">
        A prayer for peace, love, equality and abundance.
      </div>
      <div class="margin-top5">
        Weaving a web of light around the globe…
      </div>
      <div class="margin-top5">
        Expanding day by day, driven by the power of group meditation.
      </div>
      <div class="margin-top5">
        A catalyst for all that are on the brink of awakening.
      </div>
      <div class="margin-top5">
        A beacon for lost souls.
      </div>
      <div class="margin-top5">
        A place and moment in time to feel at ease, to be home.
      </div>
    </div>

    <p class="margin-top20">
    The Daily Global Meditation is presented by
    <router-link to="/about/mary-saint-marie">Mary Saint-Marie</router-link>,
    <router-link to="/about/angelique-jan-pera">Angelique Jan Pera</router-link> and
    <router-link to="/about/edward-maesen">Edward Maesen</router-link>,
    in association with <router-link to="/about/earthcare-global-tv">EarthCare Global TV</router-link> 
    and <router-link to="/about/in-shared-oneness">In Shared Oneness</router-link>.
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