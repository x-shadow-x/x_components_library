const registerRoute = (navConfig, isMobile) => {
  let route = [];
  let navs = navConfig['zh-CN'];
  navs.forEach(nav => {
    if(isMobile && !nav.showInMobile) {
      return;
    }

    if(nav.default) {
      setDefault(nav.default);
    }

    if(nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav);
        })
      })
    } else if(nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })

  // 进行路由注册
  function addRoute (page) {
    // 不同的设备环境引入对应的路由文件
    const component = isMobile
      ? require(`../mobile_pages${page.path}.vue`)
      : require(`../pc_pages${page.path}.md`)
    route.push({
      path: '/component' + page.path,
      component: component.default || component
    })
  }

  function setDefault(defaultPage) {
    route.push({
      path: '',
      redirect: `/component${defaultPage}`
    });
  }

  return {
    routes: route,
    mode: 'history',
  }
}

export default registerRoute