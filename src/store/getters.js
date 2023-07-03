const getters = {
  token: state => state.admin.token,
  name: state => state.admin.name,
  avatar: state => state.admin.avatar,
  role: state => state.admin.role,
  menu: state => state.admin.menu,
}

export default getters