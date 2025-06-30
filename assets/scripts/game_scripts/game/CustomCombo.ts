import * as cc from 'cc'

export class CustomCombo {
    private static comboCount: number = 0
    private static pickSuccessCount: number = 0


    public static init() {
        this.comboCount = 0
        this.pickSuccessCount = 0
    }

    public static onPickSuccess() {
        this.pickSuccessCount++
        if (this.pickSuccessCount < 3) return

        this.comboCount++
        if (this.pickSuccessCount === 4) {
            cc.game.emit('showComboEffect', 1)
        } else if (this.comboCount >= 2) {
            cc.game.emit('showComboEffect', this.comboCount - 1)
        }
    }

    public static onPickFail() {
        if (this.pickSuccessCount < 4) return
        this.comboCount = 0
    }
}