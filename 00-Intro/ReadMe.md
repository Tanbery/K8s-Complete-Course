# Kubernetes Commands

```sh
#build the docker and push it to Docker Hub
docker build .
docker build -t loginname/image_name . # build image with a name 
docker run -d --name container_name loginname/image_name #run container with a custom name
docker run -p 3000:3000 -it loginname/image_name
curl localhost:3000

kubectl apply -f pod-app_env.yml #create a pod 
kubectl apply -f srv-app_env.yml #create a service
kubectl port-forward app-env.rose.com 8081:3100 # pod also can be exposed for a port
minikube service app-env-service --url | xargs curl #get a service URL and send curl command

#some useful commands
kubectl attach app-env.rose.com  #see the process and tty
kubectl exec app-env.rose.com -- ls /app
kubectl exec app-env.rose.com -- touch /app/test.txt

kubectl describe service app-env-service # get the detail information about service.. get endpoint info for busybox 
kubectl run -i --tty --image=busybox --restart=Never -- busybox # connect the pod 


kubectl scale deployment --replicas=4 hello-minikube #horizontally scale the nodes.. 

```
