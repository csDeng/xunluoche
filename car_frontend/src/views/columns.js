export default [
    {
      title: '设备id',
      dataIndex: 'DeviceId',
      
    },
    {
      title: '设备名称',
      dataIndex: 'DeviceName',
      width: '30%'
    },
    { 
      title: '设备ip',
      dataIndex: 'Ip',
    },
    {
        title: '设备端口',
        dataIndex: 'Port',
      },
    {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
]