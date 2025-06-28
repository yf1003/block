
import * as cc from "cc";
export function changeOpacity(node: cc.Node, opacity: number) {
    const opCom = node.getComponent(cc.UIOpacity) || node.addComponent(cc.UIOpacity)
    opCom.opacity = opacity
}

export function changeWidth(node: cc.Node, width: number) {
    const opCom = node.getComponent(cc.UITransform) || node.addComponent(cc.UITransform)
    opCom.width = width
}

export function changeHeight(node: cc.Node, height: number) {
    const opCom = node.getComponent(cc.UITransform) || node.addComponent(cc.UITransform)
    opCom.height = height
}

export function setNodeXYZ(node: cc.Node, dir: 'x' | 'y' | 'z', value: number) {
    if (dir === 'x') {
        node.setPosition(value, node.position.y, node.position.z)
    } else if (dir === 'y') {
        node.setPosition(node.position.x, value, node.position.z)
    } else if (dir === 'z') {
        node.setPosition(node.position.x, node.position.y, value)
    }
}

export function changeNodeXYZ(node: cc.Node, dir: 'x' | 'y' | 'z', value: number) {
    if (dir === 'x') {
        node.setPosition(node.position.x + value, node.position.y, node.position.z)
    } else if (dir === 'y') {
        node.setPosition(node.position.x, node.position.y + value, node.position.z)
    } else if (dir === 'z') {
        node.setPosition(node.position.x, node.position.y, node.position.z + value)
    }
}

/** 生成一个需要计数执行的回调函数 */
export const mollocCountFunc = (count: number, callback: () => void): (() => void) => {
    return () => {
      if (--count === 0) {
        callback && callback()
      }
    }
  }