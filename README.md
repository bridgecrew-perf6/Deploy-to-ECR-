# express-mariadb-docker

This is an assessment.

Step 1. 

Created an API with a Get request, and Post request to return a value from a csv file that contain the below data.

I made use of mariadb mysql server to host the database, spin up a virtual machine to host the db, to optimize the compute resources.


Step 2;

I dockerized the application, then push the image created to the docker hub.

docker hub repository https://hub.docker.com/r/kehindeafusat/demo222/tags

Step 3: After dockering the application, I made use of Github Actions to deploy the app to ECS.

This step required that I make use oF AWS CLI, v2, created an access for the compute resources i needed on Aws, kept the access key id and secret access key in the GitHub secret, then I pushed the docker image into the ECR(elastic container registry).

Step 4: Created a cluster which crequired a service, definitation task, and EC2 instance 
container
task definition
servicename
clustername


