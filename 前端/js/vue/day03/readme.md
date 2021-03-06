## 路由

1. ### 动态路由匹配

   响应路由参数变化

   捕获所有路由或404路由

   高级匹配模式

   匹配优先级

2. ### 嵌套路由

    实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

    ```text
    /user/foo/profile                     /user/foo/posts
    +------------------+                  +-----------------+
    | User             |                  | User            |
    | +--------------+ |                  | +-------------+ |
    | | Profile      | |  +------------>  | | Posts       | |
    | |              | |                  | |             | |
    | +--------------+ |                  | +-------------+ |
    +------------------+                  +-----------------+
    ```

    借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系。

    接着上节创建的 app：

    ```html
    <div id="app">
      <router-view></router-view>
    </div>
    const User = {
      template: '<div>User {{ $route.params.id }}</div>'
    }
    
    const router = new VueRouter({
      routes: [
        { path: '/user/:id', component: User }
      ]
    })
    ```

    这里的 `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。例如，在 `User` 组件的模板添加一个 `<router-view>`：

    ```js
    const User = {
      template: `
        <div class="user">
          <h2>User {{ $route.params.id }}</h2>
          <router-view></router-view>
        </div>
      `
    }
    ```

    要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

    ```js
    const router = new VueRouter({
      routes: [
        { path: '/user/:id', component: User,
          children: [
            {
              // 当 /user/:id/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: 'profile',
              component: UserProfile
            },
            {
              // 当 /user/:id/posts 匹配成功
              // UserPosts 会被渲染在 User 的 <router-view> 中
              path: 'posts',
              component: UserPosts
            }
          ]
        }
      ]
    })
    ```

    **要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**

    你会发现，`children` 配置就是像 `routes` 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。

    此时，基于上面的配置，当你访问 `/user/foo` 时，`User` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/user/:id', component: User,
          children: [
            // 当 /user/:id 匹配成功，
            // UserHome 会被渲染在 User 的 <router-view> 中
            { path: '', component: UserHome },
    
            // ...其他子路由
          ]
        }
      ]
    })
    ```

    

3. ### 编程式的导航

    除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

    #### `router.push(location, onComplete?, onAbort?)`

    **注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。**

    想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

    当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

    | 声明式                    | 编程式             |
    | ------------------------- | ------------------ |
    | `<router-link :to="...">` | `router.push(...)` |

    该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

    ```js
    // 字符串
    router.push('home')
    
    // 对象
    router.push({ path: 'home' })
    
    // 命名的路由
    router.push({ name: 'user', params: { userId: '123' }})
    
    // 带查询参数，变成 /register?plan=private
    router.push({ path: 'register', query: { plan: 'private' }})
    ```

    **注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：**

    ```js
    const userId = '123'
    router.push({ name: 'user', params: { userId }}) // -> /user/123
    router.push({ path: `/user/${userId}` }) // -> /user/123
    // 这里的 params 不生效
    router.push({ path: '/user', params: { userId }}) // -> /user
    ```

    同样的规则也适用于 `router-link` 组件的 `to` 属性。

    在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。

    **注意**： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 [`beforeRouteUpdate`](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96) 来响应这个变化 (比如抓取用户信息)。

    #### `router.replace(location, onComplete?, onAbort?)`

    跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

    | 声明式                            | 编程式                |
    | --------------------------------- | --------------------- |
    | `<router-link :to="..." replace>` | `router.replace(...)` |

    #### `router.go(n)`

    这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

    例子

    ```js
    // 在浏览器记录中前进一步，等同于 history.forward()
    router.go(1)
    
    // 后退一步记录，等同于 history.back()
    router.go(-1)
    
    // 前进 3 步记录
    router.go(3)
    
    // 如果 history 记录不够用，那就默默地失败呗
    router.go(-100)
    router.go(100)
    ```

    #### [#](https://router.vuejs.org/zh/guide/essentials/navigation.html#%E6%93%8D%E4%BD%9C-history)操作 History

    你也许注意到 `router.push`、 `router.replace` 和 `router.go` 跟 [`window.history.pushState`、 `window.history.replaceState` 和 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)好像， 实际上它们确实是效仿 `window.history` API 的。

    因此，如果你已经熟悉 [Browser History APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API)，那么在 Vue Router 中操作 history 就是超级简单的。

    还有值得提及的，Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。

    

4. ### 命名路由

    有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/user/:userId',
          name: 'user',
          component: User
        }
      ]
    })
    ```

    要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

    ```html
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    ```

    这跟代码调用 `router.push()` 是一回事：

    ```js
    router.push({ name: 'user', params: { userId: 123 }})
    ```

    这两种方式都会把路由导航到 `/user/123` 路径。

5. ### 命名视图

    有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

    ```html
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
    ```

    一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

    ```js
    const router = new VueRouter({
      routes: [
        {
          path: '/',
          components: {
            default: Foo,
            a: Bar,
            b: Baz
          }
        }
      ]
    })
    ```

    #### 嵌套命名视图

    我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。我们以一个设置面板为例：

    ```text
    /settings/emails                                       /settings/profile
    +-----------------------------------+                  +------------------------------+
    | UserSettings                      |                  | UserSettings                 |
    | +-----+-------------------------+ |                  | +-----+--------------------+ |
    | | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
    | |     +-------------------------+ |                  | |     +--------------------+ |
    | |     |                         | |                  | |     | UserProfilePreview | |
    | +-----+-------------------------+ |                  | +-----+--------------------+ |
    +-----------------------------------+                  +------------------------------+
    ```

    - `Nav` 只是一个常规组件。
    - `UserSettings` 是一个视图组件。
    - `UserEmailsSubscriptions`、`UserProfile`、`UserProfilePreview` 是嵌套的视图组件。

    **注意**：*我们先忘记 HTML/CSS 具体的布局的样子，只专注在用到的组件上。*

    `UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码：

    ```html
    <!-- UserSettings.vue -->
    <div>
      <h1>User Settings</h1>
      <NavBar/>
      <router-view/>
      <router-view name="helper"/>
    </div>
    ```

    *嵌套的视图组件在此已经被忽略了，但是你可以在这里找到完整的源代码。*

    然后你可以用这个路由配置完成该布局：

    ```js
    {
      path: '/settings',
      // 你也可以在顶级路由就配置命名视图
      component: UserSettings,
      children: [{
        path: 'emails',
        component: UserEmailsSubscriptions
      }, {
        path: 'profile',
        components: {
          default: UserProfile,
          helper: UserProfilePreview
        }
      }]
    }
    ```

    

6. ### 重定向和别名

   #### 重定向

   重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

   ```js
   const router = new VueRouter({
     routes: [
       { path: '/a', redirect: '/b' }
     ]
   })
   ```

   重定向的目标也可以是一个命名的路由：

   ```js
   const router = new VueRouter({
     routes: [
       { path: '/a', redirect: { name: 'foo' }}
     ]
   })
   ```

   甚至是一个方法，动态返回重定向目标：

   ```js
   const router = new VueRouter({
     routes: [
       { path: '/a', redirect: to => {
         // 方法接收 目标路由 作为参数
         // return 重定向的 字符串路径/路径对象
       }}
     ]
   })
   ```

   #### 别名

   重定向”的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`，那么“别名”又是什么呢？

   **/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。**

   上面对应的路由配置为：

   ```js
   const router = new VueRouter({
     routes: [
       { path: '/a', component: A, alias: '/b' }
     ]
   })
   ```

7. ### 路由组件传参

   在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

   使用 `props` 将组件和路由解耦：

   **取代与 $route 的耦合**

   ```js
   const User = {
     template: '<div>User {{ $route.params.id }}</div>'
   }
   const router = new VueRouter({
     routes: [
       { path: '/user/:id', component: User }
     ]
   })
   ```

   **通过 props 解耦**

   ```js
   const User = {
     props: ['id'],
     template: '<div>User {{ id }}</div>'
   }
   const router = new VueRouter({
     routes: [
       { path: '/user/:id', component: User, props: true },
   
       // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
       {
         path: '/user/:id',
         components: { default: User, sidebar: Sidebar },
         props: { default: true, sidebar: false }
       }
     ]
   })
   ```

   这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试

   ### 布尔模式

   如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。

   ### 对象模式

   如果 `props` 是一个对象，它会被按原样设置为组件属性。当 `props` 是静态的时候有用。

   ```js
   const router = new VueRouter({
     routes: [
       { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
     ]
   })
   ```

   ### 函数模式

   你可以创建一个函数返回 `props`。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。

   ```js
   const router = new VueRouter({
     routes: [
       { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
     ]
   })
   ```

   URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件。

   请尽可能保持 `props` 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 `props`，请使用包装组件，这样 Vue 才可以对状态变化做出反应

   

8. ### Html5 History模式

   `vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

   如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

   ```js
   const router = new VueRouter({
     mode: 'history',
     routes: [...]
   })
   ```







