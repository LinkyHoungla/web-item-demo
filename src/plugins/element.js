import Vue from 'vue'

import { Form, FormItem, Input, Button, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// Vue.use(MenuItemGroup)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.use(Card)

Vue.use(Col)
Vue.use(Row)

//导入弹窗
Vue.prototype.$message = Message