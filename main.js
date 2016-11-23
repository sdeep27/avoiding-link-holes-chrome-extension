//creating modal box
elMainDiv = document.createElement("div")
elMainDiv.id = "mslh_box"
elSpan = document.createElement("span")
elSpan.className = "mslh_text"
elSpan.textContent = "Take a second. Continue?"
elMainDiv.appendChild(elSpan)
elButtons = document.createElement("div")
elButtons.className = "mslh_buttons"
elNo = document.createElement("button")
elNo.id = "mslh_no"
elNo.textContent = "No thanks"
elYes = document.createElement("button")
elYes.id = "mslh_yes"
elYes.onclick = "#"
elYes.textContent = "Yes, I must"
elButtons.appendChild(elNo)
elButtons.appendChild(elYes)
elMainDiv.appendChild(elButtons)
document.body.insertBefore(elMainDiv, document.body.childNodes[0])

//storing all the links in nodelist
var links = document.getElementsByTagName("a")
//converting nodelist to array
var arrLinks = Array.prototype.slice.call(links)
//storing all hrefs in array
var oldLinks = []
for (let i = 0; i < links.length; i++){
	var indLink = links[i].getAttribute("href")
	oldLinks.push(indLink)}

function modalPop (e) {
	linkIndex = arrLinks.indexOf(this)
	var box = document.getElementById("mslh_box")
	box.style.display = "block"
	box.style.top = e.clientY + "px"
	box.style.left = e.clientX + "px"
	document.getElementById("mslh_yes").setAttribute("onclick", "location.href="+"'"+oldLinks[linkIndex]+"'")
	//defining variables for motivational message on clicking no
	var congrats = document.createElement("p")
	congrats.className = "mslh_congrats"
	var motivational = ["Self-Control", "Discipline", "Focus", "Concentration", "Goals"]
	function noModal (e) {
	    document.getElementById("mslh_box").style.display = "none";
	    document.body.insertBefore(congrats, document.body.childNodes[1])
		congrats.textContent = motivational[Math.floor(Math.random()*motivational.length)] + " +1"
		congrats.style.top = e.clientY + "px"
		congrats.style.left = e.clientX + "px"
		//setting opacity for use with fadeOut of text
		var opacity = 1;
		congrats.style.color = "rgba(255,0,0," + opacity + ")"
		congrats.style.backgroundColor = "rgba(255,255,255," + opacity + ")"
		var startTime = new Date().getTime()
	    function fadeOut () {
	    	var currTime = new Date().getTime();
	    	var newOpacity = (1 - (currTime - startTime)/1000 * 0.5);
	    	congrats.style.color = "rgba(255,0,0," + newOpacity + ")"
	    	congrats.style.backgroundColor = "rgba(255,255,255," + newOpacity + ")"
	    	if (newOpacity > 0) {
	    		window.requestAnimationFrame(fadeOut)
	    	}
	    	else {
	    		congrats.style.display = "none"
	    	}
		}
		setTimeout(fadeOut, 500)

	}
	document.getElementById("mslh_no").addEventListener("click", noModal)
}
//add event listener to each link and change all links to void so they simply open up box
for (let i = 0; i < links.length; i++){
	links[i].addEventListener("click", modalPop)
	links[i].setAttribute("href", "javascript:void(0);")
	if (links[i].hasAttribute("data-outbound-url")){
		links[i].setAttribute("data-outbound-url", "javascript:void(0);")}
}	

