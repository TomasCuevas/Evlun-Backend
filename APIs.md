# user API

### **_/api/user_** **method: GET**

`request query`

```
- username: String
```

`response data`

```
- ok: Boolean
- user: Object
```

### **_/api/user/follow_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- msg: String
```

### **_/api/user/unfollow_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- msg: String
```

# auth API

### **_/api/auth/signup_** **method: POST**

`request body`

```
- name: String
- username: String
- email: String
- password: String
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
- user: Object
```

### **_/api/auth/login_** **method: POST**

`request body`

```
- email: String
- password: String
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
- user: Object
```

### **_/api/auth/refresh_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
- user: Object
```

# post API

### **_/api/post/create_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request body`

```
- content: String
```

`response data`

```
- ok: Boolean
- msg: String
- post: Object
```

### **_/api/post_** **method: GET**

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- posts: Array
```

### **_/api/post/all_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- posts: Array
```

### **_/api/post/followings_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- posts: Array
```
