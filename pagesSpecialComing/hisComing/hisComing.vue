<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<block v-for="item in list" :key='item.id'>
				<image :src="item.historyPhotoUrl" mode="widthFix"></image>
			</block>
		</scroll-view>
		<bottom-special-coming-btn  :doctorId='list[0].doctorId' :doctorName='list[0].doctorName'></bottom-special-coming-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad(options) {
			const data = JSON.parse(decodeURIComponent(options.params))
			this.getList(data.doctorId)
		},
		methods: {
			async getList(id) {
				const res = await this.$myRequest({
					url: '/special/specialDoctorHistory/list ',
					method:'POST',
					data: {
						doctorId: id
					},
					
				})
				if (!res || res.success !== 1) return
				this.list = res.data.list
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 0rpx 140rpx;
		text-align: center;
		image{
			// margin-top: 20rpx;
			width: 750rpx;
		}
	}
</style>
