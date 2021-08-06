<template>
  <div>
    <a-card title="设备管理">
      <a-form
        :form="form"
        layout="inline"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @submit="handleSubmit"
      >
        <a-form-item label="设备名称:">
          <a-input
            placeholder="请输入小车设备名称"
            v-decorator="[
              'DeviceName',
              { rules: [{ required: true, message: '请输入小车设备名称!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="设备id:">
          <a-input
            placeholder="请输入设备的id"
            v-decorator="[
              'DeviceId',
              { rules: [{ required: true, message: '请输入设备的id!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="设备ip:">
          <a-input
            placeholder="请输入设备的ip地址"
            v-decorator="[
              'Ip',
              { rules: [{ required: true, message: '请输入设备的ip地址!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="设备端口">
          <a-input
            placeholder="请输入设备的端口"
            v-decorator="[
              'Port',
              { rules: [{ required: true, message: '请输入设备的端口!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 5 }">
          <a-button type="primary" html-type="submit"> 添加 </a-button>
        </a-form-item>
      </a-form>

      <a-table bordered :data-source="dataSource" :columns="columns">
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除吗?"
            @confirm="() => onDelete(record)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import columns from "./columns";

export default {
  components: {
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      dataSource: [],
      columns,
    };
  },
  async mounted() {
    this.get();
  },
  methods: {
    async get() {
      const res = await this.$axios.get("/HomePage/BindDevice");
      // console.log("res=", res);
      const { StatusCode, Info } = res.data;
      if (StatusCode === 404) {
        this.dataSource = [];
        return this.$message.error(Info);
      }
      this.dataSource = Info;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const res = await this.$axios.post("/HomePage/BindDevice", values);
          // console.log(res);
          const { StatusCode, Info } = res.data;
          if (StatusCode === 200) {
            this.$message.success(Info);
            this.get()
          }
          else{
            this.$message.info(Info)
          }
        }
      });
    },
    async onDelete(key) {
      const res = await this.$axios.post('/HomePage/DeleteDevice',{did: key.DeviceId})
      // console.log(res)
      const { StatusCode, Info} = res.data
      if(StatusCode===200){
        this.$message.success(Info)
        this.get()
      }
      else{
        this.$message.info(Info)
      }
    },
  },
};
</script>

<style>
</style>