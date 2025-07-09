# Import(s)
import sys
import smtplib
from email.mime.text import MIMEText

# Function to fix data
def fix_data(data):
    data = data.replace(",", "\n\t")
    data = data.replace("\space", " ")
    data = data.replace("''", "'")
    data = data.replace("_and_", " & ")
    data = data.replace("_", " ")
    return data

# Main function
def main(data):
    # Email variables
    port = 587
    server = "smtp.gmail.com"
    password = "ipgikcgemjcmfvkr"
    sender = "kimsal.edwin@gmail.com"
    reciever = "edwin.kimsal@outlook.com"

    # Manipulate message
    data = fix_data(data)

    # Message
    text = f"""\
        Thank you for submitting your RSVP for Clay and Liz's wedding. If any of the following information is incorrect, please reply to this email.

        {data}
        """

    # Set message, from, to, subject
    message = MIMEText(text, "plain")
    message["From"] = sender
    message["To"] = reciever
    message["Subject"] = "Form Recieved"

    # Send message
    with smtplib.SMTP(server, port) as server:
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, reciever, message.as_string())


# Call main function
main(sys.argv[1])