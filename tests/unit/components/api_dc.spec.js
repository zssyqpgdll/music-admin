import {mount} from '@vue/test-utils'
import TestAPI from "../../TestAPI.vue";

describe('TestAPI',()=>{
  const wrapper = mount(TestAPI)
  const res = wrapper.res

  it('接口测试',()=>{
    expect(res).toBeCalled()
  })
})