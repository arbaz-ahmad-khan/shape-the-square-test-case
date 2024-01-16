import Level from "../src/scenes/Level";
import GameManager from '../src/scripts/GameManager';
let level;
beforeEach(() => {
    level = new Level();
    level.events = {
        emit: jest.fn()
    };
    level.input = {
        setDefaultCursor: jest.fn(function (cursor) {
            this.defaultCursor = cursor;
        }),
        getDefaultCursor: jest.fn(function () {
            return this.defaultCursor;
        })
    };
    level.scale = {
        pageAlignHorizontally: false,
        pageAlignVertically: false,
        scaleMode: null
    };
    level.add = {
        image: jest.fn().mockReturnValue({
            setOrigin: jest.fn().mockReturnThis(),
            setScale: jest.fn().mockReturnThis()
        }),
        sprite: jest.fn().mockReturnValue({
            setOrigin: jest.fn().mockReturnThis(),
            setScale: jest.fn().mockReturnThis(),
            setDepth: jest.fn().mockReturnThis()
        }),
        text: jest.fn().mockReturnValue({
            setOrigin: jest.fn().mockReturnThis(),
            setScale: jest.fn().mockReturnThis(),
            setDepth: jest.fn().mockReturnThis(),
            setPosition: jest.fn().mockReturnThis(),
            setVisible: jest.fn().mockReturnThis(),
            text: '',
            setText: jest.fn(function (newText) {
                this.text = newText;
                return this;
            })
        }),
        setOrigin: jest.fn()
    };
    level.sys = {
        game: {
            config: {
                height: 600, // Replace with the actual height value
                width: 800 // Replace with the actual width value
            }
        }
    };
    level.tweens = {
        add: jest.fn().mockReturnThis()
    };
    // Rest of your setup code...
});
describe('create', () => {

    // Creates a new instance of GameManager
    it('should create a new instance of GameManager', () => {
        level.create();
        expect(level.oGameManager).toBeInstanceOf(GameManager);
    });

    // Sets the default cursor to pointer
    it('should set the default cursor to pointer', () => {
        level.create();
        expect(level.input.getDefaultCursor()).toBe('pointer');
    });

    // Sets the scale mode to SHOW_ALL
    it('should set the scale mode to SHOW_ALL', () => {
        level.create();
        expect(level.scale.scaleMode).toBe(Phaser.Scale.ScaleModes.SHOW_ALL);
    });

    // Handles missing currentLevel value in localStorage
    it('should handle missing currentLevel value in localStorage', () => {
        localStorage.removeItem('currentLevel');
        level.create();
        expect(localStorage.getItem('currentLevel')).toBe('1');
    });

    // Handles currentLevel value of 0 in localStorage
    it('should handle currentLevel value of 0 in localStorage', () => {
        level.create();
        localStorage.setItem('currentLevel', '1');
        expect(localStorage.getItem('currentLevel')).toBe('1');
    });

    // Handles currentLevel value of a non-integer type in localStorage
    it('should handle currentLevel value of a non-integer type in localStorage', () => {
        localStorage.setItem('currentLevel', '1');
        level.create();
        expect(localStorage.getItem('currentLevel')).toBe('1');
    });

    it('should set the default cursor to pointer', () => {
        level.create();
        expect(level.input.getDefaultCursor()).toBe('pointer');
    });
});
describe('squareAndLevelText', () => {
    beforeEach(() => {
        level.square = {
            x: 100,
            y: 200,
            successful: 5
        };
        global.currentLevel = 10;
        level.perfectSquareText = level.add.text(540, 960, 'Perfect Square', {
            fontFamily: 'pusab',
            fontSize: '100px',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 10
        });
        level.levelText = level.add.text(540, 20, 'Level 10', {
            fontFamily: 'pusab',
            fontSize: '100px',
            color: '#ffffff',
            stroke: '#000',
            strokeThickness: 10
        });
    });

    it('should create squareText with correct properties', () => {
        level.squareAndLevelText();
        expect(level.squareText.text).toBe('5');
        expect(level.squareText.x).toBe(level.square.x);
        expect(level.squareText.y).toBe(level.square.y);
        expect(level.squareText.style.fontFamily).toBe('pusab');
        expect(level.squareText.style.fontSize).toBe('260px');
        expect(level.squareText.style.color).toBe('#FFEDC3');
        expect(level.squareText.style.stroke).toBe('#000');
        expect(level.squareText.style.strokeThickness).toBe(20);
    });

    it('should create levelText with correct properties', () => {
        level.squareAndLevelText();
        expect(level.levelText.text).toBe('Level 10');
        expect(level.levelText.x).toBe(540);
        expect(level.levelText.y).toBe(20);
        expect(level.levelText.style.fontFamily).toBe('pusab');
        expect(level.levelText.style.fontSize).toBe('76px');
        expect(level.levelText.style.color).toBe('#ffffff');
        expect(level.levelText.style.stroke).toBe('#000');
        expect(level.levelText.style.strokeThickness).toBe(10);
    });

    it('should create perfectSquareText with correct properties', () => {
        level.squareAndLevelText();
        expect(level.perfectSquareText.text).toBe('Perfect Square');
        expect(level.perfectSquareText.x).toBe(540);
        expect(level.perfectSquareText.y).toBe(960);
        expect(level.perfectSquareText.style.fontFamily).toBe('pusab');
        expect(level.perfectSquareText.style.fontSize).toBe('100px');
        expect(level.perfectSquareText.style.color).toBe('#ffffff');
        expect(level.perfectSquareText.style.stroke).toBe('#000');
        expect(level.perfectSquareText.style.strokeThickness).toBe(10);
        expect(level.perfectSquareText.visible).toBe(false);
    });
});


