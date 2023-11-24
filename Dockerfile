FROM python:3.10

WORKDIR /code

RUN pip install flask

COPY . /code

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]