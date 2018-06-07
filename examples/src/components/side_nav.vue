<template>
  <div class="side_nav">
    <ul>
      <li class="nav_item" v-for="item in navList">
        <a href="javascript:void(0)" v-if="!item.path" @click="handleTitleClick(item)">{{ item.name }}</a>
        <router-link
          v-else
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name" />
        <ul class="pure_menu_list sub_nav" v-if="item.children">
          <li class="nav_item" v-for="navItem in item.children">
            <router-link
              active-class="active"
              :to="base + navItem.path"
              v-text="navItem.title || navItem.name" />
          </li>
        </ul>
        <template v-if="item.groups">
          <div class="nav_group" v-for="group in item.groups">
            <div class="nav_group__title">{{ group.groupName }}</div>
            <ul class="pure_menu_list">
              <template v-for="navItem in group.list">
                <li
                  class="nav_item"
                  v-if="!navItem.disabled">
                  <router-link
                    active-class="active"
                    :to="base + navItem.path"
                    v-text="navItem.title" />
                </li>
              </template>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    navList: Array,
    base: {
      type: String,
      default: ''
    }
  },

  mounted() {
    console.log(this.navList);
  },

  methods: {
    handleTitleClick(item) {
      const firstGroup = item.groups && item.groups[0];
      if (firstGroup && firstGroup.list && firstGroup.list.length !== 0) {
        return this.$router.replace(this.base + firstGroup.list[0].path);
      }
    }
  }
};
</script>

<style lang="postcss">
.side_nav {
  flex: 0 0 250px;
  box-sizing: border-box;
  padding: 40px 0;
  border-right: 1px solid #e5e5e5;
  li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  .nav_item {
    a {
      font-size: 16px;
      color: #333;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: all .3s;
      padding: 0 20px;
      &.active {
        color: #3388FF;
        background-color: #F2F2F2;
      }
    }
    .nav_item {
      a {
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        padding-left: 44px;
        &:hover {
          color: #3388FF;
        }
      }
    }
  }
  .nav_group__title {
    font-size: 12px;
    color: #666;
    padding-left: 28px;
    line-height: 26px;
    margin-top: 10px;
  }
}
</style>