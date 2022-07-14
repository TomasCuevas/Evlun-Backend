# user API

### **_/api/user/signup_**

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
```

### **_/api/user/follow_**

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

### **\_/api/user/unfollow**

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

### **_/api/auth/login_**

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
```

### **_/api/auth/refresh_**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
```

# post API

### **_/api/post/create_**

`request header`

```
- x-token: JsonWebToken
```

`request body`

```
- content: String
```

### **_/api/post/all_**

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

### **_/api/post_**

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
