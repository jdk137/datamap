var Aslan = Aslan || {
    PAGE_SIZE: 10
}


Aslan.openWindow = function(url, newWindow){
	if(newWindow){
		window.open(url, '_blank');
	} else {
		window.open(url, '_self');//location.href = url;
	}
}
 
Aslan.parseParam = function (str) {
    Aslan.queryParam = {}

    var ret = str.split('&')

    Ext.each(ret, function (v) {
        var kv = v.split('=')
        Aslan.queryParam[kv[0]] = decodeURIComponent(kv[1])
    })
}

Aslan.reloadSearch = function (k, v) {
    Aslan.queryParam[k] = v
    location.search = Aslan.serialize(Aslan.queryParam)
}

Aslan.serialize = function (obj, skip) {
    var ret = [],
        skip = skip || {}

    for (var k in obj) {
        typeof skip[k] === 'undefined' && ret.push(k + '=' + encodeURIComponent(obj[k]))
    }

    for (var k in skip) {
        ret.push(k + '=' + encodeURIComponent(skip[k]))
    }

    return ret.join('&')
}


//分页组件生成器
Aslan.createPages = function (totalCount, size, offset) {
    var total = Math.ceil(totalCount / size),
        i, len,
        ret = ['prev'],
        current = Math.floor(offset / size) + 1;
    if (total <= 10) {
        for (i = 1; i <= total; ++i) {
            ret.push(i);
        }
    }

    //总分页大于10
    if (total > 10) {
        ret.push(1, 2);


        //当前页小于6
        if (current < 6) {
            //当前页小于3，则展示前5页，并推入点号；当前页大于等于3， 则展示当前页+2的方格， 并推入点号
            len = current < 3 ? 6 : current + 3;

            for (i = 3; i < len; ++i) {
                ret.push(i);
            }

            ret.push('split', total - 1, total);

        } else if (current > total - 4) { //当前页大于total-4

            ret.push('split');
            //展示当前页-2到total
            for (i = current - 2; i <= total; ++i) {
                ret.push(i);
            }

        } else {
            //展示 1 2 ... current-2 current-1 current current+1 current+2 ... total-1 total
            ret.push('split');

            for (i = current - 2, len = current + 3; i < len; ++i) {
                ret.push(i);
            }

            ret.push('split', total - 1, total);

        }

    }

    if (current == 1) {
        ret.shift();
    }
    if (totalCount > 0 && current !== total) {
        ret.push('next');
    }

    return ret;
};

Aslan.createStore = function (url, fields, autoLoad) {
	if(url.indexOf('?') < 0){
		url = url + location.search; 
	}
    if (autoLoad == undefined) {
        autoLoad = true;
    }
    return Ext.create('Ext.data.JsonStore', {
        fields: fields,
        proxy: {
            type: 'ajax',
            url: url
        },
        loadMask: {
            msg: '正在加载数据...'
        },
        autoLoad: autoLoad
    })
}

Aslan.createPaginalStore = function (url, fields, pageSize, autoLoad) {
    if (autoLoad == undefined) {
         autoLoad = true;
    }

	if(url.indexOf('?') < 0){
		url = url + location.search;
	}

    return Ext.create('Ext.data.JsonStore', {
        fields: fields,
        pageSize: pageSize || 20,
        proxy: {
            type: 'ajax',
            startParam:"offset",
            limitParam:"max",
            sortParam:'sort',
            simpleSortMode: true,
            directionParam: 'order',
            url: url,
            timeout:800000,
            reader: {
                type: 'json',
                root: 'rows',
                idProperty: 'guid',
                totalProperty: 'totalCount'
            }
        },
        autoLoad: autoLoad,
        remoteSort: true
    })
}

Aslan.color_chart = function(){
	return [
			"#50b2d8",//
			"#fcd200",
			"#a9cf27",
			"#f35f5e",
			"#de82eb",
			"#f79f52",
			"#657fff",
			"#bb8500",
			"#59cf95",
			"#f492bc",
			"#d2b1ff",
			"#fad784",
			"#156d8d",
			"#ceaa00",
			"#49a000",
			"#bd3031",
			"#8147ef",
			"#f68c00",
			"#223ed1",
			"#207d6f"
         ];
}

Aslan.color_serial = function(){
	return [
			//npm
			"#1984c7",
			"#19c719",
			"#8419c7",
			"#c78419",
			"#19c7b9",
			"#c71919",
			//chartdirect
			"#4572a7",
			"#aa4643",
			"#89a54e",
			"#71588f",
			"#4198af",
			"#db843d",
			"#93a9cf",
			"#d19392",
			"#b9cd96",
			"#a99bbd",
			"#88c0d2",
			"#f9b186",
			"#ccd5e6",
			"#e7cccc",
			"#dbe5cd",
			"#d5cfdd",
			"#cbe0e9",
			"#fcdacb",
			"#b9c6dd",
			"#dfb9bb",
			"#cfdcbb",
			"#c5bdd2",
			"#b8d6e1",
			"#fbcdb7",
			"#a3b5d4",
			"#d6a3a2",
			"#c1d3ab",
			"#b4a9c5",
			"#a1cbda",
			"#fabfa0",
			"#8aa3cc",
			"#ce8a89",
			"#b4ca8e",
			"#a393b9",
			"#88c0d2",
			"#f9b186",
			"#668dc2",
			"#c56765",
			"#a3c06d",
			"#8c76aa",
			"#64b2ca",
			"#f79f60",
			"#4c7db7",
			"#ba4d4a",
			"#96b556",
			"#7c619d",
			"#48a6c0",
			"#ef9143",
			"#4774ab",
			"#ae4845",
			"#8ca950",
			"#735a92",
			"#439bb3",
			"#e0873f" 
	          ];
}


Aslan.render_metaTable = function(guid) {
	var name = guid.substr(guid.lastIndexOf('.') + 1)
	return "<a href='/metaTable?guid=" + guid + "' target=_blank>" + name +"</a>";
}

Aslan.render_data_size = function(size) {
    if(size == null) return ''
    if (size < 0) {
        size = -size;
       var addSign = true;
    }
    if(size < 1024)  return addSign? '-' + size.toFixed(2) + ' B' : size.toFixed(2) + ' B'
    size = size / 1024
    if(size < 1024) return addSign? '-' + size.toFixed(2) + ' KB' : size.toFixed(2) + ' KB'
    size = size / 1024
    if(size < 1024) return addSign? '-' + size.toFixed(2) + ' MB' : size.toFixed(2) + ' MB'
    size = size / 1024
    if(size < 1024) return addSign? '-' + size.toFixed(2) + ' GB' : size.toFixed(2) + ' GB'
    size = size / 1024
    if(size < 1024) return addSign? '-' + size.toFixed(2) + ' TB' : size.toFixed(2) + ' TB'
    else {
        size = size / 1024
        return addSign? '-' + size.toFixed(2) + ' PB' : size.toFixed(2) + ' PB'
    }
}

Aslan.render_cpu_cost = function(cpu) {
    if(cpu == null) return ''
    if (cpu < 0) {
        cpu = -cpu;
        var addSign = true;
    }
    cpu = cpu /3600 //先转换为 核*小时
    if(cpu < 1000)  return addSign? '-' + cpu.toFixed(2) + ' core*h' : cpu.toFixed(2) + ' core*h'
    else{
        cpu = cpu / 1000
        return addSign? '-' + cpu.toFixed(2) + ' k*core*h' : cpu.toFixed(2) + ' k*core*h'
    }
}

Aslan.render_mem_cost = function(mem) {
    if(mem == null) return ''
    if (mem < 0) {
        mem = -mem;
        var addSign = true;
    }
    mem = mem / 3600  //先转换为 MB*h
    if(mem < 1024) return addSign? '-' + mem.toFixed(2) + ' MB*h' : mem.toFixed(2) + ' MB*h'
    mem = mem / 1024
    if(mem < 1024) return addSign? '-' + mem.toFixed(2) + ' GB*h' : mem.toFixed(2) + ' GB*h'
    mem = mem / 1024
    if(mem < 1024) return addSign? '-' + mem.toFixed(2) + ' TB*h' : mem.toFixed(2) + ' TB*h'
    else {
        mem = mem / 1024
        return addSign? '-' + mem.toFixed(2) + ' PB*h' : mem.toFixed(2) + ' PB*h'
    }
};

Aslan.render_money = function(money)  {
    return money.toFixed(2)  + ' 元'
};

Aslan.render_percent = function(share) {
    if(share == null) return ''
    if (share < 0) {
        share = -share;
        var addSign = true;
    }
    share = share / 0.01
    return addSign? '-' + share.toFixed(2) + '%' : share.toFixed(2) + '%'
}

Aslan.timestamp_render =  function(stamp) { 
	var date = new Date(stamp)
	function pad(n){return n<10 ? '0'+n : n}
	var dstr = date.getFullYear()+'-'+pad(date.getMonth())+'-'+
		pad(date.getDay())+' '+pad(date.getHours())+':'+pad(date.getMinutes())
		+':'+pad(date.getSeconds())
	return dstr
}

Aslan.YN_render = function(type) {
	return type==0?'否':'是'
}


function ajax(url, asynFlag) {

    var req = getRequest();
    if (req == null) {
        alert('Browser cannot create XMLHttpRequest.');
        return;
    }
    var returnValue = null;
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                try {
                    returnValue = req.responseText;

                } catch (e) {
                    //target.innerHTML = 'Error.';
                }
            } else {
            }
        } else {

        }
        return null;
    }

    var info = null;
    var method = 'GET';

    url = url + '&ajax=1';

    req.open(method, url, asynFlag);

    req.send(info);

    return returnValue;

}

function getRequest() {
    var request0 = null;
    if (window.ActiveXObject) { // IE
        for (var i = 5; i > 0; i--) {
            try {
                if (i == 2) {
                    request0 = new ActiveXObject("Microsoft.XMLHTTP");
                } else {
                    request0 = new ActiveXObject("MSXML2.XMLHTTP." + i + ".0");
                }
                break;
            } catch (e) {
                request0 = null;
            }
        }

    } else if (window.XMLHttpRequest) { //Mozilla
        request0 = new XMLHttpRequest();
        if (request0.overrideMimeType) {//MiME
            request0.overrideMimeType('text/xml');
        }
    }
    if (request0 == null) {
        window.alert("Browser cannot create XMLHttpRequest. ");
        return null;
    }

    return request0;

}

Aslan.highchartsInit = function(){
    Highcharts.setOptions({
                lang: {
                    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
                    weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    exportButtonTitle: '导出PDF',
                    printButtonTitle: '打印报表',
                    rangeSelectorFrom: '',
                    rangeSelectorTo: '到',
                    rangeSelectorZoom: '区域',
                    downloadJPEG: '下载JPEG',
                    downloadPDF: '下载PDF',
                    downloadPNG: '下载PNG',
                    downloadSVG: '下载SVG',
                    printChart: '打印图表',
                    loading: '图表加载中'
                }
            });
}

Aslan.hasRole = function(expectedRoles, currentRoles) {
    if (!expectedRoles) {
        return true;
    }
    currentRoles = currentRoles || '';
    var rs = expectedRoles.split(",");
    var crs = currentRoles.split(",");
    for (var i = 0; i < rs.length; i++) {
        var expectedRole = $.trim(rs[i]);
        // maybe empty
        if (!expectedRole) {
            continue;
        }
        for (var j = 0; j < crs.length; j++) {
            if (crs[j] == expectedRole) {
                return true;
            }
        }
    }
    return false;
};