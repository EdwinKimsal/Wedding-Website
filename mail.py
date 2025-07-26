# Import(s)
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

# Function to fix data
def fix_data(data):
    data = data.replace(",", "\n\t")
    data = data.replace("''", "'")
    data = data.replace("_", " ")
    data = data.replace("thereallyspecialcolon", ":")
    data = data.replace("symbolforand", "&")
    return data


# Main function
def main(data, email):
    # Email variables
    port = 587
    server = "smtp.gmail.com"
    password = "ipgikcgemjcmfvkr"
    username = "kimsal.edwin@gmail.com"
    sender = "Edwin Kimsal <kimsal.edwin@gmail.com>"
    reciever = fix_data(email)

    # Manipulate message
    data = fix_data(data)

    # Message
    text = f"""\
        Thank you for submitting your RSVP for Clay and Liz's wedding. If any of the following information is incorrect, please reply to this email.

        {data}
        """

    # Set message, from, to, subject for user
    message1 = MIMEText(text, "plain")
    message1["From"] = sender
    message1["To"] = reciever
    message1["Subject"] = "Form Recieved"

     # Set message, from, to, subject for admin
    message2 = MIMEMultipart()
    body = MIMEText("See attached file", "plain")
    message2.attach(body)
    message2["From"] = sender
    message2["To"] = sender
    message2["Subject"] = "Updated Attendence"

    # Add CSV file
    with open("data.csv", "r", encoding="utf-8") as f:
        message2.attach(MIMEApplication(f.read(), Name="data.csv", encoding="utf-8"))

    # Send message
    with smtplib.SMTP(server, port) as server:
        server.starttls()
        server.login(username, password)
        server.sendmail(username, reciever, message1.as_string())
        server.sendmail(username, username, message2.as_string())


# Call main function
main(sys.argv[1], sys.argv[2])
