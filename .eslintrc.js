module.exports = {
    env: {
        node: true,
        es6: true,
        browser: true
    },
    parser: '@babel/eslint-parser',
    extends: ['next/core-web-vitals', 'prettier'],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: './jsconfig.json',
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/display-name': 'off',
        '@next/next/no-img-element': 'off',
        'react/no-unescaped-entities': 'off',
        'import/no-anonymous-default-export': 'off',
    
      // adicionar nova linha acima do comentário
        'lines-around-comment': [
            'error',
            {
                beforeLineComment: true,
                beforeBlockComment: true,
                allowBlockStart: true,
                allowClassStart: true,
                allowObjectStart: true,
                allowArrayStart: true
            }
        ],

        // adicionar nova linha acima do retorno
        'newline-before-return': 'error',
    
        // adicionar nova linha abaixo da importação
        'import/newline-after-import': [
            'error',
            {
                count: 1
            }
        ],

      // adicione nova linha após cada var, const, deixe declaração
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: ['export'], next: ['*'] },
            { blankLine: 'always', prev: ['*'], next: ['multiline-const', 'multiline-let', 'multiline-var', 'export'] }
        ]
    }
}
