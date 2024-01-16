
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// preloadBg
		this.add.image(540, 960, "preloadBg");

		// playBtn
		const playBtn = this.add.image(540, 1700, "playBtn");
		playBtn.visible = false;

		// glow
		this.add.image(540, 760, "glow");

		// logo
		const logo = this.add.image(540, 760, "logo");

		this.playBtn = playBtn;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	playBtn;
	/** @type {Phaser.GameObjects.Image} */
	logo;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		// this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));

		this.pointerOver = (aBtn, scale) => {
			this.input.setDefaultCursor('pointer');
			this.tweens.add({
				targets: aBtn,
				scaleX: scale + 0.05,
				scaleY: scale + 0.05,
				duration: 50
			})
		}
		this.pointerOut = (aBtn, scale) => {
			this.input.setDefaultCursor('default');
			this.tweens.add({
				targets: aBtn,
				scaleX: scale,
				scaleY: scale,
				duration: 50,
				onComplete: () => {
					aBtn.forEach((btn) => {
						btn.setScale(scale);
					});
				}
			})
		}
		this.playBtn.on('pointerover', () => this.pointerOver([this.playBtn], 1));
		this.playBtn.on('pointerout', () => this.pointerOut([this.playBtn], 1));

		this.progress = this.add.text(550, 1600, "", {});
		this.progress.setOrigin(0.5, 0.5);
		this.progress.text = "0%";
		this.progress.setStyle({ "color": "#ffffffff", "fontFamily": "pusab", "fontSize": "50px" });

		this.outerBar = this.add.sprite(540, 1700, "outerBar");
		this.outerBar.setOrigin(0.5, 0.5);

		this.innerBar = this.add.sprite(231, 1700 - 25, "innerBar");
		this.innerBar.setOrigin(0, 0.5);

		this.innerBar.setVisible(true);

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;

			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);
			this.progress.setText(currentInterval + "%");

			currentInterval++;
			if (currentProgress >= 1) {
				clearInterval(progressInterval);
				this.progress.setVisible(false);
				this.outerBar.setVisible(false);
				this.innerBar.setVisible(false);

				this.logoTween();

				this.playBtn.setVisible(true);
				this.playBtn.setInteractive().on("pointerdown", () => {
					if (this.logoTweenObj) {
						this.logoTweenObj.stop();
					}
					this.scene.start("Level");
				});

			}
		};
		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	logoTween() {
		const logoTweenConfig = {
			targets: this.logo,
			scaleX: 0.5,
			scaleY: 0.5,
			duration: 2000,
			onComplete: () => {
				this.logoTweenObj = this.tweens.add({
					targets: this.logo,
					scaleX: 1,
					scaleY: 1,
					duration: 2000,
					onComplete: () => {
						this.logoTween();
					}
				});
			}
		};
		this.logoTweenObj = this.tweens.add(logoTweenConfig);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
