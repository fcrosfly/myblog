
window.onload = function(){

	var title = document.getElementsByClassName("title");
	for(var i=0;i<title.length;i++){
		title[i].onclick = function(){
			alert(this.nextElementSibling.nodeValue);
			/*title.next().setAttribute("style","display:none");*/
		};
	}
}