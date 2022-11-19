document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("myBtn").addEventListener("click", myFunction);
    document.getElementById("number").addEventListener("keypress", myFunctionEnter);
    document.getElementById("btnNew").addEventListener("click", newGame);
    document.getElementById("btnFin").addEventListener("click", Rendirse);
    selectionarNuevoNumero();
});

validArray = [1,2,3,4,5,7,8,9,0]

function Rendirse() {
    console.log('Rendirse')
    number_define = getNumero()
    elemento = document.getElementById("numero_adivinar");
    elemento.innerHTML = number_define
}

function newGame() {
    console.log('nuevo juego')
    // seleccionar nuevo numero
    selectionarNuevoNumero()
    number_define = getNumero()
    elemento = document.getElementById("numero_adivinar");
    elemento.innerHTML = 'XXXX'
    // clean history 
    clearHistory()
}

function selectionarNuevoNumero() {
    arraySuffle = shuffle(validArray)
    text = [
        arraySuffle[0], 
        arraySuffle[1], 
        arraySuffle[2], 
        arraySuffle[3], 
    ].join('');
    elemento = document.getElementById("numero_adivinar_oculto");
    elemento.innerHTML = text 
}

function getNumero() {
    elemento = document.getElementById("numero_adivinar_oculto");
    return elemento.textContent 
}

function clearHistory() {
    turno = document.getElementById("numero_turno_oculto");
    turno.innerHTML = 0 

    element = document.getElementById("history")
    deleteChild(element)
}

function deleteChild(element) { 
    var child = element.lastElementChild;  
    while (child) { 
        element.removeChild(child); 
        child = element.lastElementChild; 
    } 
} 

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

function myFunctionEnter(e){
    if (e.key === 'Enter') {
        myFunction()
    }
}

function myFunction() {
    current_number = document.getElementById("number").value;
    valid = validNumber(current_number)
    if (valid) {
        turno = nuevoTurno()
        number_define = getNumero()
        response = check_configuration(number_define, current_number)
        agregarHistory(turno, current_number, response[0], response[1])
    }
    document.getElementById('number').value = ''
}
    
function validNumber(current_number) {
    if (!current_number) {
        return false
    } else if (isNaN(current_number)) {
        return false
    } else if (chkRepeat(current_number)) {
        return false
    } else if (current_number.length!==4) {
        return false
    }

    
    return true
}

function chkRepeat(word) {
    var wordLower = word.toLowerCase();
    var wordSet = new Set(wordLower);
    var lenWord = wordLower.length;
    var lenWordSet =wordSet.size;

    if (lenWord === lenWordSet) {
        return false
    } else {
        return true
    }
}

function check_configuration(number_define, current_number) {
    response = [0, 0]    // [F, P]
    for (var i = 0; i < number_define.length; i++) {
        if (number_define[i] == current_number[i]) {
            response[0] = response[0] + 1
        }
    }
    for (var i = 0; i < number_define.length; i++) {
        if (current_number.includes(number_define[i])) {
            response[1] = response[1] + 1
        }
    }
    response[1] = response[1] - response[0]
    return response
}


function nuevoTurno() {
    elemento = document.getElementById("numero_turno_oculto");
    turno = elemento.textContent 
    turno = parseInt(turno) + 1
    elemento.innerHTML = turno 
    return turno
}

function agregarHistory(indice, value, fijas, picas) {
    var node_tr = document.createElement("tr");                 // Create a <tr> node
    var node_td1 = document.createElement("td");                 // Create a <tr> node
    var node_td2 = document.createElement("td");                 // Create a <tr> node
    var node_td3 = document.createElement("td");                 // Create a <tr> node
    var node_td4 = document.createElement("td");                 // Create a <tr> node
    
    node_td1.appendChild(document.createTextNode(indice));           // Create a text node
    node_td2.appendChild(document.createTextNode(value));           // Create a text node
    node_td3.appendChild(document.createTextNode(picas));           // Create a text node
    node_td4.appendChild(document.createTextNode(fijas));           // Create a text node

    node_tr.appendChild(node_td1);                              // Append the text to <li>
    node_tr.appendChild(node_td2);                              // Append the text to <li>
    node_tr.appendChild(node_td3);                              // Append the text to <li>
    node_tr.appendChild(node_td4);                              // Append the text to <li>
    document.getElementById("history").appendChild(node_tr);    // Append <li> to <ul> with id="myList"
}