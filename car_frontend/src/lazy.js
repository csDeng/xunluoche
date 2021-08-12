import Vue from 'vue'
import {
    Button,
    Input,
    Icon,
    Layout,
    Breadcrumb,
    Menu,
    Form,
    Checkbox,
    Dropdown,
    Card,
    Row,
    Col,
    Table,
    Popconfirm,
    message,
    Divider,
    Select,
    Tooltip,
    Modal
} from 'ant-design-vue';

Vue.prototype.$message = message

Vue.use(Button)
    .use(Input)
    .use(Layout)
    .use(Breadcrumb)
    .use(Menu)
    .use(Form)
    .use(Checkbox)
    .use(Icon)
    .use(Dropdown)
    .use(Card)
    .use(Row)
    .use(Col)
    .use(Table)
    .use(Popconfirm)
    .use(Divider)
    .use(Select)
    .use(Tooltip)
    .use(Modal)
;
