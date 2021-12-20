<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<agent-registration-head :showBtn="false" :info='info.specialDoctor '></agent-registration-head>
			<view class="nav-wrap" v-if="info.teamList.length">
				<view class="nav-title app-f app-aic">
					<view class="line"></view>
					团队成员
					<view class="go-more app-f1" @tap='goMoreMember'>全部成员 ></view>
				</view>
				<view class="team-number app-aic app-f ">
					<block v-for="(img,index) in info.teamList" :key='index'>
						<image :src="img.teamUrl" @tap="goDocMain(img)"></image>
					</block>
				</view>
			</view>
			<view class="nav-wrap">
				<view class="nav-title app-f app-aic">
					<view class="line"></view> 医案
					<view class="go-more app-f1" @tap="goCaseList">全部医案 ></view>
				</view>
				<view class="case-list app-aic app-f app-jcse">
					<block>
						<block v-for="(item,index) in info.caseList" :key='index'>
							<agent-registration-case-item :listType="1" :info='item'></agent-registration-case-item>
						</block>
					</block>

				</view>
			</view>
			<view class="nav-wrap">
				<view class="nav-title app-f app-aic">
					<view class="line"></view> 历史到店
					<view class="go-more app-f1" @tap="goHis">全部历史 ></view>
				</view>
				<view class="case-list his-coming app-aic app-f app-jcse">
					<block>
						<view class="case-item">
							<image :src="info.storeDetail.historyPhotoUrl"></image>
						</view>
					</block>

				</view>
			</view>
			<!-- <view class="nav-wrap">
				<view class="nav-title app-f app-aic">
					<view class="line"></view> 其他信息
					
				</view>
				<view class="case-list app-aic app-f app-jcse">
					<view class="other-info">
						J可垃圾啊发生了即使考虑到发上飞机离开睡觉了咖啡飒飒立刻就是否艾弗森了解方式就是对方费时费力即使对方设计方案放声大哭凯撒JFK的是否可见当时房价开始的时间分开发立刻就是否大量放得开啥的反垃圾方法是是非法数据阿飞萨芬点击发送的
					</view>
				</view>
			</view> -->
		</scroll-view>
		<bottom-special-coming-btn :doctorId='info.specialDoctor.id' :doctorName='info.specialDoctor.doctorName'>
		</bottom-special-coming-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				doctorId: null
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.params))
			this.doctorId = data.doctorId
			this.getInfo(data.doctorId)
		},
		methods: {
			goCaseList() {
				this.$goPage('/pagesSpecialComing/caseList/caseList', {
					doctorId: this.doctorId
				})
			},
			goMoreMember() {
				this.$goPage('/pagesSpecialComing/memberList/memberList', {
					doctorId: this.doctorId
				})
			},
			goDocMain(obj){
				// console.log(obj)
				this.$goPage('/pagesSpecialComing/docDetail/docDetail',{doctorId:obj.doctorId})
			},
			async getInfo(id) {
				const res = await this.$myRequest({
					url: '/special/specialDoctor/specialStoreDoctorDetail',
					data: {
						id: id
					}
				})
				if (!res || res.success !== 1) return
				this.info = res.data
			},
			goHis(){
				this.$goPage('/pagesSpecialComing/hisComing/hisComing',{
					doctorId: this.doctorId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {


		padding-bottom: 140rpx;

		.nav-wrap {
			margin: 40rpx 30rpx 0;

			.nav-title {

				font-size: 40rpx;

				font-weight: 500;

				color: #333333;

				.line {
					width: 6rpx;
					height: 26rpx;

					background: #ffa44b;
					border-radius: 3rpx;
					margin-right: 20rpx;
					margin-top: 10rpx;
				}

				.go-more {
					font-size: 35rpx;
					color: #777;
					text-align: right;
				}
			}

			.team-number image {
				width: 124rpx;
				height: 124rpx;
				margin-top: 30rpx;
				border-radius: 10rpx;
				background-color: #000;
				margin-right: 20rpx;
			}

			.case-list {
				.other-info {
					margin-top: 30rpx;
					line-height: 50rpx;
				}

				&.his-coming {

					.case-item {
						margin-top: 30rpx;
						width: 690rpx;
						height: 330rpx;
						border-radius: 20rpx;
						position: relative;
						background-color: #aaa;
						border: 1rpx solid #f1f1f1;
						overflow: hidden;
						image {
							width: 100%;
							height: 100%;
						}
					}

				}
			}
		}




	}
</style>
