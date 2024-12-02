<template>
  <div class="card">
    <button type="button" @click="plus">count is {{ store.count }}</button>
  </div>
</template>

<script setup lang="ts">
import {useDuck} from 'observable-duck/vue'
import Duck from './Duck'

const { store, duck, dispatch } = useDuck(Duck)

function plus() {
  console.log(store.value)
  dispatch({
    type: duck.types.SET_VALUE,
    payload: store.value.count + 1,
  })
}


</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
