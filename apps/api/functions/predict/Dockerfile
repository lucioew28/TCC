FROM public.ecr.aws/lambda/python:3.10

ARG REGION=${REGION:-"us-east-1"}
ENV AWS_REGION=${REGION}

ARG STAGE_ARG=${STAGE_ARG:-"dev"}
ENV STAGE=${STAGE_ARG}

COPY predict.py   ./
COPY requirements.txt ./

RUN pip3 install -r requirements.txt

CMD ["predict.handler"]