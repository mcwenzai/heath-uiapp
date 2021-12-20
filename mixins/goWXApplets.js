export default {
	methods: {
		goWXApplets(url) {
			plus.share.getServices(
				function (res) {
					var sweixin = null;
					for (var i = 0; i < res.length; i++) {
						var t = res[i];
						if (t.id == "weixin") {
							sweixin = t;
						}
					}
					if (sweixin) {
						sweixin.launchMiniProgram({
							id: "gh_2f0e9ecb8558",
							path: url,
							type: 0,
						});
					}
				},
				function (res) {
					// console.log(JSON.stringify(res));
				}
			);
		},
	},
};
