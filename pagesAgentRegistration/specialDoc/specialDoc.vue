<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<agent-registration-head :info='info.specialDoctor'></agent-registration-head>
			<view class="nav-wrap">
				<view class="nav-title app-f app-aic">
					<view class="line"></view> 团队成员
					<view class="go-more app-f1" @tap='goMoreMember'>更多 ></view>
				</view>
				<view class="team-number app-aic app-f ">
					<image :src="item.teamUrl" v-for="(item,index) in info.teamList"
						:key='item.id' @tap="goDocMain(item)"></image>
				</view>
			</view>
			<view class="nav-wrap">
				<view class="nav-title app-f app-aic">
					<view class="line"></view> 全部医案
					<view class="go-more app-f1" @tap='goMoreCase'>更多 ></view>
				</view>
				<view class="case-list app-aic app-f app-jcse">
					<block v-for="(item,index) in info.caseList" :key='index'>
						<agent-registration-case-item :listType="0" :info='item'></agent-registration-case-item>
					</block>
				</view>
			</view>

		</scroll-view>
		<bottom-agent-registration-btn :doctorId='info.specialDoctor.id' :doctorName='info.specialDoctor.doctorName'></bottom-agent-registration-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.params))
			this.getInfo(data.id)
		},
		methods: {
			goMoreMember() {
				const id = this.info.teamList[0].doctorId
				this.$goPage('/pagesAgentRegistration/teamMember/teamMember',{doctorId:id})
			},
			goMoreCase() {
				const id = this.info.caseList[0].doctorId
				this.$goPage('/pagesAgentRegistration/caseList/caseList',{doctorId:id})
			},
			async getInfo(id) {
				const res = await this.$myRequest({
					url: '/special/specialDoctor/specialDoctorDetail',
					data: {
						id
					}
				})

				if (!res || res.success !== 1) return
				this.info = res.data
			},
			goDocMain(obj){
				this.$goPage('/pagesAgentRegistration/docMain/docMain',obj)
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
				margin-right: 25rpx;
			}

			.case-list {}
		}


	}
</style>
