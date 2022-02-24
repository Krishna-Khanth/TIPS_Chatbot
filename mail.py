from __future__ import print_function
from apiclient import errors
import os 
import pickle
from httplib2 import Http
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import mimetypes
import base64
import binascii
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

def create_message_with_attachment(
    sender, to, subject, message_text, file):
  """Create a message for an email.

  Args:
    sender: Email address of the sender.
    to: Email address of the receiver.
    subject: The subject of the email message.
    message_text: The text of the email message.
    file: The path to the file to be attached.

  Returns:
    An object containing a base64url encoded email object.
  """
  message = MIMEMultipart()
  message['to'] = to
  message['from'] = sender
  message['subject'] = subject

  msg = MIMEText(message_text)
  message.attach(msg)

  content_type, encoding = mimetypes.guess_type(file)

  if content_type is None or encoding is not None:
    content_type = 'application/octet-stream'
  main_type, sub_type = content_type.split('/', 1)
  if main_type == 'text':
    fp = open(file, 'rb')
    print("here")
    msg = MIMEText(str(fp.read()), _subtype=sub_type)
    fp.close()
  elif main_type == 'image':
    fp = open(file, 'rb')
    msg = MIMEImage(fp.read(), _subtype=sub_type)
    fp.close()
  elif main_type == 'audio':
    fp = open(file, 'rb')
    msg = MIMEAudio(fp.read(), _subtype=sub_type)
    fp.close()
  else:
    fp = open(file, 'rb')
    msg = MIMEBase(main_type, sub_type)
    msg.set_payload(fp.read())
    fp.close()
  filename = os.path.basename(file)
  msg.add_header('Content-Disposition', 'attachment', filename=filename)
  message.attach(msg)
  return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}
def create_message(sender, to , subject , message):
	message = MIMEText(message)
	message['to'] = to
	message['from'] = sender
	message['subject'] = subject
	print(type(message.as_string()))
	return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}

def send_message(service, user_id, message):
	try:
		message = service.users().messages().send(userId=user_id, body=message).execute()
		print('Message Id : %s ' % message['id'])
		return message
	except Exception as e:
		print('An error occurred: %s ' % e)
		return None
def service_account_login():
	creds = None
	SCOPES= ['https://www.googleapis.com/auth/gmail.send']	
	SERVICE_ACCOUNT_FILE='service-key.json'
	if os.path.exists('token.pickle'):
		with open('token.pickle', 'rb') as token:
			creds = pickle.load(token)
	if not creds or not creds.valid:
		if creds and creds.expired and creds.refresh_token:
			creds.refresh(Request())
		else:
			flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
			creds = flow.run_local_server(port=0)
		with open('token.pickle', 'wb') as token:
			pickle.dump(creds, token)	
	delegate_credentials = creds
	#delegate_credentials = creds.with_subject(EMAIL_FROM)
	service = build('gmail','v1',credentials=delegate_credentials)
	return service
EMAIL_FROM = 'piyushparashar2k@gmail.com' # trinitxyz@gmail.com
EMAIL_TO = 'kali12nat07@gmail.com' #Selected from input =>
EMAIL_SUBJECT = 'TheHello re'  # Depends on Query
EMAIL_CONTENT = 'HEllo this is a test' # Depends on Query
filename= "test.txt"
################################################################################
# xyz Person applied/Queried for xyz course/position immediate action required #
################################################################################
service = service_account_login()
#message = create_message(EMAIL_FROM,EMAIL_TO,EMAIL_SUBJECT,EMAIL_CONTENT)
#message = create_message_with_attachment(EMAIL_FROM,EMAIL_TO,EMAIL_SUBJECT,EMAIL_CONTENT,filename)
#sent = send_message(service,'me',message)