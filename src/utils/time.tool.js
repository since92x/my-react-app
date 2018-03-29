export const calcDate = (stamp, { days, months, years }) => {
    const d = new Date(stamp);
    days && d.setDate(d.getDate() + days);
    months && d.setMonth(d.getMonth() + months);
    years && d.setFullYear(d.getFullYear() + years);
    return Date.parse(d);
};
export const prettyDate = (stamp, format) => {
    const d = new Date(stamp);
    let res = format;
    const opt = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S": d.getMilliseconds()
    };
    if (/(y+)/.test(res)) {
        res = res.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let o in opt) {
        if (new RegExp("(" + o + ")").test(res)) {
            res = res.replace(RegExp.$1, (RegExp.$1.length === 1) ? (opt[o]) : (("00" + opt[o]).substr(("" + opt[o]).length)));
        }
    }
    return res;
};
// usage:
// const stamp = Date.parse(new Date());
// const newStamp = calcDate(stamp, { days: -12 });
// const newStamp2 = calcDate(stamp, { days: +12 });
// const timestr = prettyDate(newStamp, "yyyy-MM-dd hh:mm:ss");
// const timestr2 = prettyDate(newStamp2, "yyyy-MM-dd");
// console.log("hello :\n%s\n%s", timestr, timestr2);