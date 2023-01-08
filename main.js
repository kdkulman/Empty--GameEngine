const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./player_idle.png");
ASSET_MANAGER.queueDownload("./player_idle_left.png");
ASSET_MANAGER.queueDownload("./player_running.png");
ASSET_MANAGER.queueDownload("./player_running_left.png");



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Player(gameEngine));
	
	gameEngine.init(ctx);

	gameEngine.start();
}); 
