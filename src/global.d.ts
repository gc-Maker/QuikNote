declare module "*.less" {
  const styles: { [key: string]: string };
  // export = styles; // 兼容 CommonJS
  export default styles;
}
