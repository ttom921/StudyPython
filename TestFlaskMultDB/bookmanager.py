from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect

app = Flask(__name__)

# 資料庫設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/bookdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)


class Book(db.Model):
    title = db.Column(db.String(80), unique=True,
                      nullable=False, primary_key=True)

    def __repr__(self):
        return "<Title:{}".format(self.title)


@app.route("/", methods=["GET", "POST"])
def home():
    books = None
    if request.form:
        try:
            book = Book(title=request.form.get("title"))
            db.session.add(book)
            db.session.commit()
        except Exception as e:
            print("Failed to add book")
            print(e)
    books = Book.query.all()
    return render_template("home.html", books=books)


@app.route("/update", methods=["POST"])
def update():
    try:
        newtitle = request.form.get("newtitle")
        oldtitle = request.form.get("oldtitle")
        book = Book.query.filter_by(title=oldtitle).first()
        book.title = newtitle
        db.session.commit()
    except Exception as e:
        print("Failed to update book")
        print(e)
    return redirect("/")


@app.route("/delete", methods=["POST"])
def delete():
    try:
        title = request.form.get("title")
        book = Book.query.filter_by(title=title).first()
        db.session.delete(book)
        db.session.commit()
    except Exception as e:
        print("Failed to delete book")
        print(e)
    return redirect("/")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
