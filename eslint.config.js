import { FlatCompat } from '@eslint/eslintrc'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'public/**',
      '.git/**',
      '.github/**',
      '.vscode/**',
      'coverage/**',
      'out/**',
      'next.config.ts',
      'postcss.config.js',
      'postcss.config.cjs',
      'tailwind.config.ts',
      '**/*.d.ts'
    ]
  },

  ...compat.extends('next/core-web-vitals'),

  perfectionistPlugin.configs['recommended-natural'],

  // 自定义规则配置
  {
    rules: {
      // TypeScript规则
      '@typescript-eslint/no-explicit-any': 'off',

      // 代码格式规则
      'array-bracket-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'as-needed'],
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'object-curly-spacing': ['error', 'always'],

      // 代码组织规则
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown'
          ],
          order: 'asc',
          type: 'natural'
        }
      ],

      // 命名导入排序
      'perfectionist/sort-named-imports': [
        'error',
        {
          order: 'asc',
          type: 'natural'
        }
      ],

      // 基本语法规则
      quotes: ['error', 'single'],
      semi: ['error', 'never']
    }
  }
]

export default eslintConfig
