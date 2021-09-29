// これは無視してくれぇ

<template>
  <section class="container">
    <h1>へのへの</h1>
    <div v-for="(item, index) in task" :key="index">
      <h3>{{ item.content }}</h3>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        content:''
      }
    },
    computed: {
      ...mapState(['task'])
    }
  }
</script>




<style>
  .box {
    width: 300px;
    height: 300px;
    color: white;
  }
</style>

