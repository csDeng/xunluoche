<template>
<div id="main" >
  <img id='image'   src='../images/hero-banner.png'/>
 
  <a-form
    id="login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
    
  > 
    <a-form-item
        label="用户名"
        labelAlign='left'
        required
        hasFeedback
    >
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
        label="密码"
        labelAlign='left'
        required
        hasFeedback
    >
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >
        Remember me
      </a-checkbox>
      <br />
      <a-button type="primary" html-type="submit">
        登录
      </a-button>
      Or
      <a href="javascript:;" @click="$router.push('/Register')">
        注册
      </a>
    </a-form-item>
  </a-form>
</div>
  
</template>

<script>
export default {
  name:'Login',
  data(){
    return {
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
    // console.log("form=",this.form)
  },
  async mounted(){
    const name = await window.localStorage.getItem('name')
    const pwd = await window.localStorage.getItem('password')
    console.log(name,pwd)
    if(name){
      this.form.setFieldsValue({'userName':name})
    }
    if(pwd){
      this.form.setFieldsValue({'password':pwd})
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if(!this.form){
        return ;
      }
      this.form.validateFields( async(err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const { userName: name, password: pwd} = values
          if(values.remember){
            window.localStorage.setItem('name',name)
            window.localStorage.setItem('password',pwd)
          }
          const res = await this.$axios({
            url:'/User/Login',
            method:'POST',
            data:{
              name,
              pwd
            }
          })
          console.log(res)
          const {StatusCode, Info, token } = res.data
          await window.localStorage.setItem('token',token)
          if(StatusCode === 200){
            this.$message.success(Info).then(()=>{
              this.$router.push('/Home')
            })
          }
        }
      });
    },
  }
};
</script>
<style lang='less'>
#main{
  width:100%;
  height:100%;
  background-image: url('../images/banner-bg.png');
  #image{
    position: absolute;
    left:100px;
    top:100px;
    opacity: 0.6;
  }
  #login{
  max-width: 360px;
  max-height: 560px;
  background: #fff;
  padding:30px;
  position:relative;
  left:60%;
  top:25%;
  @media screen and (max-height:500px){
    top:0;
  }
  @media screen and (max-width:900px) {
    left:10%;
  }
}
}


</style>