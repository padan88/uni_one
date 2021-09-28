function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}


//清理对象某些比如null，undefined，"",函数
function clearCertain(sObj, ary) {
	ary = ary || [null, undefined, ""];
	var judge = function(v) {
		var re = false;
		var t = v;
		if (typeof(t) == "function") {
			t = Function;
		} else if (typeof(t) == "object") {
			if (t) {
				if (t.constructor == Object) {
					t = Object;
				} else {
					t = Array;
				}
			}
		} else if (typeof(t) == "string") {
			t = String;
		} else if (typeof(t) == "number") {
			t = Number;
		} else if (typeof(t) == "boolean") {
			t = Boolean;
		} else if (typeof(t) == "undefined") {
			t = undefined;
		}
		for (var i = 0, len = ary.length; i < len; i++) {
			if (t == ary[i] || (v == ary[i] && typeof(v) == typeof(ary[i]))) {

				re = true;
				break;
			}
		}
		return re;
	}
	var ergodic = function(obj) {
		for (var key in obj) {
			if (judge(obj[key])) {
				delete obj[key];
			} else {
				(typeof(obj[key]) == "object") && ergodic(obj[key]);
			}
		}
	}
	ergodic(sObj);
	return sObj;
}

function isURL(url) {
	return /http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(url)
}

module.exports = {
	dateFormat: dateFormat,
	clearCertain: clearCertain,
	isURL: isURL
}
