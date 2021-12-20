<template>
	<view class="select-wrap">
		<picker mode='multiSelector' @change="selectChange" :value="selectData" @columnchange='changeColumn'
			:range="showRegionData" range-key="name">
			<view class="uni-input app-f app-f-aic">
				<view class="select-text app-f-f1" :style="textStyle">
					{{positionText}}
				</view>
				<view class="app-f app-f-aic app-f-jcc">
					<slot></slot>
				</view>
			</view>
		</picker>
	</view>
	</view>
</template>

<script>
	export default {
		name: "my-location-select",
		props: {
			areaCode: {
				default: "",
				type: String
			}
		},

		data() {
			return {
				showPicker: false,
				locationData: [],
				selectData: [],
				showRegionData: [],
			};
		},

		created() {

			this.getLocationData()
		},

		watch: {
			areaCode(v) {
				if (!v) return
				this.getInitAreaCode(v)
			}
		},
		computed: {
			positionText() {
				const data = this.selectData
				if (!data || !data.length) return '请选择区域'

				const ary = this.showRegionData
				const p = ary[0][data[0]].name,
					c = ary[1][data[1]].name,
					a = ary[2][data[2]].name
				return `${p}/${c}/${a}`


			},
			textStyle() {
				const data = this.selectData
				if (!data || !data.length) return 'color:#666'
				return 'color:#333'
			}
		},
		methods: {
			async getLocationData() {
				const res = await this.$myRequest({
					url: '/system/city/list'
				})
				if (res.success !== 1) return
				uni.setStorageSync('regionData', res.data)
				this.locationData = res.data
				this.getProvinceData()
			},
			getProvinceData() {
				const data = this.locationData


				const reg = /0000$/
				const list = data.filter(item => reg.test(item.code))

				this.showRegionData[0] = list
				

				this.getCityCode(list[0].code)
			},
			getCityCode(code) {
				const data = this.locationData
				// console.log(code)
				const v = code.slice(0, 2)
				const reg = new RegExp('^' + v)
				const list = data.filter(item => reg.test(item.code))
				const reg2 = /00$/
				const res = list.filter(item => reg2.test(item.code))
				res.splice(0, 1)
				if (!res.length) {
					const obj = {
						"id": 1,
						"code": v + '0100',
						"name": "市辖区",
						"short_name": "市辖区",
					}
					res.push(obj)
				}
				this.showRegionData[1] = res

				this.getAreaCode(res[0].code)
			},
			getAreaCode(code) {
				const data = this.locationData
				const reg = new RegExp('^' + code.slice(0, 4) + '[0-9][1-9]$')
				const list = data.filter(item => reg.test(item.code))
				this.showRegionData[2] = list
				// console.log(this.showRegionData)
			},
			changeColumn(e) {
				// console.log(e)
				const {
					column,
					value
				} = e.detail



				if (column === 0) {
					this.getCityCode(this.showRegionData[0][value].code)

					return
				}

				if (column === 1) {
					this.getAreaCode(this.showRegionData[1][value].code)
					return
				}

			},
			selectChange(e) {
				this.selectData = e.detail.value
			},
			async getInitAreaCode(v){
				const res = await this.$myRequest({
					url: '/system/city/list'
				})
				// console.log('nihao')
				if (res.success !== 1) return
				uni.setStorageSync('regionData', res.data)
				this.locationData = res.data
				const p = v.slice(0, 2) + '0000';
				const data = this.locationData
				
				const reg = /0000$/
				const proL = data.filter(item => reg.test(item.code))
				this.showRegionData[0] = proL
				this.getCityCode(p);
				const list = this.showRegionData
				
				const pArr = list[0],
					cArr = list[1],
					aArr = list[2];
					console.log(pArr)
				const pIdx = pArr.findIndex(item => item.code === p)
				const cIdx = cArr.findIndex(item => item.code === v.slice(0, 4) + '00')
				const aIdx = aArr.findIndex(item => item.code === v)
				this.selectData = [pIdx, cIdx, aIdx]
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-wrap {
		width: 100%;

		.uni-input {
			width: 100%;
		}

		.select-text {
			font-size: 42rpx;
			color: #333;
			font-weight: 600;
			margin-right: 10rpx;
		}
	}
</style>
