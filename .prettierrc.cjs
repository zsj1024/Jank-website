module.exports = {
  /**
   * 箭头函数参数是否使用括号
   * avoid - 尽可能省略括号，仅在必要时使用
   */
  arrowParens: 'avoid',

  /**
   * JSX标签的闭合括号位置
   * false - 闭合括号单独占一行，提高可读性
   */
  bracketSameLine: false,

  /**
   * 对象花括号内部是否添加空格
   * true - 在花括号内部添加空格，如 { foo: bar }
   */
  bracketSpacing: true,

  /**
   * 行尾换行符风格
   * lf - 使用\n换行，适用于所有平台
   */
  endOfLine: 'lf',

  /**
   * JSX中是否使用单引号
   * true - 在JSX属性中使用单引号而非双引号
   */
  jsxSingleQuote: true,

  /**
   * 单行代码的最大宽度
   * 超过此宽度的代码会被换行
   */
  printWidth: 80,

  /**
   * 语句末尾是否使用分号
   * false表示不添加分号，符合现代JS风格
   */
  semi: false,

  /**
   * 使用单引号
   * true表示使用单引号而非双引号
   */
  singleQuote: true,

  /**
   * 缩进宽度 - 每个缩进级别使用的空格数
   * 推荐使用2空格，更节省空间并保持良好可读性
   */
  tabWidth: 2,

  /**
   * 多行对象/数组最后一项的尾逗号
   * none - 不添加尾逗号
   */
  trailingComma: 'none',

  /**
   * 是否使用Tab缩进
   * false表示使用空格而非Tab字符进行缩进
   */
  useTabs: false
}
