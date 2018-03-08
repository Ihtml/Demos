
(function () {
	var datepicker = {};
	datepicker.getMonthDate = function (year,month) {
		var ret=[];
		if (!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth()+1;
		}
		//这个月的第一天
		var firstDay = new Date(year,month -1,1);
		var firstDayWeekDay = firstDay.getDay();
		//上月的最后一天
		var lastDayOfLastMonth = new Date(year,month-1,0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		//需要显示上月的天数
		var preMonthDayCount = firstDayWeekDay;
		//当月最后一天
		var lastDay = new Date(year,month,0);
		var lastDate = lastDay.getDate();

		for(var i=0;i<7*6;i++){
			var date = i+1-preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			if(date <= 0){
				//上一月
				thisMonth = month -1;
				showDate = lastDateOfLastMonth+ date;
			}else if(date > lastDate){
				//下一月
				thisMonth = month +1;
				showDate = showDate -lastDate;
			}
			if(thisMonth ===0) thisMonth =12;
			if(thisMonth === 13) thisMonth =1;

			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
		}
		return {
			year: year,
			month: month,
			days: ret
		};
	};

	window.datepicker = datepicker;
})();