export default interface IRegisterEvent {
    /**
     *  注册监听
     */
    onRegisterEvent(): void;
    /**
     *  取消监听
     */
    onCancelEvent(): void;
}