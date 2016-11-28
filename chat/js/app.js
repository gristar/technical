$(function() {
	setTimeout('shine("你好，我叫娜娜")', 3000);
	
	$("body").on("click", ".btn_text", function() {
		send();
	})
	
	$("body").on("click", ".showSupport", function() {
		showDialog();
	})
	$(document).keydown(function(event) {
		if (event.keyCode == 13) { //绑定回车 
			send();
		}
	});
	
	function send() {
		var msg = $("#chat_textarea").val();
		sendMsg(msg);
		$("#chat_textarea").val("");
		setTimeout('getMsg("然后呢")', 1000);
	}
	
})

function shine(msg) {
	getMsg(msg);

	var titleInit = document.title,
		isShine = true;

	setInterval(function() {
		var title = document.title;
		if (isShine == true) {
			if (/新/.test(title) == false) {
				document.title = '【你有新消息】';
			} else {
				document.title = '【　　　　　】';
			}
		} else {
			document.title = titleInit;
		}
	}, 500);

	window.onfocus = function() {
		isShine = false;
	};
	window.onblur = function() {
		isShine = true;
	};

	// for IE
	document.onfocusin = function() {
		isShine = false;
	};
	document.onfocusout = function() {
		isShine = true;
	};
}

function notification(name,msg,imgsrc){
	var host = "http://127.0.0.1:8020/chat/";
	if(window.Notification){
		var notice = function(){
			var notification = new Notification(name,{
				body:msg,
				icon: host+imgsrc
			})
			notification.onclick = function(){
				sendMsg("我查看了你的消息");
				notification.close();
			}
		}
		if(Notification.permission == "granted"){
			notice();
		}
		else if(Notification.permission != "denied"){
			Notification.requestPermission(function(premission){
				notice();
			})
		}
		else{
			alert("您拒绝了接收桌面通知");
		}
	}
	else{
		alert("当前浏览器不支持桌面通知");
	}
}

function sendMsg(msg) {
	$content = $("#tmp-msg-send").clone();
	$content.find(".chat_content").html(msg);
	$("#panelBody-5").append($content.html());
}

function getMsg(msg) {
	$content = $("#tmp-msg").clone();
	$content.find(".chat_time").html('<span>' + (new Date()).toLocaleTimeString() + '</span>');
	$content.find(".chat_content").html(msg);
	$("#panelBody-5").append($content.html());
	notification("娜娜", msg, "img/nana.gif");
}

function showDialog() {
	var d = dialog({
		title: "浏览器支持情况",
		content: "<img src='img/support.png'/>",
		width: "1130"
	});
	d.showModal();
}