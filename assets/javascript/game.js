class Character {
    name = ""
    healthPoints = 100
    baseAttackPower = 10
    counterAttackPower = 10
    currentAttackPower = 10
    image = ""

    constructor(name, health, attack, counterAttack, image) {
        this.name = name
        this.healthPoints = health
        this.attack = attack
        this.counterAttackPower = counterAttack
        this.image = image
    }

    attack(otherCharacter) {
        otherCharacter.healthPoints -= (this.attackPower/10)
    }
}

const minimumHealth = 1
const minimumAttack = 1
const minimumCounterAttack = 1

let characters = [];
let usersPlayer = null;
let computersPlayer = null;
let isPickingUsersPlayer = true

function createCharacters() {
    "./../images/Iron Man.jpg"
    const superHeros = ["Iron Man", "Super Man", "Spider Man", "Ant Man"]
    for (let i in superHeros) {
        let heroName = superHeros[i]
        let char = new Character(heroName, 100, minimumAttack + (i * minimumAttack), minimumCounterAttack + (i * minimumCounterAttack), ("./assets/images/" + heroName + ".jpg"))   
        characters.push(char)
        $("#imageScroller").append(createImageTile(char, i))
    }
    $('#imageScroller').append()
}

function createImageTile(char, index) {
    let imageDiv = $('<div>')
    imageDiv.addClass("imageTile")
    
    let firstRow = $('<div>')
    firstRow.addClass('row')
    let imagePath = char.image
    let image = $('<img>')
    image.attr('src', imagePath)
    image.addClass('heroImage')
    firstRow.append(image)

    let secondRow = $('<div>')
    secondRow.addClass('row')
    let title = $('<h6>')
    title.addClass('imageTitle col-md-12')
    title.text(char.name)
    secondRow.append(title)

    imageDiv.append(firstRow)
    imageDiv.append(secondRow)
    imageDiv.attr("id", index);

    imageDiv.click(function(event) {
        if(isPickingUsersPlayer) {
            usersPlayer = characters[this.id];
            $('#usersPlayer').attr('src', usersPlayer.image)
            $('#characterPicker').text("Choose opponent player to continue:")
            $('#userHealth').attr('aria-valuenow', 100)
            $('#userHealth').attr('style','width:100%')
            $('#userName').text(usersPlayer.name + " (You)")
            isPickingUsersPlayer = false
        } else {
            computersPlayer = characters[this.id]
            $('#computersPlayer').attr('src', computersPlayer.image)
            $('#computerHealth').attr('aria-valuenow', 100)
            $('#computerHealth').attr('style','width:100%')
            $('#computerName').text(computersPlayer.name + " (Computer)")
            startGame()
        }
    })
    return imageDiv
}

function finishGame(winner) {
    alert(winner + ' Won!')
    $('#gameContainer').hide()
    $('#startUpContainer').show()
}

function startGame() {
}

$(document).ready(function() {
    createCharacters()
    startGame()

    $('#attackButton').click(function() {
        computersPlayer.healthPoints -= usersPlayer.attack;
        usersPlayer.healthPoints -= computersPlayer.counterAttackPower

        if (usersPlayer.healthPoints <= 0) {
            finishGame("I")
        } else if (computersPlayer.healthPoints <= 0) {
            finishGame("You")
        }

        $('#computerHealth').attr('aria-valuenow', computersPlayer.healthPoints)
        $('#computerHealth').attr('style','width:' + computersPlayer.healthPoints + '%')

        $('#userHealth').attr('aria-valuenow', usersPlayer.healthPoints)
        $('#userHealth').attr('style','width:'+usersPlayer.healthPoints+'%')
    })
})