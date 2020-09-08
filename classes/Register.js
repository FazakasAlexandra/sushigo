import { Database } from './Database.js'
import play from '../game.js'

export class Register {
    constructor() {
        this.database = new Database()
        this.newPlayer = {
            Sushi: 0,
            Level: 1
        }
        this.icons = {
            redGirl : '../assets/icons/red-girl.png',
            alexandra : '../assets/icons/alexandra.png',
            mario : '../assets/icons/mario.png',
            charles : '../assets/icons/charles.png'
        }
        this.spriteSheets = {
            redGirl : '../assets/characters/red-girl.png',
            alexandra : '../assets/characters/alexandra.png',
            mario : '../assets/characters/mario.png',
            charles : '../assets/characters/charles.png'
        }
    }

    getIcon(){

    }

    startGame(player) {
        document.querySelector('#register-container').remove()
        document.querySelector('#map').style.display = 'block'

        play(player)
    }

    createRegisterContainer() {
        const registerContainer = document.createElement('div')
        registerContainer.id = 'register-container'
        document.body.appendChild(registerContainer)
        registerContainer.innerHTML = `<h3>create character</h3>
                                       <div id = create-container>
                                       <input type=text placeholder="name"/>
                                       <button id='create'>Create</button>
                                       </div>
                                       <div id='icons-container'>
                                       <div class="character-option">
                                       <input data-width="80" data-height="80" type="radio" name="character" value=${this.spriteSheets.redGirl}>
                                       <img src="${this.icons.redGirl}"/>
                                       </div>
                                       <div class="character-option">
                                       <input data-width="80" data-height="80" type="radio" name="character" value=${this.spriteSheets.alexandra}>
                                       <img src="${this.icons.alexandra}"/>
                                       </div>
                                       <div class="character-option"> 
                                       <input data-width="80" data-height="80" type="radio" name="character" value=${this.spriteSheets.mario}>
                                       <img src="${this.icons.mario}"/>
                                       </div>
                                       <div class="character-option">
                                       <input data-width="80" data-height="80" type="radio" name="character" value=${this.spriteSheets.charles}>
                                       <img src="${this.icons.charles}"/>
                                       </div>
                                       </div>
                                       <h4>already have a character?</h4>
                                       <div id = play-container>
                                       <input type=text placeholder="name"/>
                                       <button id='play'>PLAY</button>
                                       </div>`
        this.addCreateButtonEvent()
        this.addPlayButtonEvent()

        return registerContainer
    }

    addCreateButtonEvent() {
        document.querySelector('#create').addEventListener('click', (e) => {
            this.newPlayer.Name = e.target.previousElementSibling.value
            
            let inputs = document.querySelector('#icons-container').querySelectorAll('input')
            inputs.forEach((input)=>{
                if(input.checked){
                    this.newPlayer.spriteSheet = input.value
                    this.newPlayer.width = +input.getAttribute('data-width')
                    this.newPlayer.height = +input.getAttribute('data-height')
                }
            })

            this.database.postPlayer(this.newPlayer, this.startGame)
        })
    }

    addPlayButtonEvent() {
        document.querySelector('#play').addEventListener('click', (e) => {
            const name = e.target.previousElementSibling.value
            this.database.getPlayer(name, this.startGame)
        })
    }

}