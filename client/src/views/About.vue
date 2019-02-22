<template>
  <div class="about view">

    <h1>About the Daily Global Meditation</h1>

    <p class="margin-top20">
      The Daily Global Meditation is a call for peoples around the world to participate in a short daily meditation or prayer at 8PM local time.<br>
      If 8PM is an inconvenient time, one may choose any other hour of the day and align with individuals for which that hour is their local 8PM.
    </p>
    <p>
      The goal is to have enough daily participants to reach a critical mass that will produce improvements in the quality of life for mankind. Similar to the <a href="https://tmhome.com/benefits/study-maharishi-effect-group-meditation-crime-rate/" target="_blank">"Maharishi effect"</a>: research in 1976 found that when 1% of a community practiced Transcendental Meditation, the crime rate was reduced by 16% on average. 
    </p>
    <p>
      One doesn't need to be an experienced meditator to join our Daily Global Meditation. We suggest a focused attention daily for 5 minutes at 8PM local time, to envision the Earth and Sky as Illumined and Whole.
    </p>

    <div class="poetic compact normal margin-top50">
      <div>
        A daily meditation for the Earth and the Sky.
      </div>
      <div class="margin-top5">
        A daily prayer for peace, love, equality and abundance…
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
        A daily anchor to feel United as One.
      </div>
    </div>

    <hr id="info">

    <h2 class="h1">About the Presenters</h2>

    <p class="margin-top20">
    The Daily Global Meditation is presented by
    <router-link to="/about/mary-saint-marie">Mary Saint-Marie</router-link>,
    <router-link to="/about/angelique-jan-pera">Angelique Jan Pera</router-link> and
    <router-link to="/about/edward-maesen">Edward Maesen</router-link>,
    in association with <router-link to="/about/earthcare-global-tv">EarthCare Global TV</router-link> 
    and <router-link to="/about/in-shared-oneness">In Shared Oneness</router-link>.<br>
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