

 function novaJanela(pagina,nome,w,h,scroll){
						leftPosition = (screen.width) ? (screen.width-w)/2 : 0;
						topPosition = (screen.height) ? (screen.height-h)/2 : 0;
						settings = 'height=' +h+ ',width=' +w+ ",top=" +topPosition+', left='+leftPosition+',scrollbars='+',resizable'
						win = window.open(pagina,nome,settings);
					}
				

	
