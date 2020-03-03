function random(from, to) {
  return Math.floor(from + Math.random()*(to - from));
}
//-----------------------------------------------------PLUIE DES METIERS
class Obstacle{
  constructor(x, src, w, isGood) {
    const img = document.createElement('img');
    img.onload = () => {
      this.isLoaded=true;

      const imgRatio = img.naturalWidth/img.naturalHeight;

      this.img = img;
      this.w = w; 
      this.h= this.w/imgRatio;
      this.x = x;
      this.y = 0 - this.h;
      this.hit = false;
    }
    img.src = src;
    this.isGood = isGood;

  }

  draw(){
    if(!this.img) return;
    
    ctx.drawImage(this.img, this.x,this.y, this.w, this.h);
  }
 //---------------------------------------------------crash player with metiers
  crashwith(player) {
    var crashed= (
      (player.x+this.w >= this.x && player.x <= this.x+this.w) 
      &&
      (player.y <= this.y+this.h && player.y+this.h >= this.y)
    );
      if (crashed){
      this.hit = true;
      }
    return crashed;
  }
}