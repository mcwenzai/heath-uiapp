<template>
	<view class="global-loading-container global-loading-mask">
		<view class="global-loading-wrapper">
			<view class="global-loading"></view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'uni-loading'
	}
</script>
<style lang="scss">
	.global-loading-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, .5);
	}

	.global-loading-container.global-loading-mask {
		background: #fff;
	}

	.global-loading-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}

	.global-loading {
		position: absolute;
		top: 45%;
		left: 50%;
		height: 135rpx;
		width: 135rpx;
		transform: translate(-50%, -50%);
	}

	.global-loading:before,
	.global-loading:after {
		content: '';
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		height: 135rpx;
		width: 135rpx;
		box-sizing: border-box;
	}

	@-webkit-keyframes globalLoadingRotate {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@keyframes globalLoadingRotate {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.global-loading:before {
	    border: 4rpx solid #f7f7f7;
	    border-right-color: #F6C9B7;
	    border-radius: 100%;
	    animation: globalLoadingRotate linear 1.5s infinite;
	}

	.global-loading:after {
	    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDMTg1NjA1NEU3QjExRUM4MUFBREM5MTBBQzRDNjg0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDMTg1NjA2NEU3QjExRUM4MUFBREM5MTBBQzRDNjg0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUMxODU2MDM0RTdCMTFFQzgxQUFEQzkxMEFDNEM2ODQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUMxODU2MDQ0RTdCMTFFQzgxQUFEQzkxMEFDNEM2ODQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4PQWwQAAARpklEQVR42uxbCXxU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") center/64rpx 64rpx no-repeat;
	}
</style>
