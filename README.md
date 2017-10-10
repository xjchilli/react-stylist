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

~~~
<Link to="/profile">个人信息</Link>
<Link to="/needMatch">我要搭配</Link>
<Link to="/myDps">我的搭配师</Link>
<Link to="/customSuit">搭配测试</Link>
<Link to="/wardrobeList">我的衣橱</Link>
<Link to="/orderList">我的订单</Link>
<Link to="/fashionMoment">我的时尚圈</Link>
<Link to="/promotionCode">优惠码</Link>
<Link to="/getPromotion?couponsActiveId=13">获取优惠码</Link>
<Link to="/share?userId=171">分享</Link>
<Link to="/arrangementScheme?id=18">搭配方案</Link>
<Link to="/feedback">吐槽</Link>
<Link to="/test">测试</Link>
~~~