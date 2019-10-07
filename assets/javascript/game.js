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

let characters = [];

function createCharacters() {
    const superHeros = ["Iron Man", "Super Man", "Spider Man", "Ant Man", "Thor", "Bat Man", "Hulk", "Wonder Girl", "Wasp", "Captain America", "Vision", "Black Panther", "She Hulk", "Hawkeye", "Falcon", "War Machine", "Scarlet Witch", "Nebula", "Gamora", "Rocket", "Groot", "Doctor Strange", "Wong", "Captain Marvel", "Thanos"]
    for (let i in superHeros) {
        let heroName = superHeros[i]
        let char = new Character(heroName, i * 100, i * 50, i * 100, heroName)
        characters.push(char)
        let imageDiv = $('<div>')
        imageDiv.addClass("imageTile")
        
        let firstRow = $('<div>')
        firstRow.addClass('row')
        let imagePath = "./assets/images/" + char.image + ".jpeg"
        let image = $('<img>')
        image.attr('src', imagePath)
        image.addClass('heroImage col-md-12')
        firstRow.append(image)

        let secondRow = $('<div>')
        secondRow.addClass('row')
        let title = $('<h2>')
        title.addClass('col-md-12')
        title.text(char.name)
        secondRow.append(title)

        imageDiv.append(firstRow)
        imageDiv.append(secondRow)
        imageDiv.attr("id", i);
        $("#imageScroller").append(imageDiv)
    }
    $('#imageScroller').append()
}
$(document).ready(function() {
    createCharacters()
    console.log(characters)
})