## This is the modified repository.

# Link to the deployed project
- https://glittery-caramel-811fbd.netlify.app

# How to check out the project
- You can look at the final details section below to see how it works. There are pictoral representations on the steps needed.
- You can click the link above at the Deployed project section.



# The Last Show

In this assignment, you will create a full stack application with React and AWS that generates obituaries for people (fictional or otherwise). You will use [ChatGPT](https://openai.com/blog/chatgpt) to generate an obituary, [Amazon Polly](https://aws.amazon.com/polly/) to turn the obituary into speech, and [Cloudinary](https://cloudinary.com/) to store the speech and a picture of the deceased (may they rest in peace).

## Architecture Overview

<br/>
<p align="center">
  <img src="https://res.cloudinary.com/mkf/image/upload/v1680411648/last-show_dvjjez.svg" alt="the-last-show-architecture" width="800"/>
</p>
<br/>

## :foot: Steps

- Make sure to see the demo video on D2L
- Clone the repo
- Make sure you're inside the root directory of the repo and then run `npm install` to install all the necessary packages
- Run `npm start` and you should be able to see the page open up on your default browser
- Add your infrastructure code in the `main.tf` file
- Add your function code for the `get-obituaries-<your-ucid>` function in the [`functions/get-obituaries/main.py`](functions/get-obituaries/main.py) file
- Add your function code for the `create-obituary-<your-ucid>` function in the [`functions/create-obituary/main.py`](functions/create-obituary/main.py) file
- Push your changes to the `main` branch before the deadline to be graded
- This assignment has a DEMO component that's 50% of the grade

## :page_with_curl: Notes

- You must create all your resources on AWS with Terraform. Put all your configuration in the [`main.tf`](infra/main.tf) file
- You must use AWS DynamoDB for the database
- You must use [Lambda Function URLs](https://masoudkarimif.github.io/posts/aws-lambda-function-url/) for this assignment to connect your backend to the frontend
- You must create 2 Lambda functions for this assignment:

  - `get-obituaries-<your-ucid>`: to retrieve all the obituaries. Function URL only allows `GET` requests
  - `create-obituary-<your-ucid>`: to create a new obituary. The function reads all the data (including the picture) from the body of the request. Function URL only allows `POST` requests

- You must use Python to write the functions
- The only external libraries allowed to be used in the functions are [`requests`](https://pypi.org/project/requests/) for sending HTTPS requests to ChatGPT and Cloudinary, and [requests-toolbelt](https://pypi.org/project/requests-toolbelt/) for decoding the body of the request received from the front-end. No other external libraries are allowed
- You must use the [Cloudinary Upload API](https://cloudinary.com/documentation/image_upload_api_reference) and **not the SDK** to interact with Cloudinary. You will need to generate a signature for your requests. See how you can do it [here](https://cloudinary.com/documentation/upload_images#generating_authentication_signatures)
- You must use the [ChatGPT API](https://platform.openai.com/docs/api-reference/making-requests) and **not the SDK** to interact with ChatGPT
- To interact with Cloudinary and ChatGPT, you need keys. You must use [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) and the `SecureString` data type to store the keys for your Cloudinary and ChatGPT accounts. The `create-obituary` Lambda function will read the keys from the Parameter Store using the `boto3` library. The keys must not be present in your application or infra code in the repo. You can create these keys using the AWS CLI, or manually on the AWS Console. Read more about the AWS Systems Manager API [here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ssm.html#client). Depending on your solution, you need one of these two methods: [`get_parameters`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ssm/client/get_parameters.html) or [`get_parameters_by_path`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ssm/client/get_parameters_by_path.html). The Demo uses the last one
- You must use [Amazon Polly](https://aws.amazon.com/polly/) to turn the obituary written by ChatGPT to speech and then upload the `mp3` version of that to Cloudinary. Read more about the Polly API [here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/polly.html). What you need is the [`synthesize_speech`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/polly/client/synthesize_speech.html) method
- The Demo uses the `text-curie-001` model from ChatGPT. Feel free to use another [model](https://platform.openai.com/docs/models/gpt-3). Be careful about the cost of the model you choose!
- The Demo sets the `max_tokens` to 600. However, you could change this number as long as it still works properly. You don't have to go over 600. Bigger numbers are more expensive!
- The Demo uses the [Completions API](https://platform.openai.com/docs/api-reference/completions) and not the [Chat API](https://platform.openai.com/docs/api-reference/chat), as the application doesn't need to have a continuous discussion with the model. This makes the application less expensive. However, feel free to use the Chat API instead
- The Demo uses the following prompt to interact with the model: `write an obituary about a fictional character named {name} who was born on {born_year} and died on {died_year}.` You may use a different prompt as long as it still works
- The Demo uses FlexBox for the layout. However, feel free to use another approach or framework
- The Demo uses Joanna as the voice id for the speech. Feel free to use another [voice id](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)
- The Demo uses the `e_art:zorro` enhancement from Cloudinary to create black edges for the picture. Read more [here](https://cloudinary.com/documentation/effects_and_artistic_enhancements). You only need to add `e_art:zorro` in a certain part of the image URL
- You probably need to set a bigger timeout for your Lambda function, as it takes ChatGPT a few seconds to generate an obituary. The default timeout is 3 seconds. You can set the timeout to 20
- The Demo uses a font from the Google Fonts library named [Satisfy](https://fonts.google.com/specimen/Satisfy?query=satisfy) to show the obituaries on the front-end,
- The Demo doesn't use any external library for the front-end
- In order to get the full mark, you need to **DEMO your work in PERSON**. You could either demo it to a TA or the instructor. Demo is 50% of the assignment




  ## : Final Details
  

  
  This is the first page of the application. You can add a new obituary.
  <img width="1511" alt="Screenshot 2023-08-27 at 9 20 22 PM" src="https://github.com/Bobinho100/Obituary-Album/assets/114113147/4581cb91-a038-4cfa-9fb0-1361fd1c243a">
  # A form displays, Ensure to fill the form
  
  <img width="1510" alt="Screenshot 2023-08-27 at 9 26 49 PM" src="https://github.com/Bobinho100/Obituary-Album/assets/114113147/d02abdf8-7a2f-4bd5-a869-d8129df4a3ae">

  
  ## The filled form

  <img width="1511" alt="Screenshot 2023-08-27 at 9 46 08 PM" src="https://github.com/Bobinho100/Obituary-Album/assets/114113147/f960aa55-478a-411d-8bc4-00a8b36bcc16">

  ## The result

  
  <img width="1512" alt="Screenshot 2023-08-27 at 9 40 22 PM" src="https://github.com/Bobinho100/Obituary-Album/assets/114113147/c9084dce-e894-4c39-a7ed-cc8d6dd6d1cf">

 # It uses Chat API to generate a prompt based on the name and date of your deceased fictional character.
  <img width="1508" alt="Screenshot 2023-08-27 at 9 42 23 PM" src="https://github.com/Bobinho100/Obituary-Album/assets/114113147/419d06b3-d732-455e-80b4-ec37806b9dd0">

  




