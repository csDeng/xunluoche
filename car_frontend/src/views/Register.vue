<template>
  <div id="mbox">
    <a-card title="用户注册" content id="ucd">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'The input is not valid name!',
                  },
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            昵称&nbsp;
            <a-tooltip title="What do you want others to call you?">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'nickname',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              },
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              },
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            注册码&nbsp;
          </span>
          <a-input
            v-decorator="[
              'ensurecode',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your ensurecode!',
                    whitespace: true,
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit"> 注册 </a-button>
          <a-divider type="vertical" />
          <a-button @click="$router.back(1)">返回</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { name, nickname, password: pwd, ensurecode } = values;
          // console.log("Received values of form: ", values);
          const res = await this.$axios.post("/User/Register", {
            name,
            pwd,
            nickname,
            ensurecode
          });
          console.log(res);
          if(!res){
              return this.$message.error("网络错误")
          }
          const {StatusCode, Info} = res.data
          if( StatusCode===200){
            this.$message.success(Info).then(()=>{
              this.$router.push('/Login')
            })
          }
          else{
            this.$message.info(Info)
          }
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
  },
};
</script>

<style lang='less' scoped>
#mbox {
  width: 100%;
  height: 100%;
  background: #ececec;
  padding: 30px;
}
#uid {
  width: 80%;
  box-shadow: 0 0 10px #888888;
}
</style>