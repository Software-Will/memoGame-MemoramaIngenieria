let iconos = [];
let selecciones = [];
let parejasacertadas = [];

//Inicializamos siempre la funcion
generarTablero();

//Funcion cargarIconos -> Contiene un arreglo de imgs
function cargarIconos() {
  iconos = [
    '<img src="../img/math/math1.png" width="100%" alt = "Math1">',
    '<img src="../img/math/math2.png" width="100%" alt = "Math2">',
    '<img src="../img/math/math3.png" width="100%" alt = "Math3">',
    '<img src="../img/math/math4.png" width="100%" alt = "Math4">',
    '<img src="../img/math/math5.png" width="100%" alt = "Math5">',
    '<img src="../img/math/math6.png" width="100%" alt = "Math6">',
    '<img src="../img/math/math7.png" width="100%" alt = "Math7">',
    '<img src="../img/math/math8.png" width="100%" alt = "Math8">',
    '<img src="../img/math/math9.png" width="100%" alt = "Math9">',
    '<img src="../img/math/math10.png" width="100%" alt = "Math10">',
    '<img src="../img/math/math11.png" width="100%" alt = "Math11">',
    '<img src="../img/math/math12.png" width="100%" alt = "Math12">',
  ];
}

function generarTablero() {
  cargarIconos(); //LLamado de la funcion
  parejasacertadas = [] //reiniciamos el score
  let len = iconos.length; //Capturamos el numero de elementos del arreglo
  selecciones = [];
  let tablero = document.getElementById("tablero"); //capturamos el div para la inserccion
  let tarjetas = [];
  for (let i = 0; i < len * 2; i++) {
    //Generamos el tablero de acuerdo al numero de elementos -> Tambien genera el envio de argumentos a las funciones
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
          `); //Insertamos la estructura al arreglo tarjetas
    if (i % 2 == 1) {
      //Eliminamos elementos ya existentes, para evitar que se repitan
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5); //Ordena los elementos del arreglo
  tablero.innerHTML = tarjetas.join(" "); //Se imprime las tarjetas en el html <div id="tablero">
}

//Funcion que permite la rotaciond de tarjetas
function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i); //Capturamos las tarjetas seleccionadas
  if (tarjeta.style.transform != "rotateY(180deg)") {
    //Si esta boca abajo
    tarjeta.style.transform = "rotateY(180deg)"; //Dale vuelta
    selecciones.push(i); //Se inserta unicamente 2 elementos para comprobar su par ordenado
  }
  if (selecciones.length == 2) {
    //Si seleccionas 2, envia los parametros del push para comprobar el par ordenado en deseleccionar
    deseleccionar(selecciones);
    selecciones = []; //Se vacea el arreglo
  }
}

//Funcion deseleccionar que sirve para determinar si es correcta la seleccion de pares ordenados
function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
      //Si son diferentes vuelven a 0°
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
    } else {
      //Acepta el par ordenado de cartas
      trasera1.style.background = "plum";
      trasera2.style.background = "plum";
      //almacenamos en un array las parejas acertadas
      parejasacertadas.push(trasera1[0]);
      setPuntos();      
      //alert(parejasacertadas.length);
    }
  }, 1000); //Realizar todos los cambios cada 1 segundo // rotacion 0°
}

function setPuntos() {
  let score = document.getElementById("puntos");  
  score.innerHTML = parejasacertadas.length;  
}