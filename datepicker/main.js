
(function methodName(arguments) {
	var datepicker= window.datepicker;
	var monthData;
	var $wrapper;
	datepicker.buildUi=function (year,month) {
		//获取年月日
		monthData = datepicker.getMonthDate(year,month);
		var html='<div class="ui-datepicker-header">'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
			'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
			'<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>'+
		'</div>'+
		'<div class="ui-datepicker-body">'+
			'<table>'+
				'<thead>'+
					'<tr>'+
						'<th>日</th>'+
						'<th>一</th>'+
						'<th>二</th>'+
						'<th>三</th>'+
						'<th>四</th>'+
						'<th>五</th>'+
						'<th>六</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>';

				for(var i=0; i<monthData.days.length;i++){
					var date=monthData.days[i];
					if(i%7 ===0){
						html += '<tr>';
					}
					html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
					if(i%7 ===6){
						html += '</tr>';
					}
				}

					'<tr>'+
						'<td>25</td>'+
						'<td>26</td>'+
						'<td>27</td>'+
						'<td>28</td>'+
						'<td>1</td>'+
						'<td>2</td>'+
						'<td>3</td>'+
					'</tr>'


				html += '</tbody>' +
			'</table>'+
		'</div>';

		return html;
	};//bulidUi结束

	datepicker.render = function (direction) {
		var year,month;
		if (monthData) {
			year = monthData.year;
			month = monthData.month;
		}
		if(direction === 'prev'){
			month--;
			if (month===0) {
				month=12;
				year--;
			}
		}
		if(direction === 'next'){
			month++;
			if(month===13){
				month=1;
				year++;
			}
		}

		var html = datepicker.buildUi(year,month);

		$wrapper = document.querySelector('.ui-datepicker-wrapper');
		if(!$wrapper){
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className = 'ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;
	}

	datepicker.init = function (input) {
		datepicker.render();

		var $input = document.querySelector(input);
		var isOpen = false;
		$input.addEventListener('click',function () {
			if (isOpen) {
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			} else {
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				//把$wrapper绝对定位到输入框下方
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height +2 +'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}
		},false);
		//切换月份
		$wrapper.addEventListener('click',function (e) {
			var $target = e.target;
			if(!$target.classList.contains('ui-datepicker-btn')){
				return;
			}
			if ($target.classList.contains('ui-datepicker-prev-btn')) {
				datepicker.render('prev');
			} else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}

		},false)
		//点击显示
		$wrapper.addEventListener('click',function (e) {
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== 'td') return;

			var date= new Date(monthData.year,monthData.month-1,$target.dataset.date);
			$input.value = format(date);

			//$target.style.color="red";
		},false)
	};
	//格式化日期字符串
	function format(date) {
		var ret = '';
		ret += date.getFullYear() + '-';
		var _month = date.getMonth() +1;
		if(_month<10) _month='0'+_month;
		ret += _month + '-';
		var _day = date.getDate();
		if(_day<10) _day ='0'+ _day;
		ret += _day;
		return ret;
	}

})();