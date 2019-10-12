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
    const superHeros = ["Iron Man", "Super Man", "Spider Man", "Ant Man"]
    for (let i in superHeros) {
        let heroName = superHeros[i]
        let char = new Character(heroName, 100, minimumAttack + (i * minimumAttack), minimumCounterAttack + (i * minimumCounterAttack), ("./assets/images/" + heroName + ".jpeg"))   
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
    let imagePath = char.imagePath
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
            $('#usersPlayer').attr('src', "./assets/images/" + "Iron Man" + ".jpeg")
            $('#characterPicker').text("Choose opponent player to continue:")
            $('#userHealth').attr('aria-valuenow', 100)
            $('#userHealth').attr('style','width:100%')
            $('#userName').text(usersPlayer.name)
            isPickingUsersPlayer = false
        } else {
            computersPlayer = characters[this.id]
            $('#computersPlayer').attr('src', "./assets/images/" + "Iron Man" + ".jpeg")
            $('#computerHealth').attr('aria-valuenow', 100)
            $('#computerHealth').attr('style','width:100%')
            $('#computerName').text(computersPlayer.name)
            startGame()
        }
    })
    return imageDiv
}

function startGame() {
    $('#gameContainer').show()
    $('#startUpContainer').hide()
}

$(document).ready(function() {
    createCharacters()
    $('#startUpContainer').show()
    $('#gameContainer').hide()

    $('#attackButton').click(function() {
        computersPlayer.healthPoints -= usersPlayer.attack;
        usersPlayer.healthPoints -= computersPlayer.counterAttackPower

        $('#computerHealth').attr('aria-valuenow', computersPlayer.healthPoints)
        $('#computerHealth').attr('style','width:' + computersPlayer.healthPoints + '%')

        $('#userHealth').attr('aria-valuenow', usersPlayer.healthPoints)
        $('#userHealth').attr('style','width:'+usersPlayer.healthPoints+'%')
    })
})