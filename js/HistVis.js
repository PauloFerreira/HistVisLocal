
$(function() {

	var Input = $('input[name=search_text]');
    var default_value = Input.val();
    Input.focus(function() {
        if(Input.val() == default_value) Input.val("");
    }).blur(function(){
        if(Input.val().length == 0) Input.val(default_value);
    });

	$( "input[type=submit], a, button" )
	.button()
	.click(function( event ) {
		event.preventDefault();
	});

	var availableTags = ["Facebook","Youtube","Sapo","Record","Google","Twitter","Hotmail","Gmail","Dropbox","Wikipedia","Amazon","Yahoo","LinkedIn","Blogspot",
		"Bing","Microsoft","Apple","Craigslist","IST","Inesc-ID","9gag","Abola","Ojogo","Publico","Sol","OLX","IOL","IMDB","Wordpress","CGD","Tumblr"];
	$("input#search_text").autocomplete({
		source: availableTags
	});
	
	var items = [], items_dates = [], dates_nodupl = [], count_dia_array = [], domain, thumbs2 = "", box2 = [], periodo;
	var flag_divs = new Boolean(), flag_modal = new Boolean(), flag_color = new Boolean(), flag_outside = new Boolean(), flag_color_table = new Boolean();
	var flag_filtro = new Boolean(), filterWord = new Boolean(), domain_period = "", color_array = [], rgb = "", color_table = [], website;
	filterWord = false; flag_filtro = false; flag_outside = false; flag_color_table = false; flag_color = false; flag_modal = false; flag_divs = false;
	var adapta = [], control = [], divide = 0, myBoolean = new Boolean(), pixel_bool = new Boolean(), barras_array = [];
	adapta.push(["teste", 0]);
	color_array.push(["_!?[]", "}'£%"]);
	
	function randomColor(num) {          
		return Math.floor(Math.random() * num);
	}
	
	function eliminateDuplicates(arr) {
		var i, len=arr.length, out=[], obj={};

		for (i=0;i<len;i++) {
			obj[arr[i]]=0;
		}
		for (i in obj) {
			out.push(i);
		}
		return out;
	}
	
	Array.max = function( array ){
		return Math.max.apply( Math, array );
	};
	Array.min = function( array ){
		return Math.min.apply( Math, array );
	};
	
	color_table[0] = ['facebook','#003399'];
	color_table[1] = ['youtube','#CC0000'];
	color_table[2] = ['sapo','#00CC00'];
	color_table[3] = ['record','#FF0000'];
	color_table[4] = ['google','#3333FF'];
	color_table[5] = ['twitter','#6666FF'];
	color_table[6] = ['hotmail','#006699'];
	color_table[7] = ['gmail','#CC0000'];
	color_table[8] = ['dropbox','#66CCFF'];
	color_table[9] = ['wikipedia','#D0D0D0'];
	color_table[10] = ['amazon','#FF6600'];
	color_table[11] = ['yahoo','#990099'];
	color_table[12] = ['linkedin','#336699'];
	color_table[13] = ['blogspot','#FF3300'];
	color_table[14] = ['bing','#FF6600'];
	color_table[15] = ['microsoft','#3366FF'];
	color_table[16] = ['apple','#686868'];
	color_table[17] = ['craigslist','#333366'];
	color_table[18] = ['ist','#3399FF'];
	color_table[19] = ['inesc-id','#339933'];
	color_table[20] = ['9gag','#000000'];
	color_table[21] = ['abola','#FFCC00'];
	color_table[22] = ['ojogo','#000000'];
	color_table[23] = ['publico','#CC0000'];
	color_table[24] = ['sol','#FF9900'];
	color_table[25] = ['olx','#FFFFCC'];
	color_table[26] = ['iol','#336699'];
	color_table[27] = ['imdb','#FFCC00'];
	color_table[28] = ['wordpress','#3366FF'];
	color_table[29] = ['cgd','#000066'];
	color_table[30] = ['tumblr','##484848 '];

	var jqxhr = $.getJSON("semTotalmin.json", function(data) {

		$.each(data, function(key, val) {
			items.push([val.id, val.title, val.description, val.startdate, val.image, val.link]);
		});
	  
		for(var i = 0; i<items.length; i++) {
			items_dates.push(items[i][3].split(" ", 1));
		}
	  
		dates_nodupl = eliminateDuplicates(items_dates);
	  
		for(var i = 0; i<dates_nodupl.length; i++) {
			if(dates_nodupl[i].split("-")[2].length==1) {
				var fixedDate = dates_nodupl[i].split("-")[0] + "-" + dates_nodupl[i].split("-")[1] + "-0" + dates_nodupl[i].split("-")[2];
			} else {
				var fixedDate = dates_nodupl[i];
			}
			$('<div>' + fixedDate + '</div>')
			.attr('id', 'date')
			.css({'height': '25px'})
			.appendTo("#dates");
			$("#dates").append('<p></p>');
		}

		//Este ciclo percorre cada data, sem ser duplicada, ou seja, percorre cada dia do historico
		for(var a = 0; a<dates_nodupl.length; a++) {
			for(var b = 0; b<items.length; b++) { //Este ciclo percorre cada site visitado, ou seja, cada barra, quer seja de um dia ou de todos
				if(dates_nodupl[a]==items[b][3].split(" ", 1)) { //Se a data não duplicada actual for igual à data do site actual
					control.push(b); //Insere a posição numérica no array control
				
					for(var c = 0; c<adapta.length; c++) { //Este ciclo percorre um array em que o objectivo é por cada dominio ter a contagem de ocorrencias de paginas
						if(adapta[c][0]==items[b][5].split('/', 3)[2]) { //Se o dominio da posição actual for igual ao dominio do site actual
							adapta[c][1] = adapta[c][1] + 1; //Adiciona +1 à contagem
							myBoolean = true;
							break;
						} else {
							myBoolean = false;
						}
					}
					if(myBoolean==false) {
						adapta.push([items[b][5].split('/', 3)[2], 1]); //Se não houver nenhum dominio igual nos dois lados, insere no array adapta, o dominio e a contagem a começar em 1
					}	
				}
			}
		
			adapta.splice(0,1);
		
			var box = [], count = 0, count_little = 0, links_little = [], count_divide = 0, array_order = [], pixel_max = [];
			var rgb_count = 0, soma_pixel=0, count_dia = 0, item_link = "";
			
			for(var d = 0; d<control.length; d++) { //Este ciclo percorre o array control, que tem armazenadas as posições de todos os sites (items) onde a data nao duplicada foi igual à data do site
				item_link = items[control[d]][5].split('/', 3)[2];
				for(var e = 0; e<adapta.length; e++) { //Percorre o ciclo que contém por cada dominio as ocorrencias de sites de apenas um dia
					if(adapta[e][0]==item_link) { //Se o dominio actual do adapta for igual à posição do control actual do array items
						divide = (100*adapta[e][1])/control.length; 
					
						box.push(item_link); //Insere no array box o link
						box2.push([dates_nodupl[a],item_link, items[control[d]][5], '<img src="http://open.thumbshots.org/image.aspx?url=' + items[control[d]][5] + '" border="1" width="60" height="45" />', 
							items[control[d]][1], items[control[d]][3]]);
						break;
					}
				}

				for(var f=0; f<box.length; f++) { //Este ciclo percorre o array box
					if(item_link==box[f]) { //Se o site designado for igual ao da box
						count++;
					}
				}
			
				if(count<2 && divide > 2.5) {
					array_order.push([item_link, divide]);		
				} else if(count<2 && divide <= 2.5) {
					count_little++;
					links_little.push(item_link);
					count_divide += divide;
				}
				count = 0;
			}
		
			array_order.sort(function(a,b) {return  b[1] - a[1];});

			$("#bars").append('<div id="linha" ></div>');
		
			for(var g=0; g<array_order.length; g++) {
			
				if(array_order[g][0].split('.', 3).length==3) {
					website = array_order[g][0].split('.', 3)[1];
				} else if(array_order[g][0].split('.', 3).length==2) {
					website = array_order[g][0].split('.', 3)[0];
				} else {
					website = array_order[g][0].split('.', 3)[0];
				}

				for(var h = 0; h<color_table.length; h++) {
					if(website==color_table[h][0]) {
						flag_color_table = true;
						colr = color_table[h][1];
						break;
					}
				}
				if(!flag_color_table) {
					for(var i = 0; i<color_array.length; i++) {
						if(website==color_array[i][0]) {
							var colr = color_array[i][1];
							flag_color = true;
							break;
						} else if(website!=color_array[i][0]) {
							flag_color = false;
						}
					}
					if(flag_color==false) {
						rgb = "rgb(" + randomColor(255) + "," + randomColor(255) + "," + randomColor(255) + ")";
						color_array.push([website, rgb]);
						var colr = rgb;
					}
				}

				var $imgEl = $('<canvas id="myCanvas" width="22px" height="22px" style="border:1px solid #c3c3c3;">Your browser does not support the HTML5 canvas tag.</canvas>');

				$("div#linha").last().append(
					$('<a class="barra ' + website + ' ' + dates_nodupl[a] + '"></a>')
					.css({
						"display": "inline-block",
						"width": "0px",
						"backgroundColor": colr,
						"height": "25px",
						"text-align": "center",
						"z-index": "0",
						"cursor": "pointer",
						"border-right": "2px solid black",
						"vertical-align": "top",
						"box-sizing": "border-box",
						"-moz-box-sizing": "border-box", /* Firefox */
						"-webkit-box-sizing": "border-box" /* Safari */
					})
					//.html($imgEl)
					.html('<img style="-webkit-user-select: none" src="http://www.google.com/s2/favicons?domain=' 
						+ array_order[g][0] + '" width="22" height="22">')
					.animate({"width": (array_order[g][1]) + "%"}, "slow")
				);

				/*
				var imageObj = new Image();
				var ctx = $imgEl[0].getContext("2d");
				imageObj.src = 'http://www.google.com/s2/favicons?domain=' + array_order[g][0];
				ctx.drawImage(imageObj,0,0,22,22);*/
				
				flag_color_table = false;
			}

			if(count_little!=0) {
				$("div#linha").last().append(
					$('<a class="cluster"></a>').css({
						"display": "inline-block",
						"width": "0px",
						"backgroundColor": "#FF6633",
						"height": "25px",
						"z-index": "0",
						"cursor": "pointer",
						"text-align": "center",
						"vertical-align": "top",
						"box-sizing": "border-box",
						"-moz-box-sizing": "border-box", /* Firefox */
						"-webkit-box-sizing": "border-box" /* Safari */
					}).animate({"width": (count_divide) + "%"}, "slow").html(count_little)
				);
			}

			for(var j = 0; j<adapta.length; j++) {
				count_dia = count_dia + adapta[j][1];
			}
			count_dia_array.push(count_dia);
			
			count_little = 0;
			control = [];
			$("#bars").append("<p></p>");
			adapta = [];
			adapta.push(["teste", 0]);
			links_little = [];
			count_divide = 0;
			array_order = [];
			pixel_max = [];
		}
		
		var flag_tr_linear = new Boolean(), count_linha = 0, calc_linha=0, flag_tr_log = new Boolean();
		flag_tr_linear = false, flag_tr_log = false;
		var max_linha = Array.max(count_dia_array);
		
		$("button#close.ui-button").click(function(){
		if(!flag_outside) {
			$("#aba").css({"height": $("table#myTable").css("height")});
			//console.log($("table#myTable").css("height"));
			if(flag_divs==true) {
				$("#aba").animate({width: "0%"}, 500, function(){$("#aba").css({"display": "none"});});
				$("#main").animate({width: "99%"}, 550);
				flag_divs = false;
			} else if(flag_divs==false) {$("#aba").animate({width: "49%"}, 500);
				$("#aba").css({"display": "inline-block"});
				$("#main").animate({width: "50%"}, 500);
				flag_divs = true;
			}
		}
		});
		
		$("button#type_linear.ui-button").click(function() {
		if(!flag_outside) {
			if(!flag_tr_linear) {
				$("div#linha").each(function() {
					calc_linha = (count_dia_array[count_linha]*100)/max_linha;
					$(this).animate({"width": calc_linha + "%"}, 800, function() {
						$(this).children().each(function() {
							if($(this).width()<25) {
								$(this).children().css("display", "none");
							}
						});
					});
					count_linha++;
				});
				count_linha = 0;
				flag_tr_linear=true;
				flag_tr_log=false;
			}
		}
		});
		
		$("button#type_log.ui-button").click(function() {
		if(!flag_outside) {
			if(!flag_tr_log) {
				$("div#linha").each(function() {
					calc_linha = (Math.log(count_dia_array[count_linha])*100)/Math.log(max_linha);
					$(this).animate({"width": calc_linha + "%"}, 800, function() {
						
						$(this).children().each(function() {
							if($(this).width()<25 || $(this).parent().width()==0) {
								$(this).children().css("display", "none");
							} else {
								if($(this).children().css("display")=="none") {
									$(this).children().css("display", "inline");
								}
							}
						});
					});
					
					count_linha++;
				});
				count_linha = 0;
				flag_tr_log=true;
				flag_tr_linear=false;
			}
		}
		});
		
		$("button#type_repor.ui-button").click(function() {
			if(!flag_outside) {
				$("div#linha").animate({"width": "100%"}, "slow");
				flag_tr_linear=false;
				flag_tr_log=false;
				$("div#linha").each(function() {
					if($(this).children().children().css("display")=="none") {
						$(this).children().children().css("display", "inline");
					}
				});
			}
		});
		
		
		$(document).click(function(){
			if(flag_outside) {
				$("div#modal").toggle("slow");
				flag_outside=false;
				$("div#ultra")
				.animate({backgroundColor: '#FFFFFF'}, 500)
				.css("cursor", "auto");
				
				$("div#ultra").children().each(function() {
					if($(this)[0]!=$("div#main")[0]) {
						$(this).animate({opacity: 1}, 500);
					}
				});
				$("div#main").children().each(function() {
					if($(this)[0]!=$("table#myTable")[0]) {
						$(this).animate({opacity: 1}, 500);
					}
				});
				$("tr#tr1").children().each(function() {
					if($(this)[0]!=$("td#t3")[0]) {
						$(this).animate({opacity: 1}, 500);
					}
				});
				$("div#linha").children().each(function() {
						$(this).animate({opacity: 1}, 500);
				});
				flag_filtro = false;
				$("div#div_filtro").remove();
			}
		});

		$("a.barra").click(function() {
			if(!flag_outside) {

				var $barra = $(this);
				
				$("div#ultra").children().each(function() {
					if($(this)[0]!=$("div#main")[0]) {
						$(this).animate({opacity: 0.25}, 500);
					}
				});
				$("div#main").children().each(function() {
					if($(this)[0]!=$("table#myTable")[0]) {
						$(this).animate({opacity: 0.25}, 500);
					}
				});
				$("tr#tr1").children().each(function() {
					if($(this)[0]!=$("td#t3")[0]) {
						$(this).animate({opacity: 0.25}, 500);
					}
				});
				$("div#linha").children().each(function() {
					if($(this)[0]!=$barra[0]) {
						$(this).animate({opacity: 0.25}, 500);
					}
				});
				
				
				$("div#ultra")
				.animate({backgroundColor: '#C0C0C0'}, 500, function() {
					flag_outside=true;
				})
				.css("cursor", "pointer");
			
				var lim_dir = $(window).width();
				var lim_baixo = $(window).height();
				var jan_dir = 0.6*lim_dir;
				var jan_baixo = 0.4*lim_baixo;
				var topo = $(this).position().top;
				var left = $(this).position().left;
				var scrollTop = $(window).scrollTop();

				domain = $(this)[0].className.split(' ')[1];
				periodo = $(this)[0].className.split(' ')[2];
				
				var imgs = thumbnails(periodo, domain);
				
				//VER http://stackoverflow.com/questions/10418534/creating-vertical-timelines-with-javascript-jqquery
			
			/*
				$.timeliner();
			
				var $test = $('<div id="timelineContainer">' +
					'<div class="timelineMajor">' +
						'<h2 class="timelineMajorMarker"><span> Major Marker </span></h2>' +
						'<dl class="timelineMinor">' +
							'<dt id="event01"><a>Event</a></dt>' +
							'<dd class="timelineEvent" id="event01EX" style="display: none; ">' +
								'<p>Content about the event goes here.</p>' +
							'</dd>' +
						'</dl>' +
					'</div>' +
				'</div>');*/
			
			
			
				//var $modal = $test
				var $modal = $('<div>' + imgs + '</div>')
				.attr('id', 'modal')
				.css({
					background: '#fff',
					zIndex: 2,
					padding: '10px',
					width: '60%',
					height: "40%",
					margin: '0 auto',
					opacity: 1,
					position: 'absolute',
					top: topo + 50 + 120 + 40,
					left: left + 10,
					border: "2px solid black",
					display: 'none',
					overflow: 'auto'
				})
				.click(function(e) {
					e.stopPropagation();
				});
				
				if((jan_dir+left+10)>=lim_dir) {
					$modal.css("left", lim_dir-jan_dir-50 + "px");
				}
				
				if((jan_baixo+topo+10)>=lim_baixo) {
					$modal.css("top", lim_baixo+scrollTop-jan_baixo-30 + "px");
				}
				
				var current_h = 0;
				var current_w = 0;
				
				$("div#modal").remove();
				$('body').append($modal);
				$("div#modal")
				.toggle("slow")
				.css("overflow", "auto")
				.find("img").hoverIntent(function() {
						current_h = $(this).height();
						current_w = $(this).width();
						$(this).animate({width: current_w*3 + "px", height: current_h*3 + "px"}, 300);
					},
					function(){
						$(this).animate({width: current_w + 'px', height: current_h + 'px'}, 300);
					}
				);
			}
		});
		
		//'<div id="verticalLine" style="border-left:thick solid #ff0000;width:1px;height:100%;display:inline-block;"></div>'
		function thumbnails(data, site) {
			var thumbs3 = "";
			for(var k=0; k<box2.length; k++) {
				if(box2[k][0]==data) {
					if(box2[k][1].split('.', 2)[1]==site) {
						thumbs3 = thumbs3 + "<div class='item' style='display:inline-block;border:1px solid black;'><a href='" + box2[k][2] + "' target='_blank'>" + box2[k][3] + 
									"</a><div style='display:inline-block;'>&nbsp;Título: " + box2[k][4] + 
									" <br/>&nbsp;Data de visita: " + box2[k][5] + " <br/>&nbsp;Link: <a href='" + box2[k][2] + 
									"' target='_blank'>" + box2[k][1] + " </a></div></div><p></p>";
					}
				}
			}
			//thumbs3 = '<div id="verticalLine" style="border-left:thick solid #ff0000;width:1px;height:100%;display:inline-block;"></div>' + thumbs3;
			return thumbs3;
		}
		
		
		$("button#search_button.ui-button").click(function() {
			if(!flag_outside) {
				
				var texto = $("input#search_text").val();
				
				if(texto!="") {
					$("div#div_filtro").each(function() {
						if($(this).children("span#site").text()==texto) {
							filterWord = true;
							return false;
						}
					});

					if(!filterWord) {
						if(!flag_filtro) {
							if($("a.barra[class*='" + texto + "']").length>0) {
								$("a.barra:not([class*='" + texto + "']),a.cluster").animate({opacity: 0.25}, 500);
								flag_filtro = true;
							} else {
								$("p#filtros").append("<span id='warn'>No matches found!</span>");
								$("span#warn")
								.fadeOut(800, function() {
									$(this).remove();
								});
							}
						} else if(flag_filtro) {
							$("a.barra[class*='" + texto + "'][opacity=0.25]").animate({opacity: 1}, 500);
						}
						
						if(flag_filtro) {
							var $div_filtro = $("<div><span id='site'>" + texto + "</span> " + "</div>")
								.attr('id', 'div_filtro')
								.css({
									'display': "inline-block",
									'padding': "5px"
								});
							
							$("p#filtros").append($div_filtro);
								
							$("div#div_filtro").last().append(
							
								$("<span>X</span>")
								.attr('id', 'span_x')
								.css({
									'text-align': 'center',
									'border': '2px solid #000',
									'border-radius': '2em',
									'cursor': 'pointer'
								})
								.click(function() {
									var nameFilter = $(this).parent().children("span#site").text();
									var $actualFilter = $(this);
									if($("p#filtros").children().length==1) {
										$("a.barra[opacity=0.25],a.cluster").animate({opacity: 1}, 500, function() {
											flag_filtro = false;
										});
										$actualFilter.parent().remove();
									} else {
										$("a.barra[class*='" + nameFilter + "']").animate({opacity: 0.25}, 500);
										$actualFilter.parent().remove();
									}
								})
							);
						}
					}
					filterWord = false;
				}
				$("input#search_text").val("");
			}
		});
		
		$('input#search_text').keypress(function(e) {
			if(!flag_outside) {
				if (e.keyCode == 13) {
					e.preventDefault();
					$("button#search_button.ui-button").trigger('click');
					$("input#search_text").val("");
				}
			}
		});
		
		$("button#remove_button.ui-button").click(function() {
			if(!flag_outside) {
				$("a.barra[opacity=0.25], a.cluster").animate({opacity: 1}, 500, function() {
					flag_filtro = false;
				});
				$("div#div_filtro").remove();
			}
		});
		
		/*
		$('div#modal.ui-draggable').masonry({
			// options
			itemSelector : '.item',
			columnWidth : 240
		});*/
		

		//FIM
	})

});