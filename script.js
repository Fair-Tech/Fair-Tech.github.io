const ws = new WebSocket("ws://localhost:8765"); // Replace with your server address

const statusDiv = document.getElementById("status");
let connected = false;

// Update status
ws.onopen = () => {
    connected = true;
    statusDiv.textContent = "Status: Connected";
};

ws.onclose = () => {
    connected = false;
    statusDiv.textContent = "Status: Disconnected";
};

// Listen for inputs
window.addEventListener("keydown", (event) => {
    if (connected) {
        ws.send(JSON.stringify({ type: "keyboard", key: event.key, action: "down" }));
    }
});

window.addEventListener("keyup", (event) => {
    if (connected) {
        ws.send(JSON.stringify({ type: "keyboard", key: event.key, action: "up" }));
    }
});

// Gamepad support
window.addEventListener("gamepadconnected", (event) => {
    console.log(`Gamepad connected: ${event.gamepad.id}`);
    statusDiv.textContent = `Gamepad connected: ${event.gamepad.id}`;
    
    setInterval(() => {
        const gamepad = navigator.getGamepads()[event.gamepad.index];
        if (connected && gamepad) {
            ws.send(JSON.stringify({ type: "gamepad", buttons: gamepad.buttons, axes: gamepad.axes }));
        }
    }, 50); // Send gamepad inputs every 50ms
});
