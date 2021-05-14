'use strict'
import Vue from 'vue'
//import myMath from 'mathjs'
import dateFormat from 'dateformat';
const myMath = require('mathjs');

Vue.filter('toCurrency', function (value) {
	if (typeof value !== 'number') {
		return value
	}
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	})
	return formatter.format(value)
})

Vue.filter('toExponentialFree', function (value) {
	let val = value
	if (typeof value !== 'number') {
		val = myMath.number(val)
	}
	function formatLimitless (n) {
		// console.log(' to e', n)
		return myMath.format(n, {notation: 'fixed'})
	}
	// console.log(' to e', value)
	return formatLimitless(val)
})
Vue.filter('toFixDecimal', function (value) {
	let val = value
	if (typeof value !== 'number') {
		val = myMath.number(val)
	}
	function formatLimitless (n) {
		// console.log(' to e', n)
		return myMath.format(n, {precision: 6})
	}
	// console.log(' to e', value)
	return formatLimitless(val)
})

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()
	// console.log(' to e', value)
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('minimize', function (value) {
	if (!value) return ''
	value = value.toString()
	// value.slice(0,35)
	return   ' ...'
})

Vue.filter('toMysqlFormat', function (value) {
	if (!value) return ''
	let rtn =  value.toString().replace(/\.|T|.[^.]*$/g,' ').trim();
	// value.slice(0,35)
	return   rtn
})
Vue.filter('toLocalTime', function (value) {
	if (!value) return ''
	let rtn =  dateFormat( new Date(value),"yyyy-mm-dd HH:MM:ss")
	// value.slice(0,35)
	return   rtn
})
Vue.filter('toShortTime', function (value) {
	if (!value) return ''
	let rtn =  dateFormat( new Date(value),"yyyy-mm-dd HH:MM")
	// value.slice(0,35)
	return   rtn
})


Vue.filter('toUtcTime', function (value) {
	if (!value) return ''
	let rtn =  new Date(value).toISOString().replace(/\.|T|.[^.]*$/g,' ').trim()
	return   rtn
})


// filters.js
// export default {
// 	toExponentialFree: () => {},
// 	capitalize: () => {}
// }
