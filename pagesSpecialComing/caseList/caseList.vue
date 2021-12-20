<template>
	<view class="page-wrap">
		<top-navigation-bar></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">
			<block v-for="item in list" :key='item.id'>
				<agent-registration-case-item :listType="1" :info='item'></agent-registration-case-item>
			</block>
		</scroll-view>
		<bottom-special-coming-double-btn  :doctorId='list[0].doctorId' :doctorName='list[0].doctorName'></bottom-special-coming-double-btn>
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
					url: '/special/specialDoctorCase/list',
					data: {
						doctorId: id
					}
				})
				if (!res || res.success !== 1) return
				this.list = res.data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 30rpx 120rpx;
	}
</style>
