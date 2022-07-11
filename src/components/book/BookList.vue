<template>
  <div class="booklist">

   
    <div v-for="val in list" :key="val.id">
        <BookListItem :item="val"></BookListItem>
    </div>

  </div>
</template>

<script>
import BookListItem from './BookListItem.vue';
export default {
  name: 'BookList',
  props: {
    list: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    BookListItem
  },
  data () {
    return {
      booklist: [],
      show: false,
      description: '没有找到数据~',
    }
  },
  methods: {
    getList () {

      this.booklist = this.list;
      for (let i in this.booklist) {
        // console.log(this.booklist[i].id);

      }



    }
  },


  mounted () {
    this.getList();
  },


  created () {
      console.log(this.$route.path);
      
  },

}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.book {
  display: flex;
  height: 300px;
  width: 100%;
  border-bottom: 1px dotted rgb(149, 203, 255);
}

.img {
  width: 20%;
  height: 100%;
}

.img img {
  width: 50%;
  height: 80%;
  margin: 10% 25%;
}

.right {
  width: 50%;
  height: 280px;
}

.right h3 {
  margin-top: 55px;
  margin-bottom: 10px;
  color: rgb(150, 143, 163);
}

.right p {
  margin: 10px 0;
}

.right p label {
  color: gold;
  font-weight: bold;
}

.right p span {
  color: black;
  display: inline-block;
  margin-left: 15px;
}

.right p span em {
  text-decoration: line-through;
  color: rgb(217, 217, 217);
}

.right h6 {
  margin: 10px 0;
  font-style: initial;
  color: rgb(217, 217, 217);
}

.right h6 span {
  display: inline-block;
  margin: 0 10px;
}

.right aside {
  color: rgb(217, 217, 217);
  font-size: 15px;
}
.right button {
  width: 130px;
  height: 35px;
  color: white;
  background-color: gold;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
