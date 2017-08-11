class Game {
  constructor(props) {
    this.containerEl = props.containerEl
    this.activeSalmons = []
    this.hasLost = false
    this.sushiCatCount = props.sushiCatCount = 20 // Number of sushi cats
    this.sushiCats = []

    this.setCanvas()
    this.init()
  }

  addSalmon (salmon) {
    this.activeSalmons.push(salmon)
  }

  addSushiCats () {
    for (var i = 0; i < this.sushiCatCount; i++) {
      let sushiCat = new SushiCat({
        idx: i,
        containerEl: this.containerEl,
        addSalmon: this.addSalmon.bind(this),
        removeSalmon: this.removeSalmon.bind(this),
        canvas: this.canvas,
        context: this.context
      })
      this.sushiCats.push(sushiCat)
    }
  }

  check (salmon) {
    let playerBoundsX = [this.player.coordsCurrent.x, this.player.coordsCurrent.x + this.player.width]
    if (salmon.coordsCurrent.y > this.player.coordsCurrent.x && salmon.coordsCurrent.x <= playerBoundsX[1] && salmon.coordsCurrent.x >= playerBoundsX[0]) {
      this.hasLost = true
    }
  }

  init() {
    window.addEventListener('resize', this.onResize.bind(this))

    this.player = new Player({
      containerEl: this.containerEl,
      context: this.context,
      canvas: this.canvas
    })
    this.addSushiCats()
    this.draw()
  }

  draw() {
    if (!this.hasLost) {
      this.drawGame()

    } else {
      document.getElementById('lost').style.visibility = 'visible'
    }
    window.requestAnimationFrame(this.draw.bind(this))
  }

  drawGame() {
    if (this.player.isReady) {
      this.player.draw()
      if (this.player.isShooting) {
        this.context.save() //
        this.player.ammo.draw()
        this.context.restore() //
      }
    }
    this.activeSalmons.forEach(salmon => {
      this.check(salmon)
      salmon.draw()
    })
    this.sushiCats.forEach(function (cat) {
      if (cat.img) {
        cat.draw()
      }
    })
  }

  onResize () {
    this.context.canvas.height = window.innerHeight
    this.context.canvas.width = window.innerWidth
  }

  removeSalmon (salmon) {
    this.activeSalmons.forEach((active, idx) => {
      if (active.idx === salmon.idx) {
        this.activeSalmons.splice(idx, 1)
      }
    })
  }

  setCanvas () {
    let canvas = document.createElement('canvas')
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.context.globalCompositeOperation = 'destination-in'
    this.canvas.id = 'background'
    this.containerEl.appendChild(this.canvas)

    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth
  }
}
