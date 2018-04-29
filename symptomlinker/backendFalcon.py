
import falcon

class test(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.body = ('Hello World')

app = falcon.API()
tests = test()
app.add_route('/test',tests)
