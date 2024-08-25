from flask import Flask

app = Flask("utt-blog", static_url_path="/static")

@app.route('/')
@app.route('/index')
@app.route('/index.html')
def test():
    # return index.html
    with open("index.html", 'r') as file:
        file_string = file.read()
    return file_string

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')