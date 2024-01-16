class GameManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.bgImage = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9", "bg10"];
        this.holeWidthRange = [40, 240];
        this.wallRange = [10, 70];
    }

    getBackgroundKeys(bgImageKey) {
        switch (bgImageKey) {
            case 'bg1':
                return ['base1', 'top1', 'holder1', "285D92"];
            case 'bg2':
                return ['base2', 'top2', 'holder2', "347722"];
            case 'bg3':
                return ['base3', 'top3', 'holder3', "590091"];
            case 'bg4':
                return ['base4', 'top4', 'holder4', "8C0032"];
            case 'bg5':
                return ['base5', 'top5', 'holder5', "8A7100"];
            case 'bg6':
                return ['base6', 'top6', 'holder6', "3D3D3D"];
            case 'bg7':
                return ['base7', 'top7', 'holder7', "9F5E52"];
            case 'bg8':
                return ['base8', 'top8', 'holder8', "243592"];
            case 'bg9':
                return ['base9', 'top9', 'holder9', "C26F31"];
            case 'bg10':
                return ['base10', 'top10', 'holder10', "982AAE"];
            default:
                return ['base1', 'top1', 'holder1', "590091"];
                
        }
    }
}
export default GameManager;