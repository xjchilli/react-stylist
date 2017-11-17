# 公众号开发


##### 使用es6（7）需要babel转换器

```
npm install webpack --save-dev
npm install babel-preset-es2015 --save-dev //转换至es5
npm install babel-preset-react --save-dev //转换jsx至es5
npm install babel-preset-stage-0 --save-dev //支持es7
npm install babel-loader --save-dev //webpack的babel加载器

```

##### yarn常用命令


~~~
1. Starting a new project

yarn init
Adding a dependency

2. yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
Adding a dependency to different categories of dependencies

3. Add to devDependencies, peerDependencies, and optionalDependencies respectively:

yarn add [package] --dev
yarn add [package] --peer 
yarn add [package] --optional

4. Upgrading a dependency

yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
Removing a dependency

5. yarn remove [package]
Installing all the dependencies of project

yarn
or

yarn install

~~~

