# Kubernetes Commands

```shell
#minikube demo
minikube start | stop | delete
kubectl get all | nodes | pods | services | replicaset |  -o wide
kubectl describe pod <podname>
kubectl config get-contexts
kubectl run hello-kubernetes --image=k8s.gcr.io/echoserver:1.4 --port=8080
kubectl expose deployment hello-kubernetes --type=NodePort
kubectl get service hello-kubernetes

#amazon Kops installation
kops create cluster --name=kubernates.newtech.academy --state=s3://kops-state-b429b --zones=eu-west-1a --node-size=t2.micro --master-size=t2.micro --dns-zone=kubernates.newtech.academy
kops update edit kubernates.newtech.academy xyz
kops update cluster kubernates.newtech.academy --yes

#build the docker and push it to Docker Hub
docker build .
docker build -t image_name . # build image with a name 
docker run -d --name container_name image_name #run container with a custom name

docker login
docker tag <imageid>  <Login name >/<image name>
docker push <Login name >/<image name>

kubectl create -f <filename>.yaml --record
kubectl apply -f <filename>.yaml

kubectl port-forward <pod name> 8081:3000 #it is better to use ELB

kubectl expose pod nodehelloworld.com --type=NodePort --name nodehelloworld-service #expose port as service
minikube service nodehelloworld-service --url #to get the service URL

kubectl attach nodehelloworld.com
kubectl exec nodehelloworld.com -- ls /app

kubectl run -i --tty busybox --image=busybox --rtart=Never -- sh #connect pod from an dummy pod

kubectl attach <pod name> -i
kubectl exec -it <pod name> --bash
kubectl logs <podname>
kubectl run -i busybox --image=busybox --restart=never --sh

kubectl delete pod <pod_name>

kubectl scale replicaset <replica-name> --replicas=2
kubectl scale deployment <deploy-name> --replicas=2

kubectl rollout undo <deplyment name>
kubectl rollout status
kubectl rollout history

minikube service <service-name> --url
```

```shell
    ssh-keygen -f .ssh/id_rsa
    cat .ssh/id_rsa.pub
```
