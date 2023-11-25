FROM python:3.10

WORKDIR /code

RUN pip install flask

COPY . /code

CMD ["sh", "-c", "python3 -m flask run --host=0.0.0.0 --port=$PORT"]