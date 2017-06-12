var notes = [];

function newBlock() {
	var rand = Math.floor(Math.random() * (10 + 10) - 10);

	var obj = {
		text: "",
		top: 0,
		left: 0,
		color: "yellow",
		angle: rand
	}

	notes.push(obj);
	saveData(notes);
	render();
}

function render() {
	var holder = document.getElementById('holder');
	holder.innerHTML = "";

	if(notes){
		notes.map(function( item, index ) {
			var block = document.createElement('div');
			block.className = 'block';

			block.textContent = item.text;

			var rotate = "rotate(" + item.angle + "deg)";
			block.style.webkitTransform = rotate;

			block.style.top = item.top + "px";
			block.style.left = item.left + "px";

			block.style.background = item.color;

			var editArea = document.createElement('div');
			editArea.className = 'editArea hide';

			var inp = document.createElement('textarea');
			inp.placeholder = "Your text here...";
			inp.textContent = item.text;
			inp.className = 'inp';

			var saveBtn = document.createElement('button');
			saveBtn.textContent = "Save note";
			saveBtn.className = 'saveBtn';

			editArea.appendChild(inp);
			editArea.appendChild(saveBtn);

			block.appendChild(editArea);

			var iks = document.createElement('div');
			iks.className = 'iks';

			iks.onclick = function() {
				notes.splice(index, 1);
				saveData(notes);
				render();
			}

			block.appendChild(iks);

			var colorBlock = document.createElement('div');
			colorBlock.className = 'colorBlock';

			colorBlock.onclick = function() {

				switch(item.color) {
					case 'yellow': item.color = 'cyan'; break;
					case 'cyan': item.color = 'pink'; break;
					case 'pink': item.color = 'lime'; break;
					default: item.color = 'yellow';
				}

				saveData(notes);
				render();
			}

			block.appendChild(colorBlock);

			var deltaX;
			var deltaY;

			block.onmousedown = function(e) {
				e.preventDefault();
				
				deltaX = e.pageX - block.offsetLeft;
				deltaY = e.pageY - block.offsetTop;

				window.addEventListener("mousemove", moveDiv);
			}

			function moveDiv(e) {
				var pX = e.pageX - deltaX;
				var pY = e.pageY - deltaY;

				block.style.left = pX + "px";
				block.style.top = pY + "px";
			}

			block.onmouseup = function (e) {
				window.removeEventListener("mousemove", moveDiv);
				item.top = parseInt(block.style.top);
				item.left = parseInt(block.style.left);
				saveData(notes);
			}

			var hint = document.createElement('div');
			hint.textContent = "Double click to edit";
			hint.className = 'hint';
			block.appendChild(hint);

			holder.appendChild(block);

			block.ondblclick = function() {
				editArea.classList.remove('hide');
				hint.classList.add('hide');
				inp.focus();
			}

			saveBtn.onclick = function() {
				item.text = inp.value;
				block.textContent = inp.value;
				editArea.classList.add('hide');
				saveData(notes);
				render();
			}
		})
	}
	console.log(notes);
	saveData(notes);
}

function saveData(arr) {
	var finalArr = JSON.stringify(arr);
	localStorage.notesData = finalArr;
}

function getData() {
	var storedArr = localStorage.notesData;
	var arr = JSON.parse(storedArr);
	return arr;
}

window.onload = function() {
	if(localStorage.notesData) {
		var arr = getData();
		notes = arr;
		render();
	}
}

document.getElementById('btn').onclick = newBlock;