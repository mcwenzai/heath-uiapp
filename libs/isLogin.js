export function isLogin() {
	return new Promise((resolve) => {
		let userInfo = uni.getStorageSync("userInfo");
		if (!userInfo.isLogin) {
			uni.hideLoading();
			uni.clearStorageSync();
			uni.getSystemInfo({
				success: function (res) {
					let appType = res.platform;
					if (appType == "android") {
						//    console.log('安卓');
					} else {
						uni.setStorageSync("argeeState", 1);
					}
				}.bind(this),
			});
			uni.reLaunch({
				url: "/pages/login/login",
			});
			uni.showToast({
				title: "请登录后继续使用",
				icon: "none",
			});
		}
		resolve(userInfo.isLogin);
	});
}
