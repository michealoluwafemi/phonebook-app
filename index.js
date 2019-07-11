$(document).ready(function(){
	var conList = [];
	$('.total').text(conList.length+" contacts");


	$("#addForm").click(function(){
		$(".saveEdited").hide();
		$("#saveContact").show();
		clearIn();
		$("#contact-list").hide();
		$("#form").fadeIn(1000);
	});

	$("#showContacts").click(function(){
		loadContacts();
		$("#form").hide();
		$("#contact-list").fadeIn(1000);
	});

	$("#saveContact").click(function(){
		var fn = $('input#fName').val();
		var ln = $('input#lName').val();
		var e = $('input#email').val();
		var p = $('input#pNo').val();
		var w = $('select#tosave').val();
		conList.push([fn, ln, e, p, w]);
		clearIn();
		//console.log(conList);
	});

	$(".saveEdited").click(function(){
		var pNo = $('input#toDel').val();
		var fn = $('input#fName').val();
		var ln = $('input#lName').val();
		var e = $('input#email').val();
		var p = $('input#pNo').val();
		var w = $('select#tosave').val();
		conList = conList.filter(function(item){ return item[3] != pNo; });
		conList.push([fn, ln, e, p, w]);
		clearIn();
	});

	//$("li.lis").click(function(){
	//	$(".action-buttons").fadeOut();
	//	$(this).find(".action-buttons").fadeIn();
	//});

	$("ul.lists").on("click", "li.lis", function(){
		$(".action-buttons").fadeOut();
		$(this).find(".action-buttons").fadeIn();
	});

	$("ul.lists").on("click", "button.btn-edit", function(){
		$("#saveContact").hide();
		$(".saveEdited").show();
		$("#contact-list").hide();
		var fn = $(this).closest('li').find('.fName').html();
		$('input#fName').val(fn);
		var ln = $(this).closest('li').find('.lName').html();
		$('input#lName').val(ln);
		var pNo = $(this).closest('li').find('.num').html();
		$('input#pNo').val(pNo);
		$('input#toDel').val(pNo);
		var e = $(this).closest('li').find('.hidden').html();
		$('input#email').val(e);
		//console.log(fn);
		$("#form").fadeIn(1000);
	});

	$("ul.lists").on("click", "button.btn-del", function(){
		var fName = $(this).closest('li').find('.fName').text();
		var lName = $(this).closest('li').find('.lName').text();
		conList = conList.filter(function(item){ return (item[0] != fName && item[1] != lName); });
		//console.log(pNo);
		loadContacts();
	});

	$("ul.lists").on("click", "button.btn-call", function(){
		alert("Calling "
			+ $(this).closest('li').find('.fName').text()
			+ "\n" 
			+$(this).closest('li').find('.num').text());
	});

	function clearIn() {
		$('input#fName').val("");
		$('input#lName').val("");
		$('input#email').val("");
		$('input#pNo').val("");
	}

	function loadContacts() {
		$('ul.lists').html("");
		conList.sort();
		$.each(conList, function(i) {
			var li = $('<li/>').addClass('lis').appendTo($('ul.lists'));
			var span = $('<span/>').addClass('fName').text(conList[i][0]).appendTo(li);
			var span_n = $('<span/>').addClass('lName').text(" "+conList[i][1]).appendTo(li);
			var br = $('<br />').appendTo(li);
			var span_2 = $('<span/>').addClass('num').text(conList[i][3]).appendTo(li);
			var span_3 = $('<span/>').addClass('hidden').text(conList[i][2]).appendTo(li);
			var div = $('<div />').addClass('action-buttons').appendTo(li);
			var c_btn = $('<button />').addClass('small btn-call').text("call").appendTo(div);
			var e_btn = $('<button />').addClass('small btn-edit').text("edit").appendTo(div);
			var d_btn = $('<button />').addClass('small btn-del').text("del").appendTo(div);
		});
		$('.total').text(conList.length+" contacts");
	}

	$('input.search').keyup(function (){
		var x = $(this).val().toLowerCase();
		var newList = [];
		
		if(x == ""){
			loadContacts();
		}
		else{
			$('ul.lists li').filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(x) > -1);
			});
			//newList = conList.filter(function(item){ return item[0] == x; });		
		}
	});

});