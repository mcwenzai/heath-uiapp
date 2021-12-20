<template>
	<view class="content container">
		<web-view
			:src="serviceURL"
			@message="message"
			@onPostMessage="onPostMessage"
		></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			// serviceURL: `https://hedaifu.sobot.com/chat/h5/v2/index.html?sysnum=7746e208516645f5969033caca2c82a8&source=2&agentid=08fded08b3be4a809a55b4f5dd292f31&groupid=5df9502df9e048b3a16d182002999e10`,
			serviceURL: `https://hedaifu.sobot.com/chat/h5/v2/index.html?sysnum=7746e208516645f5969033caca2c82a8&source=2&agentid=08fded08b3be4a809a55b4f5dd292f31&groupid=5df9502df9e048b3a16d182002999e10&msg_flag=0&leave_msg_flag=1&type=4`,
		};
	},
	onLoad(options) {
		this.userInfo = uni.getStorageSync("userInfo");
		const salesInfo = uni.getStorageSync("divisionData");
		let uname = `【客户】${this.userInfo.name}`;
		let partnerid = this.userInfo.id;
		let tel = this.userInfo.phone || "";
		let face = this.userInfo.avatar || "";
		if (salesInfo) {
			uname = `【合伙人】${salesInfo.name}`;
			partnerid = salesInfo.id;
			tel = salesInfo.phone || "";
			face = salesInfo.avatar || "";
		}
		const url = `${this.serviceURL}&partnerid=${partnerid}&uname=${uname}&realname=${uname}&tel=${tel}&face=${face}`;
		this.serviceURL = url;
		uni.setNavigationBarTitle({
			title: "在线客服",
		});
	},
	methods: {
		message(e) {
			// console.log("message", e);
		},
		onPostMessage(e) {
			// console.log("onPostMessage", e);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
}
</style>
