<template>
  <div class="home view">
    <h1>Daily Global Meditation</h1>

    <h2 class="center">A Call</h2>
    <div class="center outline">
      <div class="poetic glow margin-top5">
        Birthing of the <span class="nowrap">New Earth Culture &amp; Consciousness</span>
      </div>
      <div class="emph-color">
        <div class="emph">
          <span class="nowrap">5 Minute Meditation</span>, 
          <span class="nowrap">Each Day at 8 PM, Local Time</span>
        </div>
        <div>
          <span class="nowrap">(or choose first 5 minutes</span> of <span class="nowrap">any hour of the day)</span>
        </div>
      </div>
    </div>
    
    <h2>Simple Guidelines:</h2>
    <ul class="bullet">
      <li>Be in the Stillness.</li>
      <li>Envision Earth and Sky as Already Illumined and Whole. Feel It!</li>
      <li>Release the Vision.</li>
      <li>Silently say: ‘This Meditation is for the Earth and Sky.’</li>
      <li>Rest in the Infinite.<br>
          Rest in the Light of Consciousness.<br>
          Be empty by being open.<br>
          Be receptive to the Higher Awareness.<br> 
          ‘Thy Will Be Done.’<br>
          Listen Within.</li>
    </ul>

    <h2>Sacred Sound ~ Meditation Videos</h2>
    <div>
      You may meditate in silence,<br>
      listen to your own relaxing music of choice,<br>
      or listen to one of our three sacred sound recordings:
    </div>
    <ol>
      <li :class="['action', videoPreviewNr===0? 'inactive' : '']" @click="selectRecording(0)">
        <span v-if="videoPreviewNr===0" class="checked">☑</span>
        <span v-else>☐</span>
        The soothing melody of a metal tongue drum
      </li>
      <li :class="['action', videoPreviewNr===1? 'inactive' : '']" @click="selectRecording(1)">
        <span v-if="videoPreviewNr===1" class="checked">☑</span>
        <span v-else>☐</span>
        A soft healing chant
      </li>
      <li :class="['action', videoPreviewNr===2? 'inactive' : '']" @click="selectRecording(2)">
        <span v-if="videoPreviewNr===2" class="checked">☑</span>
        <span v-else>☐</span>
        The trance rhythm of a shamanic drum
      </li>
    </ol>
    <div class="videoContainer">
      <transition name="fade" mode="out-in">
        <img v-if="showVideoPreview" :src="videoPreviewSrc" class="action border" :key="videoPreviewNr" @click="showVideo">
        <iframe v-else :src="videoSrc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </transition>
      <div class="note emph-caution" :class="{invisible:!showVideoPreview}">➥ clicking the above image will embed a YouTube video</div>
    </div>
    <ul>
      <li>One will connect with the Divine Current.</li>
      <li>One will be One with the Infinite.</li>
      <li>One will be open to the Perfect Plan for Earth and Sky.</li>
      <li>One will realize that Action is Borne of Vision.</li>
    </ul>

    <h2 class="center">Planetary Initiation for Humanity</h2>
    <div class="poetic compact">
      <div class="normal">
        <div>
          Daily Planetary Meditations are a catalyst for all to open to Oneness Consciousness.
        </div>
        <div class="margin-top5">
          Daily Planetary Meditations soften the collective shift.
        </div>
        <div class="margin-top5">
          Daily Planetary Meditations ignite souls around the earth.
        </div>
        <div class="margin-top5">
          Daily Planetary Meditations open ones to see the Web of Life and Web of Light.
        </div>
        <div class="margin-top5">
          Daily Planetary Meditations open ones to see the Illumined Earth and Sky.
        </div>
        <div class="margin-top5">
          Daily Planetary Meditations give the revelation that we are all Already ONE.
        </div>
      </div>
      <div class="margin-top10">
        <div>
          Let us together…open to this wave of light…
        </div>
        <div class="margin-top5">
          Let us together…be in the transcendent realm…
        </div>
        <div class="margin-top5">
          Let us together…allow the Feminine Principle, the receptive, to give the VISIONS…
        </div>
        <div class="margin-top5">
          Let us together…allow the Actions Borne of VISION…
        </div>
      </div>
    </div>


    <h2>Global Awakening</h2>
    <ul>
      <li>A daily synchronized wave of Awareness Awakening…</li>
      <li>propagating around the globe.</li>
      <li class="margin-top5">The group effect…</li>
      <li>amplifying the intentions of each individual.</li>
      <li class="margin-top5">#DailyGlobalMeditation, #daglme</li>
    </ul>

    <h2>Presented and Supported by:</h2>
    <ul>
      <li><a href="http://EarthCareGlobalTV.com" class="external expand" rel="noopener">EarthCare Global TV</a></li>
      <li class="margin-top5"><a href="https://InSharedOneness.com" class="external expand" rel="noopener">In Shared Oneness retreats</a>:<br>
        <ul>
        <li><a href="http://MarySaintMarie.com" class="external expand" rel="noopener">Mary Saint-Marie</a></li>
        <li><a href="http://letempledelesprit.com/" class="external expand" rel="noopener">Angelique Jan Pera</a></li>
        <li><a href="https://kagalakan.com" class="external expand" rel="noopener">Edward Maesen</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
const videoPreviewSrcFolder = "/img/video/";
const videoPreviewSources = ["tongue-drum.jpg", "healing-chant.jpg", "shamanic-drum.jpg"];
const videoEmbedPath = "https://www.youtube-nocookie.com/embed/";
const videoSourceIds = ["QFPyTxCrMrk", "wNNGEqrV-yY", "0BDd7i9vV1k"];
// https://developers.google.com/youtube/player_parameters
const videoEmbedQS = "?autoplay=1" 
      + "&fs=0"
      + "&playsinline=1"
      + "&rel=0"
      + "&origin=" + window.location.protocol + "//" + window.location.hostname;

export default {
  name: "home",
  data() {
    return {
      showVideoPreview: true,
      videoPreviewNr: 0,
      videoPreviewSrc: videoPreviewSrcFolder + videoPreviewSources[0]
    }
  },
  methods: {
    selectRecording(nr) {
      this.videoPreviewNr = nr;
      this.videoPreviewSrc = videoPreviewSrcFolder + videoPreviewSources[nr];
    },
    showVideo() {
      this.showVideoPreview = false;
    }
  },
  computed: {
    videoSrc() {
      return videoEmbedPath + videoSourceIds[this.videoPreviewNr] + videoEmbedQS
    }
  }
};
</script>
