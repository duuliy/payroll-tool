<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: index }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>

    <h2>1.选择工资条2.确认工资条信息3.发送邮件</h2>
    <form name="myform">
      <input type="file"  @change='changeF($event)' value="开始上传" accept=".xlsx,.xlsm" /> 
      <br>  <br>
      发件人邮箱:<input type="text" v-model="email">
      邮箱密码:<input type="password" v-model="pass">  
      <button type='button' @click="checke()" style='margin-left:50px;'>发送</button>  
    </form>
  </section>
</template>

<script>
import axios from "~/plugins/axios";

export default {
  async asyncData() {
    let { data } = await axios.get("/api/users");
    return { users: data };
  },
  data() {
    return {
      title: "Users",
      email:"",
      pass:"",
      list:[],
    };
  },
  methods: {
    changeF(e) {
      let deviceFile = e.target.files[0];
      //  console.log(deviceFile[0])
        let data = new FormData();
        data.append("file", deviceFile);
      axios.post("/api/info",data).then(res=>{
        console.log(res)
        this.list=res.data.result
      });
    },
    async checke(){
      const res=await axios.post("/api/sendEamil",{
        list:this.list,
        email:this.email,
        pass:this.pass,
        }).then(res=>{
        console.log(res)
        if(res.status){
          alert('发送成功')
        }else{
          alert('发送失败')
        }
      })
    }
  }
};
</script>

<style scoped>
.title {
  margin: 30px 0;
}
.users {
  list-style: none;
  margin: 0;
  padding: 0;
}
.user {
  margin: 10px 0;
}
</style>
