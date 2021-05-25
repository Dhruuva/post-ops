import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Home from '@/views/Home'
import Vuetify from 'vuetify'
Vue.config.silent = true;
describe('Home.vue', () => {
	const localVue = createLocalVue()
    let vuetify

     beforeEach(() => {
	    vuetify = new Vuetify()
	 })

	 it('Home.vue is work', () => {
	    
	    const wrapper = mount(Home, {
	    	localVue,
     		vuetify

	    })

	    //expect(wrapper.text()).toMatch("fhf")
	    expect(wrapper.html()).toMatchSnapshot()
	})
})
