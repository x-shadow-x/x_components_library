import { destroyVM, createTest, createVue } from '../util.js'
import Hello from '../../../packages/hello/hello.vue'

describe('Hello.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('render default classList in hello', () => {
    vm = createTest(Hello);
    expect(vm.$el.classList.contains('v-hello')).toBe(true);
    const message = vm.$el.querySelector('.v-hello__message');
    expect(message.classList.contains('v-hello__message')).toBe(true);
  });

  it('create a hello for click with promise', (done) => {
    let result;
    vm = createVue({
      template: `<v-hello @click="handleClick"></v-hello>`,
      methods: {
        handleClick (msg) {
          result = msg
        }
      }
    }, true);
    vm.$el.click();
    // 断言消息是异步emit出去的
    expect(result).toBeUndefined()
    setTimeout(_ => {
      expect(result).not.toBeUndefined()
      expect(result).toEqual('this is click emit')
      done()
    }, 20)
  })
})

// import  Vue from 'vue'
// import Hello from '../../../packages/hello/hello.vue'

// describe('Hello.vue', () => {
//   // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
//   it('render default classList in hello', () => {
//     const Constructor = Vue.extend(Hello) // 获得Hello组件实例
//     const vm = new Constructor().$mount() // 将组件挂在到DOM上
//     // 断言：DOM中包含class为v-hello的元素
//     expect(vm.$el.classList.contains('v-hello')).toBe(true)
//     const message = vm.$el.querySelector('.v-hello__message')
//     // 断言：DOM中包含class为v-hello__message的元素
//     expect(message.classList.contains('v-hello__message')).toBe(true)
//   })
// })