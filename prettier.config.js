/** @type {import("prettier").Config} */
module.exports = {
  // 与 indent: ["error", 2] 对应
  tabWidth: 2,
  useTabs: false,

  // 与 quotes: ["error", "single"] 对应
  singleQuote: true,

  // 与 semi: ["error", "never"] 对应（注意你的配置中有拼写错误，应为"never"）
  semi: false,

  // 与 "comma-dangle": ["error", "never"] 对应（同样有拼写错误）
  trailingComma: 'none',

  // 与 "arrow-parens": ["error", "as-needed"] 对应
  arrowParens: 'avoid',

  // 与 "object-curly-spacing": ["error", "always"] 对应
  bracketSpacing: true,

  // 与 "array-bracket-spacing": ["error", "always"] 对应
  // 注意：Prettier 没有直接对应的选项，最接近的是 bracketSpacing
  // 但它同时控制对象和数组的间距，所以这里我们使用 bracketSpacing: true

  // 其他常用的 Prettier 配置
  printWidth: 80,
  endOfLine: 'lf',
  jsxSingleQuote: true,
  jsxBracketSameLine: false
}
