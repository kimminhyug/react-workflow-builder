module.exports = {
    env: {
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },

    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'unused-imports',
        'prettier',
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],

    rules: {
        'prettier/prettier': 'error',
        'unused-imports/no-unused-imports': 'error',
        'react/react-in-jsx-scope': 'off',
    },
};
