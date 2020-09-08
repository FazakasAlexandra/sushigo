import { Mario } from './classes/Mario.js'
import { Map } from './classes/Map.js'

let canvas, context, mario, marioSpritesheet, map

export default function play(player) {
    canvas = document.getElementById('map')
    context = canvas.getContext('2d')

    start()
    function start() {
        console.log('first loaded')

        const spriteSheet = new Image()
        spriteSheet.src = player.spriteSheet 
        map = new Map(context)
        mario = new Mario(canvas,
            context,
            map.firstMap,
            spriteSheet,
            // x coordinate 
            0,
            // y coordinate
            canvas.height / 2,
            // sprite sheet width and height
            spriteSheet.width,
            spriteSheet.height,
            // frames per secound
            500,
            // number of frames
            4,
            // sprite width
            player.width,
            // sprite height
            player.height,
            // level
            player)

        document.getElementById('sushiNumbers').innerText = mario.sushi

        loop()
    }

    renderMap()

    function renderMap() {
        setInterval(() => {
            if (mario.level === 1) {
                console.log('render canvas')
                map.currentMap = map.mapModels.firstMap
                mario.currentMap = map.currentMap
                map.drawMap(map.currentMap)
            }

            if (mario.level === 2) {
                map.currentMap = map.mapModels.secondMap
                mario.currentMap = map.currentMap
                map.drawMap(map.currentMap)
            }

            if (mario.level === 3) {
                map.currentMap = map.mapModels.thirdMap
                mario.currentMap = map.currentMap
                map.drawMap(map.currentMap)
            }

        }, 1000)
    }

    function loop() {
        update()
        //context.clearRect(0, 0, canvas.width, canvas.height)
        draw()
        requestAnimationFrame(loop)
    }

    function draw() {
        mario.drawAnimated(mario.context, mario.currentFrameSet)
    }

    function update() {
        mario.update()
    }

    //mario movement
    window.addEventListener('keyup', (e) => {
        e.preventDefault()
        mario.isTouchingFlag()

        if (mario.level === 2 || mario.level === 3) {
            mario.isTouchingSushi()
        }

        if (mario.level === 3) {
            mario.isTouchingBox()
        }

        switch (e.keyCode) {
            case 39:
                mario.makeSteps('right', map, map.drawMap)
                break

            case 37:
                mario.makeSteps('left', map, map.drawMap)
                break

            case 32:
                mario.jump(map, map.drawMap)
                break
        }

    })

    //blocks default horizontal scrolling by left/right arrow keys
    window.addEventListener("keydown", function (e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
}