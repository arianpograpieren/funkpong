input.onButtonEvent(Button.A, input.buttonEventValue(ButtonEvent.Click), function () {
    if (bar_x > 0) {
        Platzhalter += -1
    }
})
input.onButtonEvent(Button.B, input.buttonEventValue(ButtonEvent.Click), function () {
    if (status == 0) {
        radio.sendValue("go", 11)
        direction_y = -1
        direction_x = 1
        x = 3
        y = 3
        led.plot(0, 0)
        status = 1
    }
    if (bar_x < 3) {
        bar_x = 1
    }
})
let y = 0
let x = 0
let direction_x = 0
let direction_y = 0
let Platzhalter = 0
let bar_x = 0
let status = 0
status = 0
basic.pause(1000)
basic.forever(function () {
    if (status == 1) {
        basic.pause(500)
        y += direction_y
        x += direction_x
        if (x < 0 || x > 4) {
            direction_x = direction_x * -1
            x += direction_x
            x += direction_x
        }
        if (y > 3) {
            if (x + direction_x * -1 == bar_x || x + direction_x * -1 == bar_x + 1) {
                direction_y = direction_y * -1
                y += direction_y
                y += direction_y
            } else {
                status = 3
                radio.sendValue("lost", 137)
            }
        } else if (y == -1) {
            direction_x = direction_x * -1
            x += direction_x
            if (x < 0 || x > 4) {
                direction_x = direction_x * -1
                x += direction_x
                x += direction_x
            }
            x += -4
            x = x * -1
            radio.sendValue("x.toString()", direction_x)
        }
        for (let index = 0; index <= 4; index++) {
            for (let indey = 0; indey <= 4; indey++) {
                led.unplot(index, indey)
            }
        }
        led.plot(x, y)
        led.plot(bar_x, 0)
        led.plot(bar_x + 1, 0)
    } else if (status == 2) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (status == 3) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
})
