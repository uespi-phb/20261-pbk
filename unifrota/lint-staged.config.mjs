export default {
  '*.{ts,js,mjs,cjs}': ['eslint --cache --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
}
