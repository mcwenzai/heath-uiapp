export const BASEURL = 'http://pc.api.hedaifu.zhenheyiguan.com'
// 上线地址
// export const BASEURL='https://applets.tcmai.smart.maker-world.cn'
// 体验地址
// export const BASEURL='https://applets.uat.tcmai.maker-world.cn'
// 本地测试地址
// 二次封装uniapp 请求数据方法
export async function  myRequest(options){
	const res = await uni.request({
		...options,
		url:BASEURL +  options.url,
		header:{
			'Authorization':'36e847b865db91fd9f510e8240a23796',
			requestType:2
		},
		timeout:6000
	})
	// console.log(BASEURL +  options.url)
	// console.log(res[1].data)
	if(!res[1]){
		uni.hideLoading()
		return null
	};
	
	if(!res[1].data){
		uni.hideLoading()
		uni.showToast({
			title:'系统错误',
			icon:'none'
		})
		return null
	}
	// console.log(res)
	
	// if(res[1].data.success === 1001 || res[1].data.success ===1002){
	// 	uni.hideLoading()
	// 	uni.removeStorageSync('userInfo')
	// 	uni.removeStorageSync('token')
	// 	uni.clearStorage();
	// 	uni.reLaunch({
	// 		url:'/pages/login/login'
	// 	})
	// 	return
	// }
	return res[1].data
}