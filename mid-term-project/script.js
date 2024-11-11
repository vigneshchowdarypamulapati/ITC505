const storyData = {
    start: {
        text: "You stand before an ancient temple hidden deep in the jungle. Its stone walls are covered in mysterious symbols and vines. The entrance beckons you forward.",
        image: "ancient_stone.jpg",
        imageAlt: "Ancient stone temple entrance with vines and mysterious carved symbols, shrouded in misty jungle atmosphere",
        choices: [
            { text: "Enter the temple cautiously", nextScene: "entrance" },
            { text: "Examine the symbols first", nextScene: "symbols" },
            { text: "Look for another way in", nextScene: "sidePath" }
        ]
    },
    entrance: {
        text: "Inside, torches mysteriously light up as you enter. You see two corridors: one leading down with the sound of running water, another leading up with a faint breeze.",
        image: "dark_temple.jpg",
        imageAlt: "Dark temple corridor with flickering torches, showing two paths - one descending and one ascending",
        choices: [
            { text: "Take the downward path", nextScene: "waterPath" },
            { text: "Take the upward path", nextScene: "windPath" }
        ]
    },
    symbols: {
        text: "The symbols appear to tell a story of an ancient treasure, but also warn of deadly traps. You notice a small hidden lever among the symbols.",
        image: "hidden_liver.jpg",
        imageAlt: "Close-up of intricate hieroglyphs and symbols carved into weathered stone, with a partially hidden lever",
        choices: [
            { text: "Pull the lever", nextScene: "secretEntrance" },
            { text: "Enter through the main entrance", nextScene: "entrance" }
        ]
    },
    sidePath: {
        text: "You discover a partially collapsed wall. It might be dangerous, but could lead to an unexplored area.",
        image: "sunlight.jpg",
        imageAlt: "Crumbling temple wall with a narrow opening, sunlight streaming through the gap",
        choices: [
            { text: "Try to squeeze through", nextScene: "treasureRoom" },
            { text: "Return to the main entrance", nextScene: "entrance" }
        ]
    },
    waterPath: {
        text: "The path leads to an underground chamber with a submerged passage and a narrow ledge around the water.",
        image: "dark_underground.jpg",
        imageAlt: "Dark underground chamber with crystal-clear water and a narrow stone ledge along the wall",
        choices: [
            { text: "Swim through the passage", nextScene: "underwaterTrap" },
            { text: "Follow the ledge", nextScene: "treasureRoom" }
        ]
    },
    windPath: {
        text: "You reach a high chamber with a rope bridge crossing a deep chasm. The bridge looks ancient but might hold.",
        image: "rope_bridge.jpg",
        imageAlt: "Ancient rope bridge spanning a misty chasm in a high-ceilinged temple chamber",
        choices: [
            { text: "Cross the bridge", nextScene: "bridgeCollapse" },
            { text: "Look for another way", nextScene: "secretPassage" }
        ]
    },
    secretEntrance: {
        text: "A hidden door opens revealing a passage lined with golden artifacts!",
        image: "hidden_passage.jpg",
        imageAlt: "Hidden passage with walls lined with golden artifacts, statues, and ancient treasures",
        choices: [
            { text: "Grab some artifacts and continue", nextScene: "curseEnding" },
            { text: "Leave the artifacts and proceed carefully", nextScene: "treasureRoom" }
        ]
    },
    secretPassage: {
        text: "You find a narrow passage behind some rocks. It seems to lead to somewhere important.",
        image: "narrow_passage.jpg",
        imageAlt: "Narrow, winding passage with mysterious carvings and distant light at the end",
        choices: [
            { text: "Crawl through the passage", nextScene: "treasureRoom" },
            { text: "Go back and try the bridge", nextScene: "bridgeCollapse" }
        ]
    },
    treasureRoom: {
        text: "You've found the legendary treasure room! Mountains of gold and jewels surround you. You carefully take some treasures and find your way out. You're rich beyond your wildest dreams! THE END",
        image: "gold_coins.jpg",
        imageAlt: "Vast chamber filled with mountains of gold coins, precious gems, and ancient artifacts",
        isEnding: true
    },
    bridgeCollapse: {
        text: "As you step onto the bridge, the ancient ropes snap! You fall into the darkness below... THE END",
        image: "bridge_break.jpg",
        imageAlt: "Dramatic scene of a breaking rope bridge over a deep, dark chasm",
        isEnding: true
    },
    underwaterTrap: {
        text: "The underwater passage was a trap! The current is too strong to swim back... THE END",
        image: "tunnel.jpg",
        imageAlt: "Underwater tunnel with strong currents and ancient mechanism revealing it as a trap",
        isEnding: true
    },
    curseEnding: {
        text: "The artifacts were cursed! As you touch them, you feel yourself turning to solid gold... THE END",
        image: "partial.jpg",
        imageAlt: "Figure partially transformed into solid gold, surrounded by cursed artifacts",
        isEnding: true
    }
};

let currentScene = 'start';

function startGame() {
    currentScene = 'start';
    updatePage();
}

function updatePage() {
    const scene = storyData[currentScene];
    document.getElementById('story-text').textContent = scene.text;
    const imageElement = document.getElementById('story-image');
    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.src = scene.image;
        imageElement.alt = scene.imageAlt;
        imageElement.style.opacity = '1';
    }, 300);

    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    if (!scene.isEnding && scene.choices) {
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.style.animationDelay = `${index * 0.15}s`;
            button.addEventListener('click', () => {
                currentScene = choice.nextScene;
                updatePage();
            });
            choicesContainer.appendChild(button);
        });
    }
    
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.style.display = scene.isEnding ? 'block' : 'none';
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        #story-image {
            transition: opacity 0.3s ease-in-out;
        }
        
        .choice-btn {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
`);

window.onload = startGame;