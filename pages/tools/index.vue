<template>
	<view class="page-wrap">
		<scroll-view scroll-y="true" class="container">
			<template v-if="navArr.length">
				<block v-for="(nav, index) in navArr" :key="nav.title">
					<view class="nav-wrap">
						<view class="nav-title">{{ nav.title }}</view>
						<view class="nav app-f app-f-fww">
							<block
								v-for="(item, idx) in nav.navs"
								:key="item.id"
							>
								<tool-nav-item
									@clickItem="clickNav"
									:paIdx="index"
									:navData="item"
									:navIndex="idx"
									:navTotal="nav.navs.length"
								></tool-nav-item>
							</block>
						</view>
					</view>
				</block>
			</template>
			<template v-if="courseList.length">
				<block v-for="(nav, index) in courseList" :key="nav.title">
					<view class="nav-wrap">
						<view class="nav-title">{{ nav.title }}</view>
						<view class="nav app-f app-f-fww">
							<block
								v-for="(item, idx) in nav.navs"
								:key="item.id"
							>
								<tool-nav-item
									@clickItem="goCourse"
									:paIdx="index"
									:navData="item"
									:navIndex="idx"
									:navTotal="nav.navs.length"
								></tool-nav-item>
							</block>
						</view>
					</view>
				</block>
			</template>
		</scroll-view>
	</view>
</template>

<script>
import toolList from "@/libs/toolNavs";
import { isLogin } from "@/libs/isLogin";
import goWXAppletsMixin from "@/mixins/goWXApplets";
export default {
	mixins: [goWXAppletsMixin],
	data() {
		return {
			navArr: toolList,
			tipText: "",
			showTip: false,
			courseList: [],
			courseInfo: {},
			isWeChat:true
		};
	},
	onLoad() {
		isLogin().then((v) => {});
		// #ifdef APP-PLUS
		uni.getSystemInfo({
			success: function (res) {
				const p = res.platform;
				// 判断是否IOS并且是否安装微信，否则隐藏微信第三方登录
				if(p !== "android" && !plus.runtime.isApplicationExist({
					pname: "com.tencent.mm",
					action: "weixin://",
				})){
					this.isWeChat = false
				}
			}.bind(this),
		});
		// #endif
	},
	onTabItemTap(info) {
		this.getNewList();
		this.initCouseList();
		this.getCourseList();
	},
	methods: {
		clickNav(options) {
			const { paIdx, idx, nav } = options;
			let list = JSON.parse(JSON.stringify(this.navArr));
			const his = uni.getStorageSync("toolNavs");
			if (his) {
				list = his;
			}
			const py = nav.id;
			const findIndex = list[paIdx].navs.findIndex(
				(item) => item.id === py
			);
			list[paIdx].navs[findIndex].clickNum += 1;
			const e = nav.clickEvent;
			const path = nav.page;
			uni.setStorageSync("toolNavs", list);
			this.$toolRequest({
				url: "/tool/toolType/updateBrowse",
				data: {
					pinyin: py,
				},
			});
			if (path) {
				if (py === "aizn") {
					this.goWXApplets("/pages/home/home");
				} else {
					this.$goPage(path, nav);
				}
			}
		},
		async getNewList() {
			let list = uni.getStorageSync("toolNavs");
			if (list) {
				list.forEach((item) => {
					const arr = item.navs.sort(
						(a, b) => b.clickNum - a.clickNum
					);
					item.navs = arr;
				});
			} else {
				list = toolList;
			}

			list.forEach((item1) => {
				item1.navs.forEach((item2) => {
					item2.isNew = false;
					item2.isHot = false;
				});
			});

			const res = await this.$toolRequest({
				url: "/tool/toolType/getState",
			});

			if (!res || res.success !== 1) {
				this.navArr = list;

				return;
			}
			let { hotsList, newsList } = res.data;
			if (hotsList && hotsList.length) {
				list.forEach((item) => {
					item.navs.forEach((item1) => {
						const a = hotsList.find(
							(item2) => item2.pinyin === item1.id
						);
						if (a) {
							item1.isHot = true;
						}
					});
				});
			}

			if (newsList && newsList.length) {
				list.forEach((item) => {
					item.navs.forEach((item1) => {
						const a = newsList.find(
							(item2) => item2.pinyin === item1.id
						);
						if (a) item1.isNew = true;
					});
				});
			}
			this.navArr = list;
			if(!this.isWeChat){
				for(let i in this.navArr[0].navs){
					if(this.navArr[0].navs[i].id=='aizn'){
						this.navArr[0].navs.splice(0,1)
					}
				}

			}
			console.log(this.navArr);
		},
		async getCourseList() {
			const res = await this.$myRequest({
				url: "/system/sysConfig/toolCourseStreaming",
			});

			if (res.success === 0) return;
			const info = res.data || {};
			// this.courseList[0].navs[1].page = info.courseUrl || "";

			if (this.courseList[0].navs[1]) {
				this.courseList[0].navs[1].page = info.streamingUrl || "";
			}

			this.courseInfo = info;
		},
		goCourse(info) {
			const { paIdx, idx, nav } = info;
			const path = nav.page;
			if (idx === 0) {
				this.$goPage(path, { imgUrl: this.courseInfo.imgUrl || "" });
				return;
			}
			this.$goPage("/pages/h5Html/h5Html", {
				pageUrl: path,
			});
		},
		initCouseList() {
			this.courseList = [
				{
					title: "课程",
					navs: [],
				},
			];
			const mfkc = {
				title1: "免费课程",
				title2: "",
				imgUrl: "/static/images/tool/mfkc.png",
				createTime: null,
				isHot: false,
				clickNum: 0,
				isNew: false,
				disabled: false,
				id: "mfkc",
				page: "/pagesTool/course/index",
				clickEvent: "",
			};
			// {
			// 	title1: "医学社课程",
			// 	title2: "",
			// 	imgUrl: "/static/images/tool/yxskc.png",
			// 	createTime: null,
			// 	isHot: false,
			// 	clickNum: 0,
			// 	isNew: false,
			// 	disabled: false,
			// 	id: "yxskc",
			// 	page: "",
			// 	clickEvent: "",
			// },
			this.courseList[0].navs.push(mfkc);
			const sysInfo = uni.getSystemInfoSync();
			if (sysInfo.platform == "android") {
				this.courseList[0].navs.push({
					title1: "直播",
					title2: "",
					imgUrl: "/static/images/tool/zbkc.png",
					createTime: null,
					isHot: false,
					clickNum: 0,
					isNew: false,
					disabled: false,
					id: "zbkc",
					page: "",
					clickEvent: "",
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f7f6f6;
	padding: 0 20rpx;
	height: 100vh;
	.nav-wrap {
		margin-top: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}

	.nav-title {
		height: 90rpx;
		line-height: 90rpx;
		padding-left: 40rpx;
		font-size: 30rpx;
		border-bottom: 1rpx solid #ebebeb;
		color: #666;
	}
	.nav {
		padding-bottom: 30rpx;
	}
}
</style>
