<template>
	<view class="container">
		<view class="main">
			<view class="header"> 机构必填资质信息 </view>
			<view class="center">
				<view
					class="menus_list"
					:class="[index == 4 ? 'noborder' : '']"
					v-for="(item, index) in photoList"
					@click="goPages(item)"
					:key="index"
				>
					<view class="label">
						<text class="star">*</text>
						<view class="title" style="width: 350rpx">
							<view class="text">
								{{ item.label }}
							</view>
							<view class="sub_text">
								{{ item.subText }}
							</view>
						</view>
					</view>
					<view class="content">
						<text
							class="stateLabel"
							v-if="item.state === null && item.url !== null"
							>已上传</text
						>
						<text
							class="stateLabel successState"
							v-if="item.state == 1"
							>{{ item.state | stateType }}</text
						>
						<text
							class="stateLabel"
							style="color: #ff7247"
							v-if="!item.state && !item.url"
							>未上传</text
						>
						<text
							class="stateLabel dangeState"
							v-if="
								item.url &&
								item.state == 0 ||
								item.state == 2 ||
								item.state == 3 ||
								item.state == 4
							"
							>{{ item.state | stateType }}</text
						>
						<image
							class="arrow_left"
							src="../../static/images/arrow_left.png"
							mode=""
						></image>
					</view>
				</view>
			</view>
			<view class="footer">
				<view
					class="lastBtn"
					style="margin-left: 20rpx"
					@click="goBack()"
				>
					上一步
				</view>
				<view
					class="submit"
					:style="{ opacity: !subState ? '0.8' : '1' }"
					@click="quaUpdate"
				>
					{{ btnTitle }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { goPage } from "@/libs/tool";
import { fnThrottle } from "@/libs/tool";
export default {
	data() {
		return {
			photoList: [
				{
					label: "医疗机构执业许可证复印件",
					subText: "（盖红章）",
					state: "",
					id: 0,
					url: "",
				},
				{
					label: "采购人身份证复印件",
					subText: "（盖红章）",
					state: "",
					id: 1,
					url: "",
				},
				{
					label: "采购委托书复印件",
					subText: "（盖红章）",
					state: "",
					id: 2,
					url: "",
				},
			],
			quaInfo: {},
			subState: true,
			btnTitle: "提交审核",
		};
	},
	created() {
		this.quaUpdate = fnThrottle(this.quaUpdate, 500);
	},
	filters: {
		stateType(value) {
			switch (value) {
				case 0:
					return "待审核";
					break;
				case 1:
					return "审核通过";
					break;
				case 2:
					return "审核未通过";
					break;
				case 3:
					return "即将过期";
					break;
				case 4:
					return "已过期";
					break;
				case 5:
					return "未上传";
					break;
			}
		},
	},
	onShow() {
		this.quaInfo = uni.getStorageSync("quaInfo");
		const customerId = uni.getStorageSync("customerId");
		// 提交案件状态转译
		if (
			this.quaInfo.qualificationStatus !== null &&
			this.quaInfo.checkStatus !== null
		) {
			this.btnTitle = "完成";
			this.subState = true;
		} else if (
			this.quaInfo.buyerEntrustStatus === 1 &&
			this.quaInfo.medicalPermitStatus === 1 &&
			this.quaInfo.buyerCardStatus === 1
		) {
			this.btnTitle = "完成";
			this.subState = true;
		} else if (this.quaInfo.qualificationStatus === null) {
			this.btnTitle = "提交审核";
			this.subState = false;
		} else if (this.quaInfo.checkStatus === null) {
			this.btnTitle = "重新提交审核";
			this.subState = true;
		}

		// 照片状态转译
		for (let i in this.photoList) {
			if (!this.photoList[i].state && !this.photoList[i].url) {
				this.subState = false;
			}
			switch (this.photoList[i].id) {
				case 0:
					this.photoList[0].state = this.quaInfo.medicalPermitStatus;
					this.photoList[0].url = this.quaInfo.medicalPermit;
					break;
				case 1:
					this.photoList[1].state = this.quaInfo.buyerCardStatus;
					this.photoList[1].url = this.quaInfo.buyerCard;
					break;
				case 2:
					this.photoList[2].state = this.quaInfo.buyerEntrustStatus;
					this.photoList[2].url = this.quaInfo.buyerEntrust;
					break;
			}
			if (this.photoList[i].url !== null) {
				this.subState = true;
			}
			if (
				this.photoList[i].state === 2 ||
				this.photoList[i].state === 4
			) {
				this.btnTitle = "重新提交审核";
				this.subState = false;
			}
		}
		if (customerId) {
			if (!this.quaInfo.id) {
				this.btnTitle = "提交审核";
				this.subState = false;
			}
			if (
				this.quaInfo.medicalPermit &&
				this.quaInfo.buyerCard &&
				this.quaInfo.buyerEntrust
			) {
				this.subState = true;
			}
		}
	},
	onBackPress(e) {
		uni.redirectTo({
			url: "/userPages/certification/index",
		});
		// 此处一定姚要return为true，否则页面不会返回到指定路径
		return true;
	},
	methods: {
		goBack() {
			goPage("/userPages/certification/index");
		},
		goPages(params) {
			if (params.id == 1) {
				goPage(
					"/userPages/certification/identityPhoto?title=" +
						params.label
				);
			} else {
				goPage(
					"/userPages/certification/practPhoto?title=" +
						params.label +
						"&id=" +
						params.id
				);
			}
		},
		// 资质信息更新
		quaUpdate() {
			let customerId = uni.getStorageSync("customerId");
			if (this.btnTitle == "完成")
				return !customerId
					? uni.switchTab({ url: "/pages/admin/index" })
					: uni.navigateTo({ url: `/pages/salesman/replace` });
			if (!this.subState)
				return uni.showToast({ title: "请先上传资料", icon: "none" });
			this.quaInfo = uni.getStorageSync("quaInfo");
			const url = "/user/appQualification/save";
			if (customerId) {
				this.quaInfo.customerId = customerId;
			}
			this.$myRequest({
				method: "POST",
				url: url,
				data: this.quaInfo,
			}).then((res) => {
				// 资质更新成功
				if (res.success == 1) {
					uni.showToast({
						title: "提交审核成功",
					});
					let timer = setTimeout(
						function () {
							if (customerId) {
								uni.navigateTo({
									url: `/pages/salesman/replace`,
								});
							} else {
								uni.switchTab({
									url: "/pages/admin/index",
								});
							}
						}.bind(this),
						500
					);
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			});
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #f7f6f6;
}
.main {
	width: 690rpx;
	margin: 0 auto;
	.header {
		height: 104rpx;
		font-size: 30rpx;
		text-align: left;
		color: #666666;
		line-height: 104rpx;
	}
	.center {
		width: 690rpx;
		background: #ffffff;
		border-radius: 10rpx;
		.menus_list {
			width: 650rpx;
			height: 146rpx;
			margin: 0 auto;
			border-bottom: 2rpx solid #ebebeb;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.label {
				font-size: 32rpx;
				text-align: left;
				color: #333333;
				display: flex;
				.star {
					color: #ff5f3a;
					font-size: 26rpx;
					margin-right: 8rpx;
					padding-top: 10rpx;
				}
				.sub_text {
					font-size: 24rpx;
					text-align: left;
					color: #c1a86d;
				}
			}
			.content {
				font-size: 34rpx;
				text-align: left;
				color: #999999;
				word-wrap: break-word;
				.arrow_left {
					height: 27rpx;
					width: 27rpx;
					margin-left: 21rpx;
					position: relative;
					top: 2rpx;
				}
				.stateLabel {
					display: inline-block;
					height: 54rpx;
					line-height: 54rpx;
				}
			}
			.menus_list:last-child {
				border-bottom: none;
			}
		}
	}
	.footer {
		width: 690rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 86rpx;
		view {
			height: 100rpx;
			width: 310rpx;
			background-color: #ff7247;
			border-radius: 70rpx;
			font-size: 34rpx;
			font-weight: 700;
			text-align: center;
			line-height: 100rpx;
			color: #ffffff;
			letter-spacing: 4rpx;
		}
	}
}
.noborder {
	border: none !important;
}
.dangeState {
	font-size: 30rpx;
	border-radius: 10rpx;
	color: #ff7247;
	background: rgba(255, 114, 71, 0.2);
	padding: 0 20rpx;
}
.successState {
	font-size: 30rpx;
	border-radius: 10rpx;
	color: #53ae41;
	background: rgba(83, 174, 65, 0.22);
	padding: 0 20rpx;
}
.submit {
	margin-right: 20rpx;
}
</style>
