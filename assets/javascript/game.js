class Character {
    name = ""
    healthPoints = 100
    attackPower = 100
    counterAttackPower = 100
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

const minimumHealth = 100
const minimumAttack = 150
const minimumCounterAttack = 75

let characters = [];
let usersPlayer = null;

function createCharacters() {
    const superHeros = ["Iron Man", "Super Man", "Spider Man", "Ant Man", "Thor", "Bat Man", "Hulk", "Wonder Girl", "Wasp", "Captain America", "Vision", "Black Panther", "She Hulk", "Hawkeye", "Falcon", "War Machine", "Scarlet Witch", "Nebula", "Gamora", "Rocket", "Groot", "Doctor Strange", "Wong", "Captain Marvel", "Thanos"]
    for (let i in superHeros) {
        let heroName = superHeros[i]
        let char = new Character(heroName, (minimumHealth+(i*100)), (minimumAttack + (i * 50)), (minimumCounterAttack + (i * 40)), heroName)
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
    let imagePath = "./assets/images/" + "Iron Man" + ".jpeg"
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
        usersPlayer = characters[this.id];
        $('#' + this.id).css({'border' : '1px blue solid'})
    })

    return imageDiv
}

$(document).ready(function() {
    createCharacters()
    console.log(characters)
})