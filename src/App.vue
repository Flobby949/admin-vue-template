<template>
  <router-view />
</template>

<style>
#nprogress .bar {
  background-color: #3cb6ea !important;
  height: 5px !important;
}
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner {
  display: block;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
