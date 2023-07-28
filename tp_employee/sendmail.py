import requests

# Replace 'YOUR_API_KEY' with your actual SendinBlue API key
api_key = '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'
api_url = 'https://api.sendinblue.com/v3/smtp/email'

# Email data
sender_email = 'katasani.shashank48@gmail.com'
recipient_email = 'tsanusha23@gmail.com'
subject = 'Test Email'
content = '<p>This is a test email sent using the SendinBlue API.</p>'

# Compose the request headers
headers = {
    'Content-Type': 'application/json',
    'api-key': api_key
}

# Compose the email payload
data = {
    'sender': {'email': sender_email},
    'to': [{'email': recipient_email}],
    'subject': subject,
    'htmlContent': content
}

# Send the email using the SendinBlue API
response = requests.post(api_url, json=data, headers=headers)

# Check the response
if response.status_code == 201:
    print('Email sent successfully!')
else:
    print('Failed to send email. Status code:', response.status_code)
    print('Response:', response.text)
