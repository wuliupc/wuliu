const URL = 'http://wuliu.aishangts.com/';
import VueEvent from './VueEvent.js'

const tools = {
	S: {
		set(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		get(key) {
			return JSON.parse(localStorage.getItem(key));
		},
		remove(key) {
			localStorage.removeItem(key);
		}
	},
	R: {
		post: (items) => { //POST请求
			let logindata = tools.S.get('logindata');
			return new Promise((resolve, reject) => {
				if (items == undefined) return console.log('缺少url,data参数  ');
				if (typeof items == 'string') items = {
					url: items
				}
				if (!items.url) return console.log('缺少url参数.', items);
				if (!items.data) items.data = {};
				VueEvent.$http({
					url: URL + items.url,
					body: items.data,
					headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
					emulateJSON:true,
					method: 'POST'
				}).then(res => {
					resolve(res);
				}, err => {
					reject(err)
				})
			})

		}
	}
}


export default tools;
