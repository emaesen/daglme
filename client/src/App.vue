<template>
  <div id="app">
    <img src="/img/illumined-earth.png" class="bg-img" alt="illumined earth">
    <div id="nav" class="nowrap">
      <router-link to="/" exact>Meditation</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/presenters">Presenters</router-link>
      <router-link to="/reminder" v-if="showReminderLink">Remind me</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <div id="footer">© 2019, Daily Global Meditation. All rights reserved.</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      allowReminderLink: true,
      showReminderLink: false
    }
  },
  mounted() {
    // show the reminder link only if service worker and
    // notifications are supported and were not previously denied
    // or if the user navigated to the reminder view explicitly.
    if ( (this.allowReminderLink && "serviceWorker" in navigator && "Notification" in window && Notification.permission !== "denied")
         || (this.$route && this.$route.path==="/reminder") ) {
      this.showReminderLink = true;
    }
  }
}
</script>

<style lang="less">
@font-face {
  font-family: 'Niconne';
  font-style: normal;
  font-weight: 400;
  font-display: auto;
  src: local('Niconne'), local('Niconne-Regular'), url(/fonts/niconne-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Vollkorn';
  font-style: normal;
  font-weight: 400;
  font-display: auto;
  src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(/fonts/volkorn-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Vollkorn';
  font-style: italic;
  font-weight: 400;
  font-display: auto;
  src: local('Vollkorn Italic'), local('Vollkorn-Italic'), url(/fonts/volkorn-italic-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Vollkorn';
  font-style: normal;
  font-weight: 700;
  src: local('Vollkorn Bold'), local('Vollkorn-Bold'), url(/fonts/volkorn-bold-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Vollkorn';
  font-style: italic;
  font-weight: 700;
  src: local('Vollkorn Bold Italic'), local('Vollkorn-BoldItalic'), url(/fonts/volkorn-bold-italic-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Rosario';
  font-style: normal;
  font-weight: 400;
  font-display: auto;
  src: local('Rosario'), local('Rosario-Regular'), url(/fonts/rosario.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
html, #nav {
  background-color: #0c1c31;
  background-image: url(/img/bg.png);
  background-size: initial;
  background-attachment: fixed;
}
#nav a {
  background-image: url(/img/bg.png);
  background-size: initial;
}
#nav {
  box-shadow: 0 0 40px #d9f0ff;
}
#nav.glow {
  box-shadow: 0 0 500px 500px #d9f0ff;
}
hr {
  margin: 5em 0;
  border-color: #6ab5ea;
  box-shadow: 0 0 20px #d9f0ff;
}
#app {
  height: 100%;
  padding: 5px 10px 200px;
}
.bg-img{
  position:fixed;
  bottom:0;
  z-index:-1;
  right:20%;
}
body,html {
  margin: 0;
  padding: 0;
}
body {
  margin: 0 auto;
  min-width: 300px;
  max-width: 900px;
}
body,
input,
textarea,
select,
button {
  font-family: 'Vollkorn', serif;
  font-size: 17px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f3f5e7;
  text-shadow: 2px 2px 10px #000;
}
button {
  margin: 1em .5em 1em 1em;
  background-color: #18213290;
  border: 1px solid #6ab5ea;
  border-radius: 9px;
  box-shadow: 0 0 5px #d9f0ff;
  line-height: 1.7em;
}
input {
  font-family: monospace;
  background-color: #18213290;
  border: 1px solid #6ab5ea90;
  border-radius: 5px;
  line-height: 1.3em;
}
.mono {
  font-family: monospace;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Niconne', sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  color: #f6d65d;
}
.emph-color {
  color: #f6d65d;
}
h1, h2.h1 {
  text-align: center;
  margin-top: 1.5em;
  font-size: 210%;
}
h2 {
  margin: 2em 0 0.5em 0;
  font-size: 170%;
}
h3 {
  margin: 2em 0 0.5em 0;
  font-size: 140%;
}
ul, ol {
  padding-left: 0;
}
ul {
  padding-inline-start: 0;
  margin-block-start: 0.5em;
}
ol {
  padding-inline-start: 1em;
  margin-block-start: 0.5em;
}
ul ul {
  padding-inline-start: 1em;
  margin-block-start: 0;
  margin-block-end: 0.2em;
}
ul li {
  list-style-type: none;
}
ul.bullet {
  padding-left: 1em;
  padding-inline-start: 1em;
  margin-block-start: 0.5em;
}
ul.bullet li {
  list-style-type: circle;
}
a,
.action {
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  color: #97fffb;
  font-family: 'Rosario', sans-serif;
  font-size: 90%;
}
a.external:after {
  content: " \02197";
  color: #7adaf7;
}
a.expand:after { 
  content: " \00A0 (" attr(href) ") "; 
  font-weight: 400;
  font-family: 'Vollkorn', serif;
  font-size: 85%;
  color: #7adaf7;
}
a.expand.external:after { 
  content: " \00A0 (" attr(href) ") \02197"; 
}
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0 0 0 -16px;
  min-width: 300px;
  max-width: 915px;
  z-index: 999;
  border-bottom: 2px solid #80afe4;
  opacity: 0.85;
  a {
    opacity: 1;
    margin-left:2em;
    padding: 5px 10px;
    display: inline-block;
    border-left: 2px solid #80afe4;
    border-right: 2px solid #80afe4;
    &.router-link-active {
      cursor: default;
      color: #f6d65d;
      margin-bottom: -5px;
      padding-bottom: 10px;
      box-shadow: 0 0 30px #a7dcff;
    }
  }
  a + a {
    margin-left:0;
    border-left: none;
  }
}
a.router-link-active {
  cursor: default;
  color: #f6d65d;
}
a.external:hover {
  color: #7adaf7;
}
a:not(.external):hover {
  color: #f6d65d;
}
#footer {
  left: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size:75%;
  opacity: .5;
}
.view {
  margin-bottom: 2em;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.faded {
  opacity: 0.3;
  text-shadow:none;
}
.outline {
  border: 1px solid #80afe481;
  border-radius: 20px;
  background-color: #00000027;
  color: #f3f5e7;
  padding: 5px 1px;
  box-shadow: 0 0 50px #a7dcff;
}
.poetic {
  font-family: 'Vollkorn', cursive;
  font-style: italic;
  font-size: 110%;
  line-height: 1.6em;
  text-align: center;
  margin: 1em;
}
.normal {
  font-style: normal;
  color: #f3f5e7;
}
.poetic.compact {
  font-size: 95%;
  line-height: normal;
}
.instruction,
.notice,
.note {
  font-style: italic;
  color: #f3f5e7b7;
}
.emph {
  font-weight: 700;
}
.emph-alert {
  color:#fa7147;
}
.spacer {
  display: block;
  margin: .5em;
}
.roomy {
  margin: .5em 0 1em 0
}
.margin-top5 {
  margin-top: .5em;
}
.margin-top10 {
  margin-top: 1.0em;
}
.margin-top20 {
  margin-top: 2.0em;
}
.margin-top30 {
  margin-top: 3.0em;
}
.margin-top50 {
  margin-top: 5.0em;
}
.spacious {
  margin: 1em 0 2em 0;
}
.indent {
  margin-left: 2em;
}
.nowrap {
  white-space: nowrap
}
.smallfont {
  font-size: 80%;
}
.alert-offscreen {
  transition: right .5s ease;
  right: -200px;
}
.alert{
  position:fixed;
  bottom:20px;
  right:10px;
  background-color: #f6d65dad;
  border-radius: 5px;
  padding: 2px 50px;
  color: #2e2846;
  text-shadow: none;
  font-weight: 700;
  box-shadow: 0 0 5px #5a0703;
}
.hidden {
  display: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.glow {
  text-shadow: 2px 2px 10px #00000050, 0 0 10px #ffffff90;
}
.pulse-glow {
  animation: pulse-glow 14s infinite;
  animation-timing-function: ease-in-out;
}
@keyframes pulse-glow {
  0%,
  100% {
    text-shadow: 0 0 10px #fff, 0 0 20px #fffb80;
  }
  50% {
    text-shadow: none;
  }
}
.todo {
  color: #b8cbf9;
}
@media all and (max-width: 1200px) {
  .bg-img{
    right:14%;
  }
}
@media all and (max-width: 915px) {
  #nav {
    margin: 0 0 0 -9px;
  }
}
@media all and (max-width: 900px) {
  .bg-img{
    right:7%;
  }
}
@media all and (max-width: 750px) {
  .bg-img{
    right:2%;
  }
}
@media all and (max-width: 600px) {
  body,
  input,
  textarea,
  select,
  button {
    font-size: 15px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: normal;
  }
  .bg-img{
    right:0;
    width: 100%
  }
}
@media all and (max-width: 350px) {
  #nav a {
    margin-left: 0;
  }
}
@media print {
  #nav, hr, img.bg-img {
    display:none;
  }
  html {
    background-color: #fff;
    background-image: none;
  }
  body,
  input,
  textarea,
  select,
  button,
  .normal {
    color: #333 !important;
    text-shadow: none !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #d6af1b !important;
  }
  a,
  .action {
    color: #4a80fd;
  }
}
</style>
