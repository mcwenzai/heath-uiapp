<template>
	<view class="grant">
		<!-- 公共头部 -->
		<wz-navbar :filterData="filterData" :isReject="isReject" :deptId="deptId" @onSelected="onSelected"></wz-navbar>
		<!-- 主体内容 -->
		<view class="container">
			<view class="fixed">
				<u-tabs ref="uTabs" :list="tabList" @change="tabsChange" :current="current" :is-scroll="false"
					swiperWidth="750" active-color="#FF7345"></u-tabs>
			</view>
			<view class="line" v-if="current==0">
				<view v-if="dIsData">
					<wz-checkbox ref="wz-checkbox" :list="acceptingList" :optional="optional"
						@passOrReject="passOrReject(arguments)"></wz-checkbox>
				</view>
				<view class="no-data column flex-center-center" v-else>
					<image src="/static/images/index/search.png"></image>
					<text>暂无商品</text>
				</view>
			</view>
			<view class="line" v-if="current==1">
				<view v-if="yIsData">
					<wz-checkline ref="wz-checkbox" :list="passList" :optional="optional"
						@passOrReject="passOrReject(arguments)"></wz-checkline>
				</view>
				<view class="no-data column flex-center-center" v-else>
					<image src="/static/images/index/search.png"></image>
					<text>暂无商品</text>
				</view>
			</view>
		</view>
		<wz-loading v-if="showPageLoading" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				value1: 1,
				value2: 2,
				tabList: [{
					name: '待授权'
				}, {
					name: '已授权'
				}],
				current: 0,
				tabs: [{}],
				filterData: [],
				acceptingList: [],
				optional: false,
				passList: [],
				showPageLoading: true,
				deptId: '',
				divisionData: {},
				dIsData: true,
				yIsData: false,
				isReject: true
			};
		},
		onLoad(e) {
			this.getDepartmentList()
			if (e.isReject) {
				this.isReject = true
			}
		},
		methods: {
			// 事业部下拉数据
			getDepartmentList() {
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getDepartmentList?roleType=0",
				}).then((res) => {
					if (res.success == 1) {
						var divisionData
						var deptId = app.globalData.deptId
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].deptId == deptId) {
								divisionData = res.data[i]
							}
						}
						this.deptId = deptId
						this.divisionData = divisionData
						this.filterData = res.data
						this.salesmanData = res.data
						this.getGoodsAuthorizeList()
					} else {
						this.$refs.uToast.show({
							title: res.msg,
							type: 'error'
						})
					}
				})
			},
			// tabs事件
			tabsChange(index) {
				this.getGoodsAuthorizeList()
				if (index == 0 && this.acceptingList.length) {
					this.optional = true
					this.dIsData = true
				} else if (index == 1 && this.passList.length) {
					this.yIsData = true
				} else {
					this.optional = false
					this.dIsData = false
					this.yIsData = false
				}
				this.current = index;
			},
			// 获取列表数据
			getGoodsAuthorizeList() {
				let argu = {
					deptId: this.divisionData.deptId,
					employeeId: this.divisionData.id
				}
				this.$myRequest({
					method: "GET",
					url: "/oa/oaEmployee/getGoodsAuthorizeList",
					data: argu
				}).then((res) => {
					this.showPageLoading = false
					if (res.success == 1) {
						if (res.data.goodsAuthorizeAccepting.length) {
							this.optional = true
							this.dIsData = true
							this.acceptingList = res.data.goodsAuthorizeAccepting
						} else {
							this.optional = false
							this.dIsData = false
							this.acceptingList = []
						}
						if (res.data.goodsAuthorizePass.length) {
							this.yIsData = true
							this.passList = res.data.goodsAuthorizePass
						} else {
							this.yIsData = false
							this.passList = []
						}
					} else {
						this.dIsData = false
						this.yIsData = false
						this.$refs.uToast.show({
							title: res.msg,
							icon: "error"
						});
					}
				})
			},
			onSelected(e) {
				Object.assign(this.$data, this.$options.data());
				this.getDepartmentList();
			},

			// 通过或拒绝授权
			passOrReject(val) {
				var selectAuthGoods = val[0]
				var passOrReject = val[1]
				if (passOrReject) {
					if (selectAuthGoods.length < 1) {
						this.$refs.uToast.show({
							title: '请选择授权商品',
							type: 'error',
						});
						return false
					}
					this.$myRequest({
						method: "POST",
						url: "/goods/goods/employeeAuthorize",
						data: {
							authorizeId: selectAuthGoods,
							state: 1
						}
					}).then((res) => {
						if (res.success == 1) {
							this.getGoodsAuthorizeList()
							this.$refs.uToast.show({
								title: res.msg,
								type: 'success'
							});
						} else {
							this.$refs.uToast.show({
								title: res.msg,
								type: 'error'
							});
						}
					})
				} else if (!passOrReject) {
					if (selectAuthGoods.length < 1) {
						this.$refs.uToast.show({
							title: '请选择授权商品',
							type: 'error',
							duration: '1500'
						});
						return false
					}
					app.globalData.selectArray = selectAuthGoods
					uni.navigateTo({
						url: '../../pages/salesman/rejectRemarks'
					})
				} else {
					this.$refs.uToast.show({
						title: '系统错误',
						type: 'error'
					});
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	page {
		background-color: #F2F2F2;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.no-data {
		background-color: #ffffff;
		height: 800upx;
	}

	.grant {
		.container {
			margin-top: 48upx;

			.fixed {
				position: fixed;
				top: 162upx;
				left: 0;
				right: 0;
				width: 100%;
				z-index: 1;
				border-bottom: 1upx solid #f2f2f2;
			}
			.item-wrap {
				margin-bottom: 80upx;

				.uni-list-cell {
					background-color: #f2f2f2;

					.cell {
						margin: 20upx 32upx;
						display: flex;
						justify-content: space-between;
						position: relative;
						.card {
							background-color: #ffffff;
							padding: 20upx 40upx;
							border-radius: 16upx;
							position: relative;

							&-top {
								display: flex;
								justify-content: space-between;

								.left {
									font-size: 34upx;
								}

								.right {
									font-size: 30upx;
								}
							}

							.li {
								font-size: 30upx;
							}

							.desc {
								font-size: 34upx;
							}
						}
					}
				}
			}

			/* 底部 */
			.bottom {
				display: flex;
				flex-direction: row;
				position: fixed;
				bottom: 0;
				top: auto;
				left: 0px;
				width: 100%;
				background-color: #fff;
				justify-content: space-between;
				padding: 20upx 30upx;
				border-top: 1upx solid #f9f9f9;
				height: 100upx;

				.right {

					.refuse {
						width: 160upx;
						height: 60upx;
						border: #ff7247 solid 1upx;
						border-radius: 60upx;
					}

					.adopt {
						width: 160upx;
						height: 60upx;
						background-color: #ff7247;
						border-radius: 60upx;
						color: white;
						font-size: 30upx;
						line-height: 60upx;
						text-align: center;
						margin: 0 20upx;
					}
				}
			}
		}
	}

	.u-tab-item {
		height: 86upx;
		line-height: 86upx;
	}
</style>
