class Granos {
    constructor(app, tipo, pos) {
        this.app = app;
        this.tipo = tipo;
        this.pos = pos;
        
        this.img = ""

        switch(this.tipo){
            case 0:
                this.img = app.loadImage("./img/grano1.png");
            break;
        
            case 1:
                this.img = app.loadImage("./img/grano2.png");
            break;

            case 2:
                this.img = app.loadImage("./img/grano3.png");
            break;
        }

        switch (this.pos){
            case 0:
                this.x = this.app.random(480,710);
                this.y = this.app.random(343,600);
                
            break;

            case 1:
                this.x = this.app.random(415,700);
                this.y = this.app.random(655,680);
            break;
        }

        this.mostrar = true;
    }

    pintar(){
        if(this.mostrar){
            this.app.fill(255,0,0);
            this.app.imageMode(this.app.CENTER);
            this.app.image(this.img,this.x,this.y, 15,15);
        }
    }

    getX (){
        return this.x;
    }

    getY (){
        return this.y;
    }

    getTipo (){
        return this.tipo;
    }

    getMostrar(){
        return this.mostrar;
    }
    setMostrar(e){
        this.mostrar = e;
    }


}