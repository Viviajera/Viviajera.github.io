// -------------------------------------------------------------player
class Consomer {
      constructor (){
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth/img.naturalHeight;
        this.w= 300;
        this.h=this.w/imgRatio; 
        this.x=900-this.w/2; 
        this.y=1600-100-this.h;
        this.speedX = 0;
        this.speedY = 0;
    }
    img.src = "images/player.png";
  }
  // -----------------------------------------------------------player speed moving
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    if (!this.img) return; 
    ctx.drawImage(this.img,this.x,this.y, this.w,this.h);
  }

  moveLeft() {
  this.x-=20;
  }
  moveRight() {
  this.x+=20;
  }
  speed(){
  this.y-=20;
  }
  moveDown(){
  this.y+=20; 
  }
}
