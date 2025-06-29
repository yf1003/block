import { LogicConfigManager } from "mvplayable";

export const logicConfig = LogicConfigManager.create({
    moveSpeed: {
        title: "移动速度",
        value: 2,
        range: [0, 10, 0.1]
    }
});
