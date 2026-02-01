from livereload import Server

def serve():
    server = Server()
    server.watch('/web/*')
    server.serve(root='/web', port=8080, host='0.0.0.0')

if __name__ == '__main__':
    serve()
