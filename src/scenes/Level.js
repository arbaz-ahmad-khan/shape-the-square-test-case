
// You can write more code here
import Phaser from "phaser";
import GameManager from "../scripts/GameManager"; // import GameManager
let currentLevel = 1;
// const holeWidthRange = [49, 240];
// const wallRange = [13, 70];

/* START OF COMPILED CODE */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
		this.input.setDefaultCursor('pointer');
		this.oGameManager = new GameManager(this);

		this.holeWidthRange = this.oGameManager.holeWidthRange;
		this.wallRange = this.oGameManager.wallRange;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.scaleMode = Phaser.Scale.ScaleModes.SHOW_ALL;
		if (!localStorage.getItem('currentLevel')) {
			localStorage.setItem('currentLevel', '1');
		}
		currentLevel = localStorage.getItem('currentLevel') || 1

		const randomBgIndex = Phaser.Math.Between(0, this.oGameManager.bgImage.length - 1);
		const bgImageKey = this.oGameManager.bgImage[randomBgIndex];
		this.add.image(0, 0, bgImageKey).setOrigin(0);

		const [baseKey, topKey, holderKey, colorCodeKey] = this.oGameManager.getBackgroundKeys(bgImageKey);

		document.body.style.backgroundColor = "#" + colorCodeKey;

		this.levelHolder = this.add.image(-4, 0, holderKey).setOrigin(0);
		this.levelHolder.setScale(1, 0.7);

		this.leftSquare = this.add.sprite(0, this.sys.game.config.height, baseKey);
		this.leftSquare.setOrigin(1, 1);

		this.rightSquare = this.add.sprite(this.sys.game.config.width, this.sys.game.config.height, baseKey);
		this.rightSquare.setOrigin(0, 1);

		this.leftWall = this.add.sprite(0, this.sys.game.config.height - this.leftSquare.height, topKey);
		this.leftWall.setOrigin(1, 1);

		this.rightWall = this.add.sprite(this.sys.game.config.width, this.sys.game.config.height - this.rightSquare.height, topKey);
		this.rightWall.setOrigin(0, 1);

		this.square = this.add.sprite(this.sys.game.config.width / 2, 300, "square2");
		this.square.setOrigin(0.5);
		this.square.setScale(0.2);
		this.square.setDepth(1);
		this.square.successful = 0;

		this.squareAndLevelText();
		this.levelTextTween();
		this.updateLevel();
	}

	update() {
		this.squareText.setPosition(this.square.x, this.square.y);

	}

	squareAndLevelText() {
		this.squareText = this.add.text(this.square.x, this.square.y, (currentLevel - this.square.successful).toString(), {
			fontFamily: "pusab",
			fontSize: '260px',
			color: '#FFEDC3',
			stroke: "#000",
			strokeThickness: 20
		});
		this.squareText.setOrigin(0.5);
		this.squareText.setDepth(1);
		this.squareText.setPosition(this.square.x, this.square.y);

		this.levelText = this.add.text(540, 20, "Level " + currentLevel, {
			fontFamily: "pusab",
			fontSize: '76px',
			color: '#ffffff',
			stroke: "#000",
			strokeThickness: 10
		});
		this.levelText.setOrigin(0.5, 0);

		this.perfectSquareText = this.add.text(540, 960, "Perfect Square", {
			fontFamily: "pusab",
			fontSize: '100px',
			color: '#ffffff',
			stroke: "#000",
			strokeThickness: 10
		});
		this.perfectSquareText.setOrigin(0.5, 0.5);
		this.perfectSquareText.setVisible(false);
		this.perfectSquareText.setDepth(1);
	}

	levelTextTween() {
		this.levelText.text.split('').forEach((letter, index) => {
			this.tweens.add({
				targets: { alpha: 0 },
				alpha: 1,
				duration: 500,
				delay: index * 100,
				ease: 'Power2',
				onUpdate: (tween) => {
					this.levelText.setText(this.levelText.text.substring(0, index) + letter);
				},
				onComplete: () => {
				}
			});
		});
	}

	updateLevel() {
		this.squareText.setText((currentLevel - this.square.successful));


		const holeWidth = Phaser.Math.Between(this.holeWidthRange[0], this.holeWidthRange[1]);
		const wallWidth = Phaser.Math.Between(this.wallRange[0], this.wallRange[1]);

		this.tweens.add({
			targets: this.leftSquare,
			x: (this.sys.game.config.width - holeWidth) / 2,
			duration: 500,
			ease: "Cubic.easeOut",
		});

		this.tweens.add({
			targets: this.rightSquare,
			x: (this.sys.game.config.width + holeWidth) / 2,
			duration: 500,
			ease: "Cubic.easeOut",
		});

		this.tweens.add({
			targets: this.leftWall,
			x: (this.sys.game.config.width - holeWidth) / 2 - wallWidth,
			duration: 500,
			ease: "Cubic.easeOut",
		});

		this.tweens.add({
			targets: this.rightWall,
			x: (this.sys.game.config.width + holeWidth) / 2 + wallWidth,
			duration: 500,
			ease: "Cubic.easeOut",
		});

		this.tweens.add({
			targets: [this.square, this.squareText],
			y: 300,
			scaleX: 0.2,
			scaleY: 0.2,
			angle: 50,
			duration: 500,
			ease: "Cubic.easeOut",
			onComplete: () => {
				this.input.on("pointerdown", this.grow, this);

				this.rotateTween = this.tweens.add({
					targets: [this.square, this.squareText],
					angle: 40,
					duration: 300,
					yoyo: true,
					repeat: -1,
				});
			},
		});
	}

	grow() {
		this.input.off("pointerdown", this.grow, this);
		this.input.on("pointerup", this.stop, this);

		this.growTween = this.tweens.add({
			targets: [this.square, this.squareText],
			scaleX: 1.5,
			scaleY: 1.5,
			duration: 1500,
			// onStart: () => {
			// 	this.tweens.add({
			// 		targets: this.squareText,
			// 		scaleX: 1+(this.square.scaleX), // Scale it in proportion to the square
			// 		scaleY: 1+(this.square.scaleY), // Scale it in proportion to the square
			// 		duration: 1000,
			// 	});
			// },
		});
	}

	stop() {
		let message = "";
		let destY = 0;
		let ohNoMessages = ["Fail!", "Bad!", "Oh no!", "Try again!", "Oops!", "Whoops!", "Oh snap!", "Bad move!", "Not optimal", "Underpar"];
		let yeahMessages = ["Good!", "Excellent!", "Awesome!", "Fantastic!", "Amazing!", "Well done!", "Outstanding!", "Impressive!", "Superb!", "Top-notch!", "Terrific!"];

		let ohNoMessagePosition = { x: 540, y: 125 };
		let yeahMessagePosition = { x: 540, y: 125 };

		this.time.delayedCall(300, () => {
			if (message) {
				this.levelText.text = message;
			}
		});

		this.time.delayedCall(2000, () => {
			if (this.square.successful == currentLevel) {
				currentLevel++;
				localStorage.setItem('currentLevel', currentLevel);
				this.scene.start("Level");
				return;
			}
			if (message) {
				this.scene.start("Level");
				return;
			}
			this.updateLevel();

		});

		this.input.off("pointerup", this.stop, this);

		if (this.growTween) {
			this.growTween.stop();
		}

		if (this.rotateTween) {
			this.rotateTween.stop();

			this.rotateTween = this.tweens.add({
				targets: [this.square, this.squareText],
				angle: 0,
				duration: 300,
				ease: "Cubic.easeOut",
				onComplete: () => {
					if (this.square.displayWidth <= this.rightSquare.x - this.leftSquare.x) {
						this.fallTween = this.tweens.add({
							targets: this.square,
							y: this.sys.game.config.height + this.square.displayHeight,
							duration: 600,
							ease: "Cubic.easeIn",
							onComplete: () => {
								this.showRandomOhNoMessage(ohNoMessages, ohNoMessagePosition);
								this.gameOver();
							},
						});
					} else {
						if (this.square.displayWidth <= this.rightWall.x - this.leftWall.x) {
							const pixelDifference = Math.abs(this.square.displayWidth - (this.rightWall.x - this.leftWall.x));
							// console.log("pixelDifference: ", pixelDifference);
							if (pixelDifference <= 8) {
								// console.log("perfect");
								this.perfectSquareTween();
							}
							destY = this.sys.game.config.height - this.leftSquare.displayHeight - this.square.displayHeight / 2;
							this.square.successful++;
							this.showRandomYeahMessage(yeahMessages, yeahMessagePosition);
						} else {
							destY = this.sys.game.config.height - this.leftSquare.displayHeight - this.leftWall.displayHeight - this.square.displayHeight / 2;
							setTimeout(() => {
								this.showRandomOhNoMessage(ohNoMessages, ohNoMessagePosition);
							}, 400);
							setTimeout(() => {
								this.gameOver();
							}, 800);
						}

						this.tweens.add({
							targets: this.square,
							y: destY,
							duration: 600,
							ease: "Bounce.easeOut",
						});


					}
				},
			});
		}
	}

	showRandomOhNoMessage(messages, position) {
		this.cameras.main.shake(500, 0.003);
		const randomIndex = Phaser.Math.Between(0, messages.length - 1);
		const randomOhNoMessage = messages[randomIndex];

		this.ohNoText = this.add.text(position.x, position.y, randomOhNoMessage, {
			fontFamily: "pusab",
			fontSize: '60px',
			color: '#F7E73C',
			stroke: "#000",
			strokeThickness: 10
		});
		this.ohNoText.setOrigin(0.5, 0);
		// this.ohNoText.setTint(0xf0b6c1);
		// this.ohNoText.setDepth(1);
	}

	showRandomYeahMessage(messages, position) {
		setTimeout(() => {
			if (this.square.successful == currentLevel) {
				this.confettiForLevelComplete();
			}
		}, 500)

		const randomIndex = Phaser.Math.Between(0, messages.length - 1);
		const randomYeahMessage = messages[randomIndex];

		this.yeahText = this.add.text(position.x, position.y, randomYeahMessage, {
			fontFamily: "pusab",
			fontSize: '60px',
			color: '#F7E73C',
			stroke: "#000",
			strokeThickness: 10
		});
		this.yeahText.setOrigin(0.5, 0);
		// this.yeahText.setTint(0x00ff00); // Green tint for "Yeah!!!" message (adjust color as needed)
		// this.yeahText.setDepth(1);

		setTimeout(() => {
			this.perfectSquareText.setVisible(false);
			this.perfectSquareText.scale = 1;
			this.perfectSquareText.y = 960;
			this.yeahText.destroy();
			this.levelText.text = "Level " + currentLevel;
		}, 1800);
	}

	// confettiForLevelComplete() {
	// 	const confettiSettings = {
	// 		colors: ['#285D92', '#347722', '#590091'],
	// 	};
	// 	const confetti = new ConfettiGenerator(confettiSettings);
	// 	confetti.render();

	// 	confetti({
	// 		particleCount: 100,
	// 		spread: 40,
	// 		origin: { y: 0.8 },
	// 	});
	// }

	confettiForLevelComplete() {
		const confettiSettings = {
			colors: ['#285D92', '#347722', '#590091', '#8C0032', '#8A7100', '#3D3D3D', '#9F5E52', '#243592', '#C26F31', '#982AAE'],
			particleCount: 100,
			spread: 40,
			origin: { y: 0.8 },
		};

		// Use the directly exported confetti function
		confetti(confettiSettings);
	}

	perfectSquareTween() {
		this.perfectSquareText.setVisible(true);
		this.perfectSquareTextTween = this.tweens.add({
			targets: this.perfectSquareText,
			y: 1000,
			scale: 1.2,
			duration: 600,
			ease: "Bounce.easeOut",
		});
	}


	gameOver() {
		localStorage.setItem('level', currentLevel);
		this.time.delayedCall(1000, () => {
			this.scene.start("Level");
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
