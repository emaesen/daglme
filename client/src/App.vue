<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Meditation</router-link>
      <router-link to="/about">Supporters</router-link>
    </div>
    <transition name="view-fade" mode="out-in">
      <router-view/>
    </transition>
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
body,html {
  height: 100%;
  padding: 5px;
  margin: 0
}
body {
  margin: 0 auto;
  min-width: 300px;
  max-width: 900px;
  background-color: #fff;
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
  color: #493a84;
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
  color: #7d3f92;
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
  padding-inline-start: 1.5em;
  margin-block-start: 0.5em;
}
ul.bullet li {
  list-style-type: circle;
}
a,
.action {
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  color: #1860da;
}
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  margin: 0 0 0 -10px;
  min-width: 300px;
  max-width: 915px;
  z-index: 999;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  opacity: 0.95;
  a {
    margin-left:2em;
    padding: 5px;
    display: inline-block;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    &.router-link-exact-active {
      cursor: default;
      color: #081f46;
      background-color: #fff;
      margin-bottom: -1px;
      padding-bottom: 6px;
    }
  }
  a + a {
    margin-left:0;
    border-left: none;
  }
}
.view {
  margin-bottom: 2em;
}
.center {
  text-align: center
}
.outline {
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #ccccfc27;
    color: #87429e;
    padding: 5px 10px;
}
.poetic {
  font-family: 'Vollkorn', cursive;
  font-style: italic;
  font-size: 120%;
  margin: 1em 0;
  line-height: 1.6em;
  text-align: center;
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
.spacious {
  margin: 1em 0 2em 0;
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
}
</style>
