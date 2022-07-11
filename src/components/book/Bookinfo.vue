<template>
  <div class="bookinfo">
     {{detail}}
  </div>
</template>

<script>
export default {
  name:  'BookInfo',
  props:['detail'],
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {},
  created () {}
  }
</script>

<style scoped>

/* 全局样式 */
*{
 margin: 0;
 padding: 0;
 list-style: none;
}

.bookinfo{
  width: 80%;
  height: auto;
  line-height: 30px;
  text-indent: 2rem;
  border: 1px dotted gray;
  margin-left: 25px;
}
</style>
