class Logica {
    constructor(app) {
        this.app = app;
        this.app.createCanvas(1200, 700);

        //Variables Generales
        this.estado = "inicio";
        this.fuente = this.app.loadFont("./fonts/Quicksand-Bold.ttf");
        this.segundosEmpezar = 0;
        this.minutosEmpezar = 0;
        this.empezar = 3;
        this.juego = 30;
        this.mili = 0;

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

    }

    pintar() {
        switch (this.estado) {
            case "inicio":
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
                break;

            case "nombres":
                this.app.imageMode(this.app.CORNER);
                this.app.image(this.pantallas[1], 0, 0);

                this.app.imageMode(this.app.CENTER);
                this.app.image(this.btns.nextH, 589, 521);

                let usUn = "";
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
                }

                this.app.textFont(this.fuente);
                this.app.fill(226, 204, 186);
                this.app.textSize(30);
                this.app.textAlign(this.app.CENTER);
                this.app.text(this.user[0], 377, 360)
                this.app.text(this.user[1], 810, 357)
                break;

            case "tiempoUno":
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
                    this.empezar = 3;
                    this.userJugado[0] = true;
                    for (let i = 0; i < 25; i++) {
                        this.granos[i] = new Granos(this.app, Math.round(Math.random() * 2), Math.round(Math.random() * 1));
                        console.log(this.granos[i].getTipo());
                    }
                    this.estado = "juego";
                }
                break;

            case "juego":
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
                this.app.text(this.userJugado[0] + this.userJugado[1], 500, 250);

                this.app.textAlign(this.app.LEFT);
                this.app.textSize(20);
                this.app.text(this.puntosA, 628, 72);
                this.app.text(this.puntosB, 795, 72);
                this.app.text(this.puntosC, 965, 72);
                this.app.text(this.puntosD, 1126, 72);

                for (let i = 0; i < 25; i++) {
                    this.granos[i].pintar();
                }

                if (tiempo <= 0) {
                    if (this.userJugado[0] == true && this.userJugado[1] == false) {
                        this.punt[0] = this.puntosA + this.puntosB + this.puntosC + this.puntosD;
                        this.estado = "tiempoDos";
                    } else if (this.userJugado[0] == true && this.userJugado[1] == true) {
                        this.punt[1] = this.puntosA + this.puntosB + this.puntosC + this.puntosD;
                        console.log(this.punt[0] + " : " + this.punt[1]);
                        this.estado = "puntuacion"
                    }
                    this.mili = 0;
                    this.segundosEmpezar = 0;
                    this.minutosEmpezar = 0;
                }

                break;

            case "tiempoDos":
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
                    this.empezar = 3;
                    this.juego = 30
                    ;
                    this.userJugado[1] = true;
                    this.granos = [];
                    for (let i = 0; i < 25; i++) {
                        this.granos[i] = new Granos(this.app, Math.round(Math.random() * 2), Math.round(Math.random() * 1));
                        console.log(this.granos[i].getTipo());
                    }
                    this.puntosA = 0;
                    this.puntosB = 0;
                    this.puntosC = 0;
                    this.puntosD = 0;
                    this.estado = "juego";
                }
                break;


            case "puntuacion":
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

        switch (this.estado) {
            case "inicio":
                if (this.app.mouseX >= 989 && this.app.mouseX <= 1164 && this.app.mouseY >= 608 && this.app.mouseY <= 680) {
                    this.estado = "nombres";
                }
                break;

            case "nombres":
                //Cambiar nombre de jugador 1
                if (this.app.mouseX >= 296 && this.app.mouseX <= 461 && this.app.mouseY >= 275 && this.app.mouseY <= 299) {
                    this.user[0] = "";
                    let usUn = "";
                    if (this.user[0] == '') {
                        usUn = prompt("¿Cual es el nombre del jugador 1?");
                        this.user[0] = usUn;
                        usUn = "";
                    }
                }

                if (this.app.mouseX >= 727 && this.app.mouseX <= 895 && this.app.mouseY >= 275 && this.app.mouseY <= 299) {
                    this.user[1] = "";
                    let usDo = "";
                    if (this.user[1] == '') {
                        usDo = prompt("¿Cual es el nombre del jugador 2?");
                        this.user[1] = usDo;
                        usDo = "";
                    }
                }

                if (this.app.mouseX >= 484 && this.app.mouseX <= 676 && this.app.mouseY >= 532 - 50 && this.app.mouseY <= 595 - 50) {
                    this.estado = "tiempoUno";
                }
                break;

            case "juego":
                for (let i = 0; i < 25; i++) {
                    if (this.app.dist(this.granos[i].getX(), this.granos[i].getY(), this.app.mouseX, this.app.mouseY) < 10) {
                        if (this.granos[i].getTipo() == 0) {
                            this.puntosA += 1;
                        }
                        if (this.granos[i].getTipo() == 1) {
                            this.puntosB += 1;
                        }
                        if (this.granos[i].getTipo() == 2) {
                            this.puntosC += 1;
                        }
                        this.granos[i].setMostrar(false);
                    }
                }
                break;

            case "puntuacion":
                if (this.app.mouseX >= 484 && this.app.mouseX <= 676 && this.app.mouseY >= 532 - 50 && this.app.mouseY <= 595 - 50) {
                    this.estado = "inicio";
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
}