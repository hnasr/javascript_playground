'use strict'

export class BattleField {

    constructor (){
        this.inputs = []
        this.bullets = []
        this.players = []
        this.fleets = []

    }


    start() {
        this.moveBullets();
        this.moveAliens();
        this.gc()
    }
    processInputs() {
        const uInputs = this.inputs.filter(a=>a.processed==false)
        //calculate inputs..
        uInputs.forEach(i => {i.processed = true; i.unit.move(i.data)})
    }

    addFleet(fleet) {
        this.fleets.push(fleet)
    }

    addPlayer(player) {
        this.players.push(player)
    }

    draw(){
        this.players.forEach(a=>a.draw())
        this.fleets.forEach(f=>f.draw())
        this.bullets.forEach(b=>b.draw())
    }
    shootBullet(unit) {
        if (this.bullets.length < 50){
            const b = unit.shoot()
            this.bullets.push(b)
        }
    }

    hit() {
          //if a space bullet hit an alien, alien destroyed 
          this.fleets.forEach(f=>f.aliens.forEach(a=>this.bullets.filter(a=>a.type === "space").forEach(b=>a.hit(b))))
        
          this.players.forEach(a=>this.bullets.filter(a=>a.type === "alien").forEach(b=>a.hit(b)))
  
    }

    moveBullets() {
        this.bullets.forEach(a => this.addInput( a, -1)) 
        setTimeout(()=>this.moveBullets(), 10) 
    }
  

   moveAliens() {
        this.fleets.forEach(f=>this.addInput(f, -1))
        setTimeout(()=>this.moveAliens(), 2000) 
    }
 
    
    addInput(unit, data) {
        this.inputs.push({"unit": unit, "data": data, "processed": false})
    }

     gc() {
        //clear garbage 
        this.bullets = this.bullets.filter(a=>!a.disabled)
        this.fleets.forEach(f=> {
            let disabledAliens = f.aliens.filter(a=>a.disabled)
            disabledAliens.forEach(a=>this.bullets.push(a.shoot()))
        })
        
        this.fleets.forEach(f=> f.aliens = f.aliens.filter(a=>!a.disabled))
        this.inputs = this.inputs.filter(a=>!a.processed)
        this.players = this.players.filter(a=>!a.disabled)
       
        if (this.players.length === 0)
           alert("Game over")
        else
           setTimeout(()=>this.gc(), 1000)
 
    }

}


export class SpaceShip {
        
        constructor(context) {
            this.context = context;
            const canvas = this.context.canvas;
            this.width = 150
            this.height = 30
            this.dx = 50
            this.x = canvas.width/2 - this.width/2;
            this.y = canvas.height - this.width/2;
            this.color = "green"
        }

        center () {
            //this.context.fillStyle = "red"

            //this.context.fillRect(this.x + this.width/2,this.y,5,5)
            return {x: this.x + this.width/2, y : this.y}
        }

        hit (a) {
            if ((a.x > this.x && a.x < this.x + this.width) && (a.y > this.y && a.y < this.y + this.height))
                {this.disabled = true; this.destroy(); console.log("hit")}
          
        }

        destroy() {
            this.color = "purple"
            this.draw();
        }


        draw() {
       
            const offset = 30;
            this.context.fillStyle = this.color
            
            this.context.fillRect(this.x,this.y,this.width,this.height)

            for (let i = 0; this.width - 2*offset*i > 0; i++)
                this.context.fillRect(this.x + offset*i,this.y-offset*i,this.width - 2*offset*i,offset*i)
 
        }

        shoot () {
            return new Bullet(this.context, this.center().x, this.center().y, -1, "space");
        }

        move(dir=1) { 
           
            this.x = this.x + dir * this.dx;
            if (this.x + this.width > this.context.canvas.width )
                    this.x = this.context.canvas.width - this.width - 5
                     
                
            
            if (this.x < 0){
                this.x = 0;
        
            }
                
        }

        
    }

    export class Bullet  {
      
        constructor (context, x, y, dir = -1, type="space", color = "blue") {
            this.context = context;
            this.width = 5
            this.height = 5
            this.dy = 10
            this.x =  x;
            this.y =  y;
            this.dir = dir
            this.type = type
            this.disabled = false;
            this.color= color;
        }

        draw() {
 
            this.context.fillStyle = this.color

            this.context.fillRect(this.x, this.y, this.width, this.height) 
           
        }

        move() {
            //if bullet reached end of canvas destory it.
            if (this.y - this.height < 0 || this.y + this.height > this.context.canvas.height)
                this.disabled = true
                 
            //bullets only go up.
            this.y = this.y + this.dir * this.dy
           
        }

    }

    export class AlienFleet {

          constructor(context, count) {
             this.context = context;
             this.count = count;
             this.aliens = []
             this.width = 0;
             this.height = 50;
             this.dx = 1;
             for(let i = 0; i < count; i++)
             {
                 const alien = new Alien(this.context)
                 alien.x  = alien.x +  i*(alien.width+5);
                 this.width += alien.width
                 this.aliens.push(alien)
             }
              
               
          }

          draw(){
            this.aliens.forEach(a=>a.draw())
          }

          move(){
              //one alien can't move flip the entire fleet
              if(this.aliens.some(a=>!a.trymove()))
                  this.dx = this.dx * -1;
              

              this.aliens.forEach(a=>a.move(this.dx))
          }
    }
    export class Alien {

        constructor (context) {
            this.context = context;
            const canvas = this.context.canvas;
            this.width = 50
            this.height = 20
            this.dx = 40
            this.x = canvas.width/2 - this.width/2;
            this.y = 0 + this.width;
            this.disabled = false;
            this.color = "purple"

        }

        shoot () {
            return new Bullet(this.context, this.center().x, this.center().y, 1, "alien", "purple");
        }

        hit (a) {
            if ((a.x > this.x && a.x < this.x + this.width) && (a.y > this.y && a.y < this.y + this.height))
                {this.disabled = true; this.destroy(); console.log("hit")}
          
        }


        center () {
            //this.context.fillStyle = "red"

            //this.context.fillRect(this.x + this.width/2,this.y,5,5)
            return {x: this.x + this.width/2, y : this.y}
        }

        destroy() {
            this.color = "red"
            this.draw();
        }
        draw() {
        
            this.context.fillStyle = this.color

            //this.context.fillRect(this.aXLocation , this.aYLocation - this.aHeight, this.aWidth/5, this.aHeight)
           // this.context.fillRect(this.x + this.width -this.width/5 , this.y - this.height, this.width/5, this.height)
            this.context.fillRect(this.x, this.y, this.width, this.height)
            this.context.fillRect(this.x, this.y + this.height, this.width/5, this.height)
            this.context.fillRect(this.x + this.width -this.width/5 , this.y + this.height, this.width/5, this.height)

           
        }

        trymove(dir=1) {
            //try a temp move..
            const tmpx = this.x + dir * this.dx;
            if (tmpx + this.width > this.context.canvas.width )
                return false;
        
            if (tmpx < 0)
                return false;
            
            return true;
        }

        move(dir=1) {
           
            this.x = this.x + dir * this.dx;
            return true;
        }
    }