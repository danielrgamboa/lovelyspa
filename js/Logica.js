class Logica {
    constructor(app) {
        this.app = app;
        this.app.createCanvas(1200, 700);

        //Variables Generales
        this.estado = "inicio";
        this.est = 0;
        this.fuente = this.app.loadFont("./fonts/Quicksand-Bold.ttf");
        this.segundosEmpezar = 0;
        this.minutosEmpezar = 0;
        this.empezar = 5;
        this.juego = 30;
        this.mili = 0;
        this.error = false;
        this.quitarError = 1;

        //sonidos
        this.app.soundFormats('mp3', 'wav');
        this.mmm = app.loadSound('./sounds/mmm.mp3')
        this.auch = app.loadSound('./sounds/auch.wav')
        this.fondo = app.loadSound('./sounds/Waterfall.mp3');
        this.alarma = app.loadSound('./sounds/alarma.wav');
        this.fondoSonando = true;

        //pantallas
        this.pantallas = [];
        this.pantallas[0] = app.loadImage("./img/PantallaUno.png");
        this.pantallas[1] = app.loadImage("./img/jugUno.png");
        this.pantallas[2] = app.loadImage("./img/tiempo.png");
        this.pantallas[3] = app.loadImage("./img/juego.png");
        this.pantallas[4] = app.loadImage("./img/top.png");

        //imagenes Usuarios
        this.userImages = [];
        this.userImages[0] = app.loadImage("./img/user1.png");
        this.userImages[1] = app.loadImage("./img/user2.png");

        //Flores
        this.florBlanca = [];
        this.florAmarilla = [];

        for (let i = 0; i < 7; i++) {
            this.florBlanca[i] = app.loadImage("./img/FlorBlanca.png");
        }

        for (let i = 0; i < 5; i++) {
            this.florAmarilla[i] = app.loadImage("./img/FlorAmarilla.png");
        }

        //Cargar Granos
        this.granos = [];

        //Botones
        this.btns = {};
        this.btns.play = app.loadImage("./img/Play.png");
        this.btns.playH = app.loadImage("./img/PlayH.png");
        this.btns.nextH = app.loadImage("./img/NextH.png");
        this.btns.cont = app.loadImage("./img/Inicio.png")

        //Control de usuarios
        this.user = [];
        this.user[0] = "";
        this.user[1] = "";
        this.userJugando = "";
        this.userJugado = [];
        this.userJugado[0] = false;
        this.userJugado[1] = false;

        //Control de puntos
        this.punt = [];
        this.punt[0] = 0;
        this.punt[1] = 0;

        this.puntosA = 0;
        this.puntosB = 0;
        this.puntosC = 0;
        this.puntosD = 0;
        this.ganador = "";

        //textos
        this.contador = 0;
        this.escribirUno = false;
        this.escribirDos = false;
        this.usUn = "";
        this.usDo ="";

    }

    pintar() {

        switch (this.est) {
            case 0:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[0], 0, 0);

                this.app.imageMode(this.app.CENTER);
                this.app.image(this.florBlanca[0], 62, 71);
                this.app.image(this.florBlanca[1], 228, 236);
                this.app.image(this.florBlanca[2], 234, 590);
                this.app.image(this.florBlanca[3], 492, 430);
                this.app.image(this.florBlanca[4], 690, 399);
                this.app.image(this.florBlanca[5], 1059, 211);
                this.app.image(this.florBlanca[6], 865, 372);

                this.app.image(this.florAmarilla[0], 362, 395);
                this.app.image(this.florAmarilla[1], 7896, 228);
                this.app.image(this.florAmarilla[2], 1121, 495);
                this.app.image(this.florAmarilla[3], 894, 631);
                this.app.image(this.florAmarilla[4], 936, 118);

                if (this.app.mouseX >= 989 && this.app.mouseX <= 1164 && this.app.mouseY >= 608 && this.app.mouseY <= 680) {
                    this.app.image(this.btns.playH, 1071, 658);
                } else {
                    this.app.image(this.btns.play, 1071, 658);
                }

                //Suena la cancion de fondo
               /* if (this.fondo) {
                    this.fondo.play();
                    this.fondoSonando = false;
                }*/
                break;

            case 1:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[1], 0, 0);

                this.app.imageMode(this.app.CENTER);
                this.app.image(this.btns.nextH, 589, 521);

                /*let usUn = "";
                let usDo = "";
                if (this.user[0] == '') {
                    usUn = prompt("¿Cual es el nombre del jugador 1?");
                    this.user[0] = usUn;
                    usUn = "";
                }
                if (this.user[1] == '') {
                    usDo = prompt("¿Cual es el nombre del jugador 2?");
                    this.user[1] = usDo;
                    usDo = "";
                }*/

                this.app.textFont(this.fuente);
                this.app.fill(226, 204, 186);
                this.app.textSize(30);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.user[0], 377, 360)
                this.app.text(this.user[1], 810, 357)
                break;

            case 2:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[2], 0, 0);
                this.userJugando = this.user[0];

                setInterval(this.tiempoEmpezar(), 1000);
                var tiempo = this.empezar - this.segundosEmpezar;

                this.app.textFont(this.fuente);
                this.app.fill(226, 204, 186);
                this.app.textSize(30);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.user[0], 600, 320)
                this.app.textSize(20);
                this.app.text("El juego empieza en", 610, 355);
                this.app.textSize(30);
                this.app.text(tiempo, 605, 395);

                if (tiempo <= 0) {
                    this.mili = 0;
                    this.segundosEmpezar = 0;
                    this.minutosEmpezar = 0;
                    this.juego = 30;
                    this.empezar = 5;
                    this.userJugado[0] = true;
                    for (let i = 0; i < 25; i++) {
                        this.granos[i] = new Granos(this.app, Math.round(Math.random() * 3), Math.round(Math.random() * 1));
                        console.log(this.granos[i].getTipo());
                    }
                    this.est = 3;
                }
                break;

            case 3:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[3], 0, 0);

                if (this.userJugado[0] == true && this.userJugado[1] == false) {
                    this.app.image(this.userImages[0], 0, 0);
                }
                if (this.userJugado[0] == true && this.userJugado[1] == true) {
                    this.app.image(this.userImages[1], 0, 0);
                }

                this.app.image(this.pantallas[4], 0, 0);

                setInterval(this.tiempoEmpezar(), 1000);
                var tiempo = this.juego - this.segundosEmpezar;
                this.app.textFont(this.fuente);
                this.app.fill(78, 46, 20);
                this.app.textAlign(this.app.CENTER);
                this.app.textSize(30);
                this.app.text(tiempo + " segundos", 280, 96);
                this.app.textAlign(this.app.LEFT);
                this.app.text(this.userJugando, 180, 43);
                if (this.error) {
                    this.app.tint(255, 0, 0, 50);
                    var tiempoTint = this.quitarError - this.segundosEmpezar;
                    console.log(tiempoTint + " : ");

                    if (tiempoTint <= 0) {
                        this.error = false;
                        console.log(this.error + " : ");
                    }
                } else {
                    this.app.noTint();
                }
                //this.app.text(this.userJugado[0] + this.userJugado[1], 500, 250);
                this.app.textAlign(this.app.LEFT);
                this.app.textSize(20);
                this.app.text(this.puntosA, 628, 72);
                this.app.text(this.puntosB, 795, 72);
                this.app.text(this.puntosC, 965, 72);
                this.app.text(this.puntosD, 1126, 72);

                for (let i = 0; i < this.granos.length; i++) {
                    this.granos[i].pintar();
                }
                console.log(this.granos.length);

                if (tiempo <= 0) {
                    if(this.alarma){
                        this.alarma.play();
                    }
                    if (this.userJugado[0] == true && this.userJugado[1] == false) {
                        this.punt[0] = (this.puntosA * 1) + (this.puntosB * 2) + (this.puntosC * 3) - (this.puntosD * 2);
                        this.est = 4;
                    } else if (this.userJugado[0] == true && this.userJugado[1] == true) {
                        this.punt[1] = (this.puntosA * 1) + (this.puntosB * 2) + (this.puntosC * 3) - (this.puntosD * 2);
                        console.log(this.punt[0] + " : " + this.punt[1]);
                        this.est = 5;
                    }
                    this.mili = 0;
                    this.segundosEmpezar = 0;
                    this.minutosEmpezar = 0;
                }

                break;

            case 4:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[2], 0, 0);
                this.userJugando = this.user[1];

                setInterval(this.tiempoEmpezar(), 1000);
                var tiempo = this.empezar - this.segundosEmpezar;

                this.app.textFont(this.fuente);
                this.app.fill(226, 204, 186);
                this.app.textSize(30);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.user[1], 600, 320)
                this.app.textSize(20);
                this.app.text("El juego empieza en", 610, 355);
                this.app.textSize(30);
                this.app.text(tiempo, 605, 395);

                if (tiempo <= 0) {
                    this.mili = 0;
                    this.segundosEmpezar = 0;
                    this.minutosEmpezar = 0;
                    this.empezar = 5;
                    this.juego = 30;
                    this.userJugado[1] = true;
                    this.granos = [];
                    for (let i = 0; i < 25; i++) {
                        this.granos[i] = new Granos(this.app, Math.round(Math.random() * 3), Math.round(Math.random() * 1));
                        console.log(this.granos[i].getTipo());
                    }
                    this.puntosA = 0;
                    this.puntosB = 0;
                    this.puntosC = 0;
                    this.puntosD = 0;
                    this.est = 3;
                }
                break;


            case 5:
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[2], 0, 0);
                this.app.textFont(this.fuente);
                this.app.fill(226, 204, 186);
                this.app.textSize(28);
                this.app.textAlign(this.app.CENTER);

                if (this.punt[0] > this.punt[1]) {
                    this.ganador = this.user[0];
                    this.app.text("El ganador es", 600, 320)
                    this.app.textSize(35);
                    this.app.text(this.ganador, 610, 365);
                    this.app.textSize(12);
                    this.app.text(this.punt[0] + " puntos", 605, 395);
                }
                if (this.punt[0] < this.punt[1]) {
                    this.ganador = this.user[1];
                    this.app.text("El ganador es", 600, 320)
                    this.app.textSize(35);
                    this.app.text(this.ganador, 610, 365);
                    this.app.textSize(12);
                    this.app.text(this.punt[1] + " puntos", 605, 395);
                }
                if (this.punt[0] == this.punt[1]) {
                    this.ganador = "Empate";
                    this.app.text("El ganador es", 600, 320)
                    this.app.textSize(35);
                    this.app.text(this.ganador, 610, 365);
                    this.app.textSize(12);
                    this.app.text(this.punt[0] + " puntos", 605, 395);
                }

                this.app.imageMode(this.app.CENTER);
                this.app.image(this.btns.cont, 589, 521);
                break;
        }
    }

    click() {
        console.log(this.app.mouseX + " : " + this.app.mouseY);

        switch (this.est) {
            case 0:
                if (this.app.mouseX >= 989 && this.app.mouseX <= 1164 && this.app.mouseY >= 608 && this.app.mouseY <= 680) {
                    this.est = 1;
                }
                break;

            case 1:
                //Cambiar nombre de jugador 1
                if (this.app.mouseX >= 254 && this.app.mouseX <= 493 && this.app.mouseY >= 318 && this.app.mouseY <= 372) {
                    this.escribirUno = true;
                } else {
                    this.escribirUno = false;
                }

                if (this.app.mouseX >= 686 && this.app.mouseX <= 924 && this.app.mouseY >= 318 && this.app.mouseY <= 372) {
                    this.escribirDos = true;
                } else {
                    this.escribirDos = false;
                }
                

                if (this.app.mouseX >= 484 && this.app.mouseX <= 676 && this.app.mouseY >= 532 - 50 && this.app.mouseY <= 595 - 50) {
                    this.est = 2;
                }
                break;

            case 3:
                for (let i = 0; i < this.granos.length; i++) {
                    if (this.app.dist(this.granos[i].getX(), this.granos[i].getY(), this.app.mouseX, this.app.mouseY) < 10) {
                        if (this.granos[i].getTipo() == 0) {
                            this.puntosC += 1;
                            this.granos.push(new Granos(this.app, Math.round(Math.random() * 3), Math.round(Math.random() * 1)));

                            if (this.mmm) {
                                this.mmm.play();
                            }
                        }
                        if (this.granos[i].getTipo() == 1) {
                            this.puntosB += 1;
                            this.granos.push(new Granos(this.app, Math.round(Math.random() * 3), Math.round(Math.random() * 1)));
                            if (this.mmm) {
                                this.mmm.play();
                            }
                        }
                        if (this.granos[i].getTipo() == 2) {
                            this.puntosA += 1;
                            this.granos.push(new Granos(this.app, Math.round(Math.random() * 3), Math.round(Math.random() * 1)));
                            if (this.mmm) {
                                this.mmm.play();
                            }
                        }

                        if (this.granos[i].getTipo() == 3) {
                            this.puntosD += 1;
                            this.granos.push(new Granos(this.app, Math.round(Math.random() * 3), Math.round(Math.random() * 1)));
                            this.error = true;
                            if (this.auch) {
                                this.auch.play();
                            }
                        }
                        this.granos[i].setMostrar(false);
                    }
                }
                break;

            case 5:
                if (this.app.mouseX >= 484 && this.app.mouseX <= 676 && this.app.mouseY >= 532 - 50 && this.app.mouseY <= 595 - 50) {
                    this.est = 0;
                    this.user[0] = "";
                    this.user[1] = "";
                    this.userJugando = "";
                    this.userJugado[0] = false;
                    this.userJugado[1] = false;
                    this.punt[0] = 0;
                    this.punt[1] = 0;

                    this.puntosA = 0;
                    this.puntosB = 0;
                    this.puntosC = 0;
                    this.puntosD = 0;
                    this.ganador = "";

                    this.segundosEmpezar = 0;
                    this.minutosEmpezar = 0;
                    this.empezar = 3;
                    this.juego = 30;
                    this.mili = 0;

                    this.granos = [];
                }
                break;
        }
    }



    tiempoEmpezar() {
        this.mili++;

        if (this.mili == 60) {
            this.segundosEmpezar++;
            this.mili = 0;
        }

        if (this.segundosEmpezar == 60) {
            this.minutosEmpezar++;
            this.segundosEmpezar = 0;
        }
    }

    //Funcio donde escribo en la pantalla de colocar los nombre
    texto() {
        //Opcion para escribir dentro del campo de texto del usuario 1
        if (this.escribirUno) {
            this.usUn += this.app.key;
            this.user[0] = this.usUn;
            console.log(this.usUn);
        }

        //Opcion para escribir dentro del campo de texto del usuario 2
        if (this.escribirDos) {
            this.usDo += this.app.key;
            this.user[1] = this.usDo;
            console.log(this.usDo);
        }
    }
//Funcion donde se elimna los nombres
    eliminar(){
        //Opciones para eliminar texto dentro del campo del texto del usuario 1
        if(this.app.keyCode == this.app.BACKSPACE){
            if(this.escribirUno){
                this.contador -=1;
                this.usUn = this.usUn.slice(0,-1);
                this.user[0] = this.usUn;

            }
                //Opciones para eliminar texto dentro del campo del texto del usuario 2
            if(this.escribirDos){
                this.contador -=1;
                this.usDo = this.usDo.slice(0,-1);
                this.user[1] = this.usDo;
        }
        }
    }
}