export default {
	filters: {
		formatePrice(v) {
			if (!v) return "0.00";
			const n = +v;
			if (isNaN(n)) return v;
			const m = Math.round(n * 100) / 100;
			return m - Math.floor(m) > 0 ? m : m + ".00";
		},
	},
};
