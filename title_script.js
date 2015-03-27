Z63.ChangePageTitle=function(e){
	"use strict";
	var t={},n,r;
	t.init=function(e){
		n=e.title;
		r=e.originalTitle;
		t.listenToChange()
	};
	t.listenToChange=function(){
		var e,n,r,i;
		if(typeof document.hidden!=="undefined"){
			e="hidden";r="visibilitychange";n="visibilityState"
		}
		else if(typeof document.mozHidden!=="undefined"){
			e="mozHidden";r="mozvisibilitychange";n="mozVisibilityState"
		}
		else if(typeof document.msHidden!=="undefined")
			{e="msHidden";r="msvisibilitychange";n="msVisibilityState"}
		else if(typeof document.webkitHidden!=="undefined"){
			e="webkitHidden";r="webkitvisibilitychange";n="webkitVisibilityState"
		}
		document.addEventListener(r,function(){
			t.setTitle(document[n])
		},
		false)
	};
	t.setTitle=function(e){
		if(e=="hidden"){
			// var t=document.title.replace("Z63",n);
			var t=document.title.replace("Philip Nye's",n);
			document.title=t
		}
		else{
			document.title=r
		}
	};
	return{init:t.init}}(jQuery);
ChangePageTitle.init({title:"I miss you ♥",originalTitle:document.title});