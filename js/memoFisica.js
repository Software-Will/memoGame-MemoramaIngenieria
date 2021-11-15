let iconos = [];
let selecciones = [];
let parejasacertadas = [];

//Inicializamos siempre la funcion
generarTablero();

//Funcion cargarIconos -> Contiene un arreglo de imgs
function cargarIconos() {
  iconos = [
    '<img src="../img/fisica/fis1.png" width="100%" alt = "Fis1">',
    '<img src="../img/fisica/fis2.png" width="60%" alt = "Fis2">',
    '<img src="../img/fisica/fis3.png" width="100%" alt = "Fis3">',
    '<img src="../img/fisica/fis4.png" width="100%" alt = "Fis4">',
    '<img src="../img/fisica/fis5.png" width="100%" alt = "Fis5">',
    '<img src="../img/fisica/fis6.png" width="100%" alt = "Fis6">',
    '<img src="../img/fisica/fis7.png" width="100%" alt = "Fis7">',
    '<img src="../img/fisica/fis8.png" width="100%" alt = "Fis8">',
    '<img src="../img/fisica/fis9.png" width="100%" alt = "Fis9">',
    '<img src="../img/fisica/fis10.png" width="100%" alt = "Fis10">',
    '<img src="../img/fisica/fis11.png" width="95%" alt = "Fis11">',
    '<img src="../img/fisica/fis12.png" width="100%" alt = "Fis12">',
  ];
}

function generarTablero() {
  cargarIconos(); //LLamado de la funcion
  parejasacertadas = []; //reiniciamos el score
  let len = iconos.length; //Capturamos el numero de elementos del arreglo
  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];

  for (let i = 0; i < len * 2; i++) {
    tarjetas.push(`
          <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
              <div class="tarjeta" id="tarjeta${i}">
                  <div class="cara trasera" id="trasera${i}">
                      ${iconos[0]}
                  </div>
                  <div class="cara superior">
                      <i class="far fa-question-circle"></i>
                  </div>
              </div>
          </div>        
          `);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");  
}


function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i);
  if (tarjeta.style.transform != "rotateY(180deg)") {
    tarjeta.style.transform = "rotateY(180deg)";
    selecciones.push(i);
  }
  if (selecciones.length == 2) {
    deseleccionar(selecciones);
    selecciones = [];
  }
}

function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
    } else {
      trasera1.style.background = "plum";
      trasera2.style.background = "plum";
      //almacenamos en un array las parejas acertadas
      parejasacertadas.push(trasera1[0]);
      setPuntos();      
      //alert(parejasacertadas.length);
    }
  }, 1000);  
}

function setPuntos() {
  let score = document.getElementById("puntos");  
  score.innerHTML = parejasacertadas.length;  
}


