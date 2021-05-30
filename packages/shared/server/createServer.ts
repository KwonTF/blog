import Koa from 'koa'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'

async function createServer(port: number) {
	const app = new Koa()

	// https://likelion-kgu.tistory.com/63
	app.use(compress())

	// get client body in req.body
	app.use(bodyParser())

	return {
		app,
		start: () => {
			app.listen(port, () => {
				console.log(`start server in ${port}port`)
			})
		}
	}
}

export default createServer
