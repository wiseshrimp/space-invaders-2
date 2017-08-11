class Ammo {
  constructor (props) {
    this.context = props.context
    this.coordsCurrent = props.coordsCurrent

    this.velocity = 5
  }

  draw () {
    this.context.beginPath()
    this.context.arc(this.coordsCurrent.x, this.coordsCurrent.y - this.velocity, 3, 0, 2 * Math.PI)
    this.context.fillStyle = 'black'
    this.context.fill()

    this.context.clearRect(this.coordsCurrent.x - 3, this.coordsCurrent.y - 3, 10, 10)

    this.coordsCurrent.y -= this.velocity
  }
}
