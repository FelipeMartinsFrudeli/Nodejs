// factory design pattern
export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const posX = command.posX;
        const posY = command.posY;

        state.players[playerId] = {
            x: posX,
            y: posY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId;

        delete state.players[playerId];
    }


    function addFruit(command) {
        const fruitId = command.fruitId;
        const posX = command.posX;
        const posY = command.posY;

        state.fruits[fruitId] = {
            x: posX,
            y: posY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];
    }


    function movePlayer(command) {

        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0)
                    player.y -= 1
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height)
                    player.y += 1
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0)
                    player.x -= 1
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width)
                    player.x += 1
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed];

        if (player && moveFunction) {
            moveFunction(player);
            checkForFruitCollision(playerId);
        }
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId]
            
            if (player.x === fruit.x && player.y === fruit.y) {
                removeFruit({ fruitId: fruitId })
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        movePlayer,
        addFruit,
        removeFruit,
        state
    };
};