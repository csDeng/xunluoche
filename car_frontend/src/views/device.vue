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
        <a-form-item label="名字">
          <a-input
            placeholder="请输入小车设备名字"
            v-decorator="[
              'name',
              { rules: [{ required: true, message: '请输入小车设备名字!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item label="地点">
          <a-input
            placeholder="请输入小车巡逻线路"
            v-decorator="[
              'address',
              { rules: [{ required: true, message: '请输入小车巡逻线路!' }] },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 5 }">
          <a-button type="primary" html-type="submit"> 添加 </a-button>
        </a-form-item>
      </a-form>

      <a-table bordered :data-source="dataSource" :columns="columns">
        <template slot="name" slot-scope="text, record">
          <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'name', $event)"
          />
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除吗?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import EditableCell from '@/EditableCell';



export default {
  components:{
    EditableCell,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      dataSource: [
        {
          key: '1',
          name: '巡逻王',
          id: '1',
          address: '北区宿舍',
        },
        {
          key: '2',
          name: '巡逻小兵1',
          id: '2',
          address: '教学楼',
        },
        {
          key: '3',
          name: '巡逻小兵2',
          id: '3',
          address: '竹韵花园',
        },
        {
          key: '4',
          name: '巡逻小兵3',
          id: '4',
          address: '马鞍岭',
        },
      ],
      count: 4,
      columns: [
        {
          title: '设备id',
          dataIndex: 'id',
        },
        {
          title: '设备名字',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '巡逻地点',
          dataIndex: 'address',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const { name, address } = values
          const { count, dataSource } = this;
          const newData = {
            key: count,
            id: count,
            name,
            address,
          };
          this.dataSource = [...dataSource, newData];
          this.count = count + 1;
          this.$message.success("添加成功")
        }
      });
      
    },
     onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    }
  },
};
</script>

<style>
</style>