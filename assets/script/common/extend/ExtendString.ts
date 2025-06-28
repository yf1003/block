
import * as cc from "cc";
export class ExtendString extends String {
    public static format(format: string, ...args: any[]): string {
        return format.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
}
