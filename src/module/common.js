const URL = 'http://api.ztwulian.com/';
import VueEvent from './VueEvent.js'

const tools = {
	URL,
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
				if(logindata){
					items.data['uid'] = logindata.uid;
					items.data['token'] = logindata.token;
				}
				VueEvent.$http({
					url: URL + items.url,
					body: items.data,
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
