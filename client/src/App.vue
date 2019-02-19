<template>
  <div id="app">
    <img src="/img/illumined-earth.png" class="bg-img">
    <div id="nav">
      <router-link to="/">Meditation</router-link>
      <router-link to="/about">Presenters</router-link>
    </div>
    <transition name="view-fade" mode="out-in">
      <router-view/>
    </transition>
    <div id="footer">© 2019, In Shared Oneness. All rights reserved.</div>
  </div>
</template>

<style lang="less">
@font-face {
  font-family: 'Niconne';
  font-style: normal;
  font-weight: 400;
  src: local('Niconne'), local('Niconne-Regular'), url(/fonts/niconne-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Vollkorn';
  font-style: normal;
  font-weight: 400;
  src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(/fonts/volkorn-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Vollkorn';
  font-style: italic;
  font-weight: 400;
  src: local('Vollkorn Italic'), local('Vollkorn-Italic'), url(/fonts/volkorn-italic-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Rosario';
  font-style: normal;
  font-weight: 400;
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
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Niconne', sans-serif;
  font-weight: normal;
  letter-spacing: 1px;
  color: #f6d65d;
}
.emph-color {
  color: #f6d65d;
}
h1 {
  text-align: center;
  margin-top: 1.5em;
  font-size: 210%;
}
h2 {
  margin: 2em 0 0.5em 0;
  font-size: 170%;
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
  font-weight: normal;
  color: #97fffb;
  font-family: 'Rosario', sans-serif;
  font-size: 90%;
}
a.external:after { 
  content: " \00A0 (" attr(href) ") "; 
  font-weight: normal;
  font-family: 'Vollkorn', serif;
  font-size: 85%;
  color: #63c2df;
}
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0 0 0 -10px;
  min-width: 300px;
  max-width: 915px;
  z-index: 999;
  border-bottom: 2px solid #ccbd88;
  opacity: 0.85;
  a {
    opacity: 1;
    margin-left:2em;
    padding: 5px 10px;
    display: inline-block;
    border-left: 2px solid #ccbd88;
    border-right: 2px solid #ccbd88;
    &.router-link-exact-active {
      cursor: default;
      color: #f6d65d;
      margin-bottom: -2px;
      padding-bottom: 7px;
    }
  }
  a + a {
    margin-left:0;
    border-left: none;
  }
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
  text-align: center
}
.outline {
  border: 1px solid #cbdef713;
  border-radius: 10px;
  background-color: #00000027;
  color: #f3f5e7;
  padding: 5px 1px;
  box-shadow: 0 0 40px -10px #eef;
}
.poetic {
  font-family: 'Vollkorn', cursive;
  font-style: italic;
  font-size: 110%;
  line-height: 1.6em;
  text-align: center;
  margin: 1em;
}
.emph {
  font-weight: bold;
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
.spacious {
  margin: 1em 0 2em 0;
}
.indent {
  margin-left: 2em;
}
.nowrap {
  white-space: nowrap
}
.view-fade-enter-active, .view-fade-leave-active {
  transition: opacity .5s ease;
}
.view-fade-enter, .view-fade-leave-to {
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
  html, #nav, #nav a {
    background-size: contain;
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
</style>
