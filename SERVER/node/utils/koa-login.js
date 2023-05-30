const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')
const { sign, verify } = require('jsonwebtoken')
const jwt = require('koa-jwt')

const app = new Koa()
const router = new Router()
const secret = 'abcaqwe4qweq'

app.use(
	koaBody({
		multipart: true
	})
)

router.use(
	jwt({
		secret,
		cookie: 'token',
		debug: true
	}).unless({ path: [/^\/public/, '/login'] })
)

// 获取用户信息
const getUserInfo = () => {
	return new Promise(resolve => {
		resolve({
			username: 'test',
			password: 123
		})
	})
}

// 登录
router.post('/login', async ctx => {
	const res = await (async () => {
		const { username, password } = ctx.request.body
		const account = await getUserInfo(username)
		if (!account) {
			return {
				code: -1,
				message: '用户不存在！'
			}
		}

		if (username == account.username && password == account.password) {
			const token = sign({ name: username }, secret, { expiresIn: '3h' })
			const userInfo = {
				username,
				time: +new Date(),
				token
			}
			return {
				code: 0,
				message: '登录成功！',
				userInfo
			}
		}
		return {
			code: -1,
			message: '用户名或密码错误！'
		}
	})()

	// 往cookie中写入token
	if (res.userInfo) {
		ctx.cookies.set('token', res.userInfo.token, {
			domin: '127.0.0.1',
			path: '/',
			maxAge: 3 * 60 * 60 * 100,
			httpOnly: true,
			overwrite: true
		})
	}
	ctx.body = res
})

// 验证token
router.get('/list', async ctx => {
	const token = ctx.cookies.get('token')
	if (token) {
		try {
			const res = verify(token, secret)
			ctx.body = {
				code: 0,
				data: res,
				message: '验证成功'
			}
		} catch {
			ctx.body = {
				code: -1,
				message: 'token已失效'
			}
		}
	} else {
		ctx.body = {
			code: -1,
			message: '未获取到token'
		}
	}
})

app.use(router.routes(), router.allowedMethods()) // 路由注册放在body后面
app.listen(3001)
