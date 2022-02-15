# Kubernetes Commands

```sh
#minikube demo
minikube start | stop | delete
kubectl get all | nodes | pods | services | replicaset |  -o wide
kubectl describe pod <podname>
kubectl config get-contexts
kubectl run hello-kubernetes --image=k8s.gcr.io/echoserver:1.4 --port=8080
kubectl expose deployment hello-kubernetes --type=NodePort
kubectl get service hello-kubernetes

#to get cluster information 
cat ~/.kube/config
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.4
kubectl expose deployment hello-minikube --type=NodePort --port=8080
minikube service hello-minikube  --url

minikube start -p cluster2 #create an other cluster
minikube delete -p cluster2 # delete existing cluster

kubectl config get-contexts # get list of contexts
kubectl config use-context minikube # set the context

kubectl run hello-kubernetes --image=k8s.gcr.io/echoserver:1.4 --port=8080 
kubectl expose pod  hello-kubernetes --type=NodePort
minikube service hello-kubernetes  --url
```
