import { _decorator, Component, director } from 'cc';
import { PlayableSetupConfig } from '../scripts/PlayableSetupConfig';
const { ccclass, property } = _decorator;

@ccclass('EditorMain')
export class EditorMain extends Component {
    onLoad() {
        const setupConfig = new PlayableSetupConfig();
        setupConfig.initialize(() => {
            director.loadScene("gameScene");
        });
    }
}


