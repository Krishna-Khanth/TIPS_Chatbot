
# A very simple Flask Hello World app for you to get started with...
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

import main
import mail

app = Flask(__name__)
CORS(app)

# Create a directory in a known location to save files to.
uploads_dir = os.path.join(app.instance_path, 'uploads')
os.makedirs(uploads_dir, exist_ok=True)


@app.route('/')
def hello_world():
    return 'Hello from Flask! This is a test site'


@app.route('/Bot-response-function', methods=["Post"])
def jsonHandle():
    req_data = request.get_json()
    bot_response = "Custom Response"
    user_input = req_data["user-input"]

    bot_response = main.chatbot_response(user_input)

    return jsonify({
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "user-input": user_input,
            "response": bot_response
        }
    })


@app.route('/email-function', methods=["Post"])
def emailHandle():
    req_data = request.get_json()
    case = req_data["case"]
    bot_response = "Custom Response"

    EMAIL_FROM = 'piyushparashar2k@gmail.com'  # trinitxyz@gmail.com
    EMAIL_SUBJECT = "Email from chat bot"
    EMAIL_CONTENT = ""

    email_to = {
        2.1: "studentsupport@tips.edu.in",
        2.2: "studentsupport@tips.edu.in",
        3.3: "accounts@tips.edu.in"
    }

    # name, roll, mail
    user_info = "Name - " + req_data["name"] + ", Enrollment number - " + req_data["roll"] + ", E-mail ID - " + req_data["mail"] + ", "

    if case == 2.1:
        EMAIL_CONTENT = "Degree Query for course: " + req_data["course"] + ". Batch: " + req_data[
            "batch"] + ". Drop out case: " + req_data["drop"]
    elif case == 2.2:
        EMAIL_CONTENT = "Bonafide for purpose: " + req_data["purpose"]
    elif case == 3.3:
        EMAIL_CONTENT = "Accounts Query for security for batch: " + req_data["batch"] + ". Year: " + req_data["year"]

    EMAIL_CONTENT = user_info + EMAIL_CONTENT

    service = mail.service_account_login()
    message = mail.create_message(EMAIL_FROM, email_to.get(case), EMAIL_SUBJECT, EMAIL_CONTENT)
    sent = mail.send_message(service, 'me', message)

    bot_response = "Email sent successfully."

    return jsonify({
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": {
            "response": bot_response
        }
    })


# app.run(debug=True)
app.run()
