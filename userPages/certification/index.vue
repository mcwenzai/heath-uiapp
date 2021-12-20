<template>
	<view class="container">
		<view class="main">
			<view class="header">
				<view class="header_title">基本信息</view>
				<view class="header_menus">
					<view
						class="menus_list"
						v-for="(item, index) in baseInfo.slice(2, 4)"
						:key="index"
						@click="itemClick(item)"
					>
						<view class="label">
							<text class="star">*</text>
							<view class="title">
								<view class="text">
									{{ item.label }}
								</view>
								<view class="sub_text">
									{{ item.sub_text }}
								</view>
							</view>
						</view>
						<view class="content">
							<text>{{ item.value }}</text>
						</view>
					</view>
					<!-- 详细地址 -->
					<view class="menus_list" style="border: none">
						<view class="label">
							<text class="star">*</text>
							<view class="title">
								<view class="text"> {{ baseInfo[4].label }} </view>
								<view class="sub_text">
									{{ baseInfo[4].sub_text }}
								</view>
							</view>
						</view>
						<view class="content">
							<input
								@blur="checkout"
								maxlength="50"
								:placeholder-style="placeholderStyle"
								class="inputStyle"
								type="text"
								v-model="baseInfo[4].value"
								placeholder="乡镇、街道、楼牌号等"
							/>
							<image
								class="arrow_left"
								style="width: 34rpx; height: 34rpx"
								src="../../static/images/edit.png"
								mode=""
							></image>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="footer_title"> 联系人信息 </view>
				<view class="footer_menus">
					<view
						class="menus_list"
						v-for="(items, indexs) in baseInfo.slice(0, 2)"
						:key='indexs'
					>
						<view class="label">
							<text class="star">*</text>
							<view class="title">
								<view class="text">
									{{ items.label }}
								</view>
								<view class="sub_text">
									{{ items.sub_text }}
								</view>
							</view>
						</view>
						<view class="content">
							<view>
								<input
									@blur="checkout"
									maxlength="5"
									v-if="items.id == 0"
									:placeholder-style="placeholderStyle"
									class="inputStyle"
									type="text"
									v-model="items.value"
									placeholder="请输入姓名"
								/>
								<input
									@blur="checkout"
									maxlength="11"
									v-if="items.id == 1"
									:placeholder-style="placeholderStyle"
									class="inputStyle"
									type="number"
									v-model="items.value"
									placeholder="请输入手机号"
								/>
							</view>
							<image
								class="arrow_left"
								style="width: 34rpx; height: 34rpx"
								src="../../static/images/edit.png"
								mode=""
							></image>
						</view>
					</view>
				</view>
			</view>
			<view
				class="next_btn"
				@click="goPages"
				:style="{ opacity: !state ? '0.8' : '1' }"
			>
				下一步
			</view>
		</view>
		<u-select
			v-model="showSelect"
			@confirm="orgConfirm"
			confirm-color="#ff5f3a"
			:list="orgList"
		></u-select>
		<!-- 提示框 -->
		<u-modal title='提 示' @confirm="saveInfo()" @cancel="showModel=false" :cancel-style='cancelStyle'
					negative-top='160' v-model="showModel" :confirm-style='confirmStyle' :content-style='contentStyle'
					:title-style='titleStyle' :mask-close-able='true' :show-cancel-button='true' confirm-color="#FF7247"
					cancel-color="#999999" :content="content" :width='580'></u-modal>
	</view>
</template>

<script>
import { goPage } from "@/libs/tool";
export default {
	data() {
		return {
			quaInfo: {},
			userInfo: {},
			state: false,
			showSelect: false, //下拉选择框显示隐藏
			addressInfo: [],
			orgList: [
				{value: "1",label: "医疗机构",},
				{value: "2",label: "药房",},
			],
			baseInfo: [
				{ label: "姓名", value: "", sub_text: "", id: 0 },
				{ label: "手机号", value: "", sub_text: "", id: 1 },
				{ label: "机构类型",value: "医疗机构",sub_text: "不可修改",id: 3,},
				{ label: "机构地址", value: "", sub_text: "", id: 4 },
				{ label: "收货地址", value: "", sub_text: "", id: 5 },
			],
			placeholderStyle:"font-size: 32rpx;font-weight: 400;color: #BBBBBB;",
			showModel:false,
			content: '收货地址一旦提交就不可以修改，是否确定继续下一步?',
			titleStyle: {
				fontWeight: 600,
				fontSize: '40rpx'
			},
			contentStyle: {
				fontSize: '32rpx',
				marginTop: '20rpx',
				marginBottom: '80rpx',
				textAlign:'left'
			},
			confirmStyle: {
				borderLeft: '2rpx solid #DCDCDC',
				fontWeight: 600,
				fontSize: '34rpx'
			},
			cancelStyle: {
				borderLeft: '2rpx solid #DCDCDC',
				fontWeight: 600,
				fontSize: '34rpx'
			},
		};
	},
	onBackPress(e){
		const customerId = uni.getStorageSync("customerId");
		if(customerId){
			uni.redirectTo({
				url:'/pages/salesman/replace'
			})
		}else{
			uni.switchTab({
			  url:"/pages/admin/index"
			})
		}
	  // 此处一定姚要return为true，否则页面不会返回到指定路径
	  return true;
	},
	onShow() {
		this.quaInfo = uni.getStorageSync("quaInfo"); //资质信息
		this.userInfo = uni.getStorageSync("userInfo"); //用户信息
		this.addressInfo = uni.getStorageSync("cityInfo"); //地址信息
		this.baseInfo[3].value = this.addressInfo.addressName;
		!this.quaInfo.name ? "" : (this.baseInfo[0].value = this.quaInfo.name);
		this.quaInfo.phone ? (this.baseInfo[1].value = this.quaInfo.phone): (this.baseInfo[1].value = this.userInfo.phone);
		!this.quaInfo.address? (this.baseInfo[4].value = this.userInfo.address): (this.baseInfo[4].value = this.quaInfo.address);
		if (this.baseInfo[0].value && this.baseInfo[1].value && this.baseInfo[4].value) {
			this.state = true;
		}
	},
	methods: {
		checkout() {
			this.baseInfo.forEach((items, indexs) => {
				if (items.value === "" && items.id !== 3) {
					items.sub_text = items.label + "不能为空";
					this.state = false;
				} else if (items.id !== 3) {
					items.sub_text = "";
				}
			});
			let myreg = /^[\u4e00-\u9fa5]+$/
			if(!myreg.test(this.baseInfo[0].value) && this.baseInfo[0].value){
				this.baseInfo[0].sub_text = '请输入汉字'
				this.state = false;
			}
			if (this.baseInfo[0].value && myreg.test(this.baseInfo[0].value) && this.baseInfo[1].value &&this.baseInfo[4].value) {
				this.state = true;
			}
		},
		goPages() {
			if (!this.state) return;
			this.showModel = true
		},
		saveInfo(){
			this.quaInfo.address = this.baseInfo[4].value;
			this.quaInfo.name = this.baseInfo[0].value;
			this.quaInfo.phone = this.baseInfo[1].value;
			this.quaInfo.organType = 0;
			uni.setStorageSync("quaInfo", this.quaInfo);
			let url = "/userPages/certification/photoUpload?use rId=" + this.userInfo.id;
			goPage(url);
		},
		/**
		 * 点击显示下拉选择框
		 */
		itemClick(param) {
			// if(param.id===3){
			// 	this.showSelect = true
			// }
		},
		/**
		 * 机构选择
		 */
		orgConfirm(e) {
			this.baseInfo[2].value = e[0].label;
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
	height: 1019rpx;
	margin: 0 auto;
}
.header {
	.header_title {
		height: 104rpx;
		font-size: 30rpx;
		line-height: 104rpx;
	}
	.header_menus {
		height: 441rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
	}
}
.footer {
	.footer_title {
		height: 104rpx;
		font-size: 30rpx;
		line-height: 104rpx;
	}
	.footer_menus {
		height: 294rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
	}
}
.next_btn {
	width: 659rpx;
	height: 115rpx;
	background: #ff7247;
	border-radius: 70rpx;
	margin: 0 auto;
	margin-top: 79rpx;
	box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(255, 133, 97, 0.24);
	font-size: 34rpx;
	font-weight: 700;
	color: #ffffff;
	text-align: center;
	line-height: 115rpx;
	letter-spacing: 4rpx;
}
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
		font-weight: 700;
		text-align: left;
		color: #333333;
		word-wrap: break-word;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow-y: hidden;
		.arrow_left {
			height: 27rpx;
			width: 27rpx;
			margin-left: 21rpx;
		}
	}
}
.menus_list:last-child {
	border-bottom: none;
}
.inputStyle {
	width: 400rpx;
	font-size: 34rpx;
	font-weight: 700;
	color: #333333;
	text-align: right;
}
</style>
