<template>
  <div class="bookcommit">
    <div class="commit" v-for="val in commitList" :key="val.id">
      <div class="img">
        <el-avatar :size="55">
          <img src="images/2.jpg" />
        </el-avatar>
      </div>
      <div class="content">
            <p>
                <label>买家：{{val.username}}</label>
                <span>评论时间：{{val.commentDate}}</span>
            </p>
            <h5>{{val.content}}</h5>
      </div>
      
    </div>
    <el-empty description="暂时还没有评论~" v-show="showEntry"/>
  </div>
</template>

<script>
export default {
  name: 'BookCommit',
  data () {
    return {
      commitList: [],
      showEntry:false
    }
  },
  methods: {

  },
  mounted () { },
  created () {
    //拿到书本的bookid值
    let bookid = this.$route.query.bookid;
    this.axios.get(`/book/${bookid}/comment`).then((res) => {
      if (res.status === 200) {
        this.commitList = res.data;
        this.commitList.length == 0 ? this.showEntry=true : this.showEntry = false;
        
        
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
}

.commit {
  width: 90%;
  display: flex;
  height: 60px;
  margin-left: 20px;
  margin-top: 5px;
  border-bottom: 1px dotted gray;
}

.commit .img {
  width: 5%;
}

.commit .content {
  width: 80%;
}

.content p{
  margin-top: 5px;
  color: gray;
  font-size: 12px;
}

.content h5{
  margin-top: 5px;
  font-size: 15px;
  font-weight: normal;
}
</style>
