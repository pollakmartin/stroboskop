window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
        document.getElementById("barve").appendChild(input);
	}
	
	var odstraniBarve = function(){
		document.querySelector("#barve").innerHTML = "";
	}
	
	var gumbZaZagon = function(){
		document.querySelector("#start").innerHTML = "";
	}
	
	document.querySelector("#odstraniBarve").addEventListener('click', odstraniBarve);
	
	document.querySelector("#novaBarva") 
		.addEventListener('click', dodajBarvo);
		
	document.querySelector("#start").addEventListener('click', function() {
	    this.innerHTML = ""
	})
		
	//Odstrani barve
	
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;
	
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];

		if (ustavi) {
			ustavi = false;
		} else {
			novId = (id+1) % vrednosti.length;
			timeout = Math.floor((Math.random() * (maxCas-minCas)) + minCas);
			setTimeout(function() {spremeniBarvo(novId)} , timeout);
		}		
	}
	
	var stop = function(event) {
		var start = document.querySelector("#start");
		start.innerHTML = "Zaženi stroboskop";
		ustavi = true;
		start.removeEventListener('click', stop);
		start.addEventListener('click', zagon);
	}
	
	var zagon = function(event) {
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		minCas = 1000;
		maxCas = 1000;
		spremeniBarvo(0);
		
		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', stop);
	}
	
	document.querySelector("#start").addEventListener('click', zagon);
	
});