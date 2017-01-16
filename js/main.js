$(document).ready(function(){

    if (window.innerWidth > 390 && window.innerWidth < 450) {
        $('.main-footer .row div').addClass("col-xs-10 col-xs-offset-1");
    }

    /*
     Background slideshow
     */
    $('.coming-soon').backstretch([
        "img/backgrounds/coffee.jpg"
        , "img/backgrounds/mac.jpg"
        , "img/backgrounds/coding-curriculum.jpg"
    ], {duration: 3000, fade: 750});

    /*
     Countdown initializer
     */
    studyJavaDate = new Date(2015, 3 - 1, 5);
    $(".timerTemp").countdown({since: studyJavaDate, onTick: countUp, format: "YODH"});
    function countUp(periods) {
        //[0] is years, [1] is months, [2] is weeks, [3] is days, [4] is hours, [5] is minutes, and [6] is seconds.
        var timer = $(".timer");
        timer.find(".years").html(periods[0]);
        timer.find(".months").html(periods[1]);
        timer.find(".days").html(periods[3]);
        timer.find(".hours").html(periods[4]);
    }

    /*flatUI*/
    var states = new Bloodhound({
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.word);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 4,
        local: [
            {word: "Alabama"},
            {word: "Alaska"},
            {word: "Arizona"},
            {word: "Arkansas"},
            {word: "California"},
            {word: "Colorado"}
        ]
    });

    states.initialize();

    $('input.tagsinput').tagsinput();


    /*滚动出现导航栏和回到顶部按钮*/
    $(window).scroll(function () {
        if ($(document).scrollTop() > $(".main-header").height() - 50) {
            var top = window.innerHeight * 0.8;
            $(".myheading").css("opacity", "1");
            $("button.goTop").css("opacity", "1");
            $("button.goTop").css("top", top);
        } else {
            $(".myheading").css("opacity", "0");
            $("button.goTop").css("opacity", "0");
        }
    });

    /*音乐开关*/
    $('#musicSwitch1').bootstrapSwitch();
    $('#musicSwitch2').bootstrapSwitch();
    $('#musicSwitch3').bootstrapSwitch();

    $('#musicSwitch1').on('switchChange.bootstrapSwitch', function (event, state) {
        if (state) {
            $('#musicSwitch2').bootstrapSwitch("state", false);
            $('#musicSwitch3').bootstrapSwitch("state", false);
            var top = window.innerHeight - 33;
            $("#xiaMiBoBo_SHBZYQDGQ").css("top", top);
            $("#xiaMiBoBo_SHBZYQDGQ").css({"left": "-30px", "opacity": "1"});
        } else {
            $("#xiaMiBoBo_SHBZYQDGQ").css({"left": "-257px", "opacity": "0"});
        }
    });
    $('#musicSwitch2').on('switchChange.bootstrapSwitch', function (event, state) {
        if (state) {
            $('#musicSwitch1').bootstrapSwitch("state", false);
            $('#musicSwitch3').bootstrapSwitch("state", false);
            var top = window.innerHeight - 44;
            $("#netEasy_GX").css("top", top);
            $("#netEasy_GX").css({"left": "-40px", "opacity": "1"});
        } else {
            $("#netEasy_GX").css({"left": "-257px", "opacity": "0"});
        }
    });
    $('#musicSwitch3').on('switchChange.bootstrapSwitch', function (event, state) {
        if (state) {
            $('#musicSwitch1').bootstrapSwitch("state", false);
            $('#musicSwitch2').bootstrapSwitch("state", false);
            var top = window.innerHeight - 44;
            $("#netEasy_PFZL").css("top", top);
            $("#netEasy_PFZL").css({"left": "-40px", "opacity": "1"});
        } else {
            $("#netEasy_PFZL").css({"left": "-257px", "opacity": "0"});
        }
    });

    //为了修复音乐开关覆盖导航栏的暂定方案
    $(window).scroll(function () {
        //header加上notes和tag Cloud的高度，再加三个间隙的高度
        var breakPoint = $(".main-header").height() + $(".widget")[0].offsetHeight + $(".widget")[1].offsetHeight + 35 * 3;
        if ($(document).scrollTop() > breakPoint) {
            $(".musicWidget").css("opacity", "0");
        } else {
            $(".musicWidget").css("opacity", "1");
        }
    });

    //goTop
    $('button.goTop').on('click', function () {
        $.smoothScroll({
            scrollTarget: '.main-header'
        });
        //去掉手机回到顶部时，菜单展开的问题
        $("#bs-example-navbar-collapse-1").removeClass("in");
        return false;
    });

    //goFooter
    $('#goFooter').on('click', function () {
        $.smoothScroll({
            scrollTarget: '.main-footer'
        });
        return false;
    });

    $("#facebookLogo").on("click", function () {
        window.open("https://www.facebook.com/mickey.wang.10690");
    });
    $("#twitterLogo").on("click", function () {
        window.open("https://twitter.com/Laughing____");
    });
    $("#weixinLogo").on("click", function () {
        $('#weixinQRCode').modal('show');
    });
    $("#qqLogo").on("click", function () {
        $('#qqQRCode').modal('show');
    });
    $("#weiboLogo").on("click", function () {
        window.open("https://weibo.com/MickeyLaughing");
    });
    $("#githubLogo").on("click", function () {
        window.open("https://github.com/Mickey-Wang");
    });

    //---- 搜索 -----
    FullTags = [];//所有文章标签的数组
    $("article .footer .tag-list").each(function(i,n){
        var innerArray = [];
        $(this).find("a").each(function(i,n) {
            innerArray.push(n.innerText.toLowerCase());
        });
        FullTags.push(innerArray);
    });
    console.info(FullTags);

    //Tag Cloud搜索
    searchByTags($("input[name=tagsinput-01]").tagsinput('items'));//初始化显示

    $("input[name=tagsinput-01]").on("itemRemoved",function(event){
        if(event.item == "清空所有标签")
            $("input[name=tagsinput-01]").tagsinput('removeAll');
        searchByTags($("input[name=tagsinput-01]").tagsinput('items'));
    });
    $("input[name=tagsinput-01]").on("itemAdded",function(event){
        searchByTags($("input[name=tagsinput-01]").tagsinput('items'));
    });

    //点击搜索按钮搜索
    $(".navbar-form button[type=submit]").on("click",function(event){
        var array = [];
        array.push($("#navbarInput-01").val());
        removeAddTags(array);
    });

    //点击每一个标签搜索
    $("article .footer .tag-list a").on("click",function(event){
        var array = [];
        array.push(this.innerText);
        removeAddTags(array);
    });

    //为导航栏中的每一个标签注册点击搜索事件
    $("#htmlNav").on("click",function(){
        removeAddTags(["html","css"]);
    });
    $("#javaNav").on("click",function(){
        removeAddTags(["java"]);
    });

    //没有文章时，点击刷新按钮搜索
    $("#clickRefresh").on("click",function(){
        removeAddTags(["java","JavaScript","DOM","中级","百度","商业","清空所有标签"]);
    });

});


/**
 * 根据多个标签值搜索文章
 * @param tags Array[String]
 */
function searchByTags(tags){
    $("article").css("display","none");
    $(tags).each(function(index,tag){
        var articleNum = [];
        $(FullTags).each(function(i,n){
            $.inArray(tag.toLowerCase(),n) != -1 ? articleNum.push(i+1) : "";
        });
        console.info("第x篇文章显示:" + articleNum);
        $("article").each(function(i,n){
            if($.inArray(i+1,articleNum) != -1) {
                $(this).css("display","");
            }
        });
    })
}

/**
 * 先删除所有标签，然后增量搜索
 * @param tags Array[String]
 */
function removeAddTags(tags){
    $("input[name=tagsinput-01]").tagsinput('removeAll');
    $(tags).each(function(i,n){
        $("input[name=tagsinput-01]").tagsinput('add',n);
    });
}
