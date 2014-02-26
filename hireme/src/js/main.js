//底层共用
var iBase = {
    Id: function(name) {
        return document.getElementById(name);
    },
    //设置元素透明度,透明度值按IE规则计,即0~100
    SetOpacity: function(ev, v) {
        ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
    }
};

//淡入效果(含淡入到指定透明度)

function fadeIn(elem, speed, opacity) {
    /*
     * 参数说明
     * elem==>需要淡入的元素
     * speed==>淡入速度,正整数(可选)
     * opacity==>淡入到指定的透明度,0~100(可选)
     */
    speed = speed || 20;
    opacity = opacity || 100;
    //显示元素,并将元素值为0透明度(不可见)
    elem.style.display = 'block';
    iBase.SetOpacity(elem, 0);
    //初始化透明度变化值为0
    var val = 0;
    //循环将透明值以5递增,即淡入效果
    (function() {
        iBase.SetOpacity(elem, val);
        val += 5;
        if (val <= opacity) {
            setTimeout(arguments.callee, speed);
        }
    })();
}

// for skill chart
var chart;

var chartData = [{
    "skill": "CSS",
    "weight": 70
}, {
    "skill": "HTML",
    "weight": 80
}, {
    "skill": "JavaScript",
    "weight": 60
}, {
    "skill": "Backend",
    "weight": 40
}, {
    "skill": "Others",
    "weight": 50
}];

AmCharts.ready(function() {
    // PIE CHART
    chart = new AmCharts.AmPieChart();

    // OPTIONS
    chart.balloon.borderAlpha = 0;
    chart.balloon.borderThickness = 0;
    chart.balloon.fillAlpha = 0;
    chart.balloon.fontSize = 0;
    chart.colors = ["#F7464A", "#FDB45C", "#46BFBD", "#949FB1", "#4D5360", "#6EB6DE"];
    chart.dataProvider = chartData;
    chart.fontFamily = "monospace", "Courier New";
    chart.fontSize = 16;
    chart.hoverAlpha = 1;
    chart.innerRadius = "70%";
    chart.labelRadius = 40;
    chart.labelText = "[[title]]";
    chart.labelTickAlpha = 0.3;
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 1;
    chart.outlineThickness = 12;
    chart.pullOutDuration = 0.3;
    chart.pullOutOnlyOne = true;
    chart.pullOutEffect = "easeOutSine";
    chart.pullOutRadius = "16%";
    chart.pieX = "32%";
    chart.pieY = "45%";
    chart.radius = "30%";
    chart.sequencedAnimation = true;
    chart.startEffect = "bounce";
    chart.startDuration = 2;
    chart.startRadius = "100%";
    chart.titleField = "skill";
    chart.valueField = "weight";

    // WRITE                                 
    chart.write("chartdiv");
    chart.clickSlice(0);
    chart.addListener("pullOutSlice", function(slice) {
        // When a slice pulled out

        // span#core
        document.getElementById('core').innerHTML = slice.dataItem.title;
        fadeIn(iBase.Id('core'));

        // div#detail
        var index = slice.dataItem.index;
        var newHtml = '';
        switch (index) {
            case 0:
                newHtml = '<span>CSS2.1</span><span>CSS3</span><span>Bootstrap</span><span>Cross-Browser Compatibility</span>';
                break;
            case 1:
                newHtml = '<span>HTML4.01</span><span>HTML5</span><span>Semantic HTML</span>';
                break;
            case 2:
                newHtml = '<span>Native JavaScript</span><span>jQuery</span><span>AJAX</span><span>JSON</span><span>Flot</span><span>AmCharts</span>';
                break;
            case 3:
                newHtml = '<span>PHP</span><span>SQL</span><span>Mysql</span>';
                break;
            case 4:
                newHtml = '<span>GitHub</span><span>Mac OS X</span><span>Linux</span><span>Sublime Text</span>';
                break;
        }
        document.getElementById('detail').innerHTML = newHtml;
        var spanElements = document.getElementById('detail').childNodes;
        for (var i = 0; i < spanElements.length; i++) {
            var style = spanElements[i].style;
            style.backgroundColor = chart.colors[index];
            style.width = parseInt(300 - 20 * (i + Math.random() * 1)) + 'px';
            style.opacity = 1 - 0.15 * i;
        };
        fadeIn(iBase.Id('detail'));
    });
});

// for projects slider
$(document).ready(function() {
    // My Uno Slider
    window.unoSlider = $('#sliderId').unoSlider({
        animSpeed: 300,
        auto: false
    });
    $('div.unoSliderNav span').text(''); 
    changeProjInfo(window.unoSlider.current.data('idx'));
    var unoSliderNavChilds = document.getElementsByClassName('unoSliderNav')[0].childNodes;
    for (var i = unoSliderNavChilds.length - 1; i >= 0; i--) {
        unoSliderNavChilds[i].addEventListener('click',function() {
            changeProjInfo(window.unoSlider.current.data('idx'));
        });
    };
    document.getElementById('next').addEventListener('click', function() {
        var currentIndex = window.unoSlider.current.data('idx') + 1;
        changeProjInfo(currentIndex);
    });
    document.getElementById('prev').addEventListener('click', function() {
        var currentIndex = window.unoSlider.current.data('idx') - 1;
        changeProjInfo(currentIndex);
    });
    document.getElementById('next').addEventListener('click', function(e) {
        // Live handler called
        e.preventDefault();
        window.unoSlider.goForward();
        window.unoSlider.resetTimer();
    });
    document.getElementById('prev').addEventListener('click', function(e) {
        // Live handler called
        e.preventDefault();
        window.unoSlider.goBack();
        window.unoSlider.resetTimer();
    });
});

function changeProjInfo(currentIndex) {
    var projectDescChilds = document.getElementById('projectDesc').childNodes;
    var projectTitle = '';
    var skillTag = '';
    var projectContent = '';
    var projectUrl = '';
    switch (currentIndex) {
        case 0:
        case 5:
            projectTitle = '青少年健康评价与运动干预在线服务平台';
            skillTag = 'Native JavaScript, jQuery, JSON, AJAX';
            projectContent = '参与完成前端开发，与服务器异步交互数据以及数据可视化工作';
            projectUrl = '未上线';
            break;
        case 1:
            projectTitle = '个人博客';
            skillTag = 'HTML, CSS, Native JavaScript, GitHub, Jekyll';
            projectContent = '独立完成了设计与开发';
            projectUrl = '<a href="http://yvonnezhang.github.io/myblog">http://yvonnezhang.github.io/myblog</a>';
            break;
        case 2:
            projectTitle = '智能导游系统后台系统';
            skillTag = 'PHP, Mysql, HTML, CSS, Bootstrap';
            projectContent = '基金项目。独立完成了设计与前端页面、后端服务器的开发工作，并参与完成与客户端信息交互的接口';
            projectUrl = '<a href="http://guidingsystem.webatu.com">http://guidingsystem.webatu.com</a>';
            break;
        case 3:
            projectTitle = '以图搜图';
            skillTag = 'HTML, CSS, Native JavaScript, GitHub';
            projectContent = '课程项目。完成了页面的设计与开发、本地服务器和前端页面数据交互的工作';
            projectUrl = '<a href="https://github.com/ZhanruiLiang/imagematch">https://github.com/ZhanruiLiang/imagematch</a>';
            break;
        case 4:
        case -1:
            projectTitle = '语文教学辅助系统';
            skillTag = 'PHP, Mysql, HTML, Flash Player Plugin';
            projectContent = '基金项目。完成了补充文档功能的开发、以及多种格式文档的在线阅读';
            projectUrl = '本地服务器';
            break;
    }
    projectDescChilds[1].innerHTML = projectTitle;
    projectDescChilds[3].childNodes[3].innerHTML = skillTag;
    projectDescChilds[5].childNodes[3].innerHTML = projectContent;
    projectDescChilds[7].childNodes[3].innerHTML = projectUrl;
}
