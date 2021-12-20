import md5 from "./md5.js";
// appId: AI-SHOP
// appSecret: 066159a5c976830749f9d031ce2c92e0
// version: 1.0.0

const APPID = "AI-SHOP";
const setRandomStr = function (e) {
	e = e || 32;
	let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
		a = t.length,
		n = "";
	for (let i = 0; i < e; i++) {
		n += t.charAt(Math.floor(Math.random() * a));
	}
	return n;
};

const setRequestVerification = function (data, param1) {
	const nonce = setRandomStr(32);
	const timestamp = new Date().getTime();
	const VERSION = "1.0.0";
	const APPSECRET = "066159a5c976830749f9d031ce2c92e0";
	const phone = data.phone;
	let sign;
	if (param1 == 0) {
		sign = APPID + nonce + phone + timestamp + VERSION + APPSECRET;
	} else if (param1 == 1) {
		const code = data.code;
		const smsId = data.smsId;
		sign =
			APPID +
			code +
			nonce +
			phone +
			smsId +
			timestamp +
			VERSION +
			APPSECRET;
	} else if (param1 === 2) {
		// 微信第三方登录签名
		sign =
			APPID +
			data.avatar +
			data.nickname +
			nonce +
			data.openId +
			data.pushJson +
			timestamp +
			data.unionid +
			VERSION +
			APPSECRET;
	} else if (param1 === 3) {
		// apple登录
		sign =
			APPID +
			nonce +
			data.openId +
			data.pushJson +
			timestamp +
			VERSION +
			APPSECRET;
	}
	sign = md5(sign);
	return `?appid=${APPID}&nonce=${nonce}&timestamp=${timestamp}&version=${VERSION}&sign=${sign}`;
};

export default setRequestVerification;
