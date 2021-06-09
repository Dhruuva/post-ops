import Vue from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'
import About from '@/views/About'
import Vuetify from 'vuetify'
Vue.config.silent = true;
describe('About.vue', () => {
	const localVue = createLocalVue()
    let vuetify
	let $vuetify
     beforeEach(() => {
	    vuetify = new Vuetify()
	    $vuetify = new Vuetify()
	 })

	 it('About.vue is work', () => {
	    
	    const wrapper = mount(About, {
	    	localVue,
     		vuetify,
     		$vuetify

	    })

	    //expect(wrapper.text()).toMatch("fhf")
	    expect(wrapper.html()).toMatchSnapshot()
	})
})
