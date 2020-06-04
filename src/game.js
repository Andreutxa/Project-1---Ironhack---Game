class Game {
    constructor (ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.player = new Player(ctx, 4, 2);
        this.enemies = [];
        this.tick = 0;

        this.mouseX;
        this.mouseY;
        this.setListeners();
    }

    setListeners() {
        document.addEventListener('mousemove', (evt) => {
            this.mouseX = evt.clientX - 25;
            this.mouseY = evt.clientY - 25;
        });
    }

    start() {
        this.intervalId = setInterval(() => {
            this._clear();
            this._draw();
            this._move();
            this._addEnemy();
        }, 1000 / 60);
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    
    _draw() {
        this.player.draw();
        this.player.update(this.mouseX, this.mouseY);

        this.enemies.forEach(enemy => {
            enemy.draw();
            enemy.update(this.player.x, this.player.y);
            enemy.attack();
          });
        
    }
    
    _addEnemy() {
        
        if (this.tick++ < 5) {
            this.enemies.push(new Enemy(ctx, 3, 1));
        }
    }
    
    _move() {
        this.player.move();
        this.enemies.forEach(enemy => {
            enemy.move()
          });
    }
    
}