
export default function createKeyboardListener() {
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {

        for (const i in state.observers) {
            const observerFunction = state.observers[i]
            observerFunction(command);
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const command = {
            playerId: 'player1',
            keyPressed
        }
        
        //game.movePlayer(command)
        notifyAll(command)
    }

    return {
        subscribe
    }
}