import keyMap from "@/libs/keyMap.js";
import { myRequest } from "@/libs/request.js";
import { isLogin } from "@/libs/isLogin.js";

// 页面跳转传参函数
export function goPage(path, data) {
	isLogin().then(v => {
		if(v){
			const url = !data
				? path
				: path + "?params=" + encodeURIComponent(JSON.stringify(data));
			uni.navigateTo({
				url: url,
			});
		}
	})
}

// 格式化时间‘2019-09-10 00:00:00’
export function formateTime(str) {
	if (!str) return "";
	let date = str.slice(0, 10);
	let time = str.slice(11, 20);
	date = date.replace("-", "年").replace("-", "月") + "日";
	return date + " " + time;
}
export function fnThrottle(fn, delay, atleast) {
	//节流函数
	let timer = null;
	let previous = null;
	return function () {
		let now = +new Date();
		if (!previous) previous = now;
		if (atleast && now - previous > atleast) {
			fn();
			previous = now;
			clearTimeout(timer);
		} else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn();
				previous = null;
			}, delay);
		}
	};
}

export const getNum = (str) => {
	str = Number(str).toFixed(1);
	const strArr = String(str).split(".");
	if (+strArr[1] <= 5 && +strArr[1] > 0) {
		return +`${strArr[0]}.5`;
	}
	return Math.ceil(+str);
};

// 克转袋
export const grainToBag = (list) => {
	list.forEach((item) => {
		if (item) {
			const initNum = item.quantity;
			let num = getNum(initNum / (item.effectRatio || 1));
			item.quantity = +num;
			item.unit = "袋";
			const res = +(num * (item.effectRatio || 1) - initNum);
			item.overNum = Math.round(res * 10) / 10;
		}
	});
	return [...list];
};
// 袋转克
export const bagToGrain = (list) => {
	list.forEach((item) => {
		if (item) {
			let quantity =
				item.quantity * (item.effectRatio || 1) - (item.overNum || 0);

			item.quantity = Math.round(quantity * 10) / 10;
			item.overNum = 0;
			item.unit = "克";
		}
	});
	return [...list];
};
// 商品授权按钮点击时间
export const goodsAuth = (goods, isBuyImmediately) => {
	return new Promise((resolve, reject) => {
		if (
			!goods.authorizeStatus ||
			goods.authorizeStatus === keyMap.authStatus.waitApply ||
			goods.authorizeStatus === keyMap.authStatus.reject
		) {
			let customerId = uni.getStorageSync("customerId");
			myRequest({
				url: "/goods/goods/goodsAuthorize",
				data: {
					goodsId: goods.id,
					storeId: goods.storeId,
					customerId: customerId,
				},
			}).then((res) => {
				if (res.success === 1) {
					uni.showToast({
						title: "申请授权成功",
						icon: "none",
					});
					resolve("success");
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
					reject();
				}
			});
		} else if (goods.authorizeStatus === keyMap.authStatus.pass) {
			uni.navigateTo({
				url: `/pages/index/goodsDetail?goodsId=${goods.id}&storeId=${goods.storeId}&isBuyImmediately=${isBuyImmediately}`,
			});
			resolve();
		} else if (goods.authorizeStatus === keyMap.authStatus.doing) {
			uni.showToast({
				title: "已申请授权",
				icon: "none",
			});
			resolve();
		}
	});
};

export const setGoodsTagImg = (v) => {
	if (v === 0) return "/static/images/index/hotGoods.png";
	if (v === 1) return "/static/images/index/popGoods.png";
	if (v === 2) return "/static/images/index/perfectGoods.png";
	return "";
};
