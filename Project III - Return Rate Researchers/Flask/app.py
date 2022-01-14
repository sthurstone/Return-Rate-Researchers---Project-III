from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Contact')
def Contact():
    return render_template('Contact.html')

@app.route('/Membership')
def Membership():
    return render_template('Membership.html')

@app.route('/City')
def City():
    return render_template('City.html')

@app.route('/Map')
def Map():
    return render_template('Map.html')

if __name__=='__main__':
    app.run(debug=True)