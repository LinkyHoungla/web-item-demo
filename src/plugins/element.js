import Vue from 'vue'

import { Form, FormItem, Input, Button, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Pagination, Dialog, MessageBox, Tag, Tree } from 'element-ui'

// 表单
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

// 容器布局
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

// 侧边栏菜单
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Vue.use(MenuItemGroup)

// 面包屑
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

// 卡片
Vue.use(Card)

// Layout布局
Vue.use(Col)
Vue.use(Row)

// 表格
Vue.use(Table)
Vue.use(TableColumn)

// 页码栏
Vue.use(Pagination)

// 弹出框
Vue.use(Dialog)

// 标签
Vue.use(Tag)

// 树形结构
Vue.use(Tree)

// 弹出栏
Vue.prototype.$confirm = MessageBox.confirm

//导入弹窗
Vue.prototype.$message = Message