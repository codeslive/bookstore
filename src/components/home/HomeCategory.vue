<template>
  <div class="category">
      <el-menu :unique-opened="true">
          <el-sub-menu v-for="item in menuList" :key="item.id" :index="item.id.toString()">
              <template #title>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group v-if="item.children && item.children.length>0" >
                <el-menu-item  v-for="val in item.children" :key="val.id" :index="val.id.toString()" @click="getCategory(val.id)">
                    {{val.name}}
                </el-menu-item>
              </el-menu-item-group>
          </el-sub-menu>
      </el-menu>
  </div>
</template>

<script>
export default {
  name:  'HomeCategory',
  data () {
    return {
        menuList:[],
        id:'',
        url:'',
    }
  },
  methods: {
      getCategory(id){
    
          this.$router.push({
                path : `/category/${id}`,
               
            })
      },
  },
  mounted () {},
  created () {
    this.axios.get(`/category`).then((res)=>{
    if(res.status === 200){
        this.menuList = res.data;
    }
    }).catch((error)=>{
     console.log(error);
     });

     

    
  }

  
  }
</script>

<style scoped>

/* 全局样式 */
*{
 margin: 0;
 padding: 0;
 list-style: none;
}


.category{
  width: 20%;
  height: 100%;
}

.category .el-menu-item{
  min-width: 0px !important;
}

.category .el-menu-item a{
  color: #616301;
}
</style>
