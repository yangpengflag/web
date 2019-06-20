var u=window.navigator.userAgent;
if(u.indexOf('iPhone')>-1||u.indexOf("Android")>-1||u.indexOf("iPad")>-1){
  window.location.href="http://m.weekfan.com";
}

var navList={
  chothes:[],
  jewellery:[]
}
// localStorage.removeItem("navList")
function setMenu(navList){
  var cUl=$(".header .clothes ul");
  var jUl=$(".header .jewellery");
  var html1="";
  var html2="";
  var newArr=[];
  var group=Math.ceil(navList.jewellery.length/5);
  var defaultCName="";
  for(var g=0;g<group;g++){
    newArr[g]=[];
    for(var j=0;j<navList.jewellery.length;j++){
      if(Math.floor(j/5)==g){
        newArr[g].push(navList.jewellery[j])
      }
    }
  }
  for(var i=0;i<navList.chothes.length;i++){
    var name=navList.chothes[i].name.split("_");
    var spanV=name[0];
    var emV=name[1];
    html1+='<li>'+
              '<a href="./clothes.html?id='+navList.chothes[i].id+'&name='+navList.chothes[i].name+'">'+
                '<span>'+spanV+'</span>'+
                '<em>'+emV+'</em>'+
              '</a>'+
              '<div class="line"></div>'+
            '</li>';
  }
  for(var k=0;k<newArr.length;k++){
    html2+="<ul>";
    for(var j=0;j<newArr[k].length;j++){
      html2+='<li>'+
              '<a href="./jewellery.html?id='+newArr[k][j].id+'&name='+newArr[k][j].name+'">'+newArr[k][j].name+'</a>'+
              '<span class="line"></span>'+
            '</li>'
    }
    html2+="</ul>";
  }
  cUl.html(html1);
  jUl.html(html2);
  defaultCName=navList.chothes[0].name;
  $("#nav-clothes").attr("href","./clothes.html?id="+navList.chothes[0].id+"&name="+navList.chothes[0].name);
//$("#nav-jewellery").attr("href","./jewellery.html?id="+newArr[0][0].id+"&name="+newArr[0][0].name);
  $("#nav-jewellery").attr("href","./jewellery.html");
}

function getType(){
  $.ajax({
    url:"https://websiteapi.weekfan.com/api/v1/WebGoods/GetCategoryList",
    data:{},
    dataType:"json",
    success:function(res){
      if(res.status==1){
        var chothes=res.data[7];
        var jewellery=res.data[1];
        navList.chothes=chothes;
        navList.jewellery=jewellery;
        setMenu(navList);
        localStorage.setItem("navList",JSON.stringify(navList))
      }else{
        alert(res.errorMsg)
      }
    },
    error:function(res){
      console.log(res);
    }
  })
}
;$(function(){
  if(localStorage.getItem("navList")){
    navList=JSON.parse(localStorage.getItem("navList"));
    setMenu(navList);
  }else{
    getType();
  }  
})






;function getUrlParms() {
  var url = window.location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
       
      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
       
    }
  }
  return theRequest;
}


;$(function(){
  var index=0;
  var $nav=$(".header .nav");
  $nav.each(function(i){
    if($(this).hasClass("active")){
      index=i;
    }
  })
	$nav.hover(function(){
    $nav.removeClass("active");
    $(this).addClass("active");
    $(this).find(".sub-menu").stop(true,true).slideDown();
  },function(){
    $(this).removeClass("active");
    $nav.eq(index).addClass("active");
    $(this).find(".sub-menu").stop(true).slideUp();
  })
})



// ;$(function(){
// 	var title=document.title;
// 	var timer=null;
// 	function autoString(){
// 		timer=setInterval(function(){
// 			title=title.substring(1,title.length)+title.substring(0,1);
// 			document.title=title
// 		},200);
// 	}
// 	autoString();
// })
