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


kubectl run -i --tty busybox --image=busybox --restart=Never -- sh #connect pod from an dummy pod

kubectl attach <pod name> -i
kubectl exec -it <pod name> --bash
kubectl logs <podname>
kubectl run -i busybox --image=busybox --restart=never --sh


kubectl label node <nodename> <labelname> #Labelname should be set in nodeSelector

kubectl delete pod <pod_name>

kubectl scale replicaset <replica-name> --replicas=2
kubectl scale deployment <deploy-name> --replicas=2

kubectl rollout undo <deplyment name>
kubectl rollout status
kubectl rollout history

minikube service <service-name> --url

watch -n1 kubectl get pods
minikube service app-env-service --url | xargs curl

echo -n "password" | base64

```

```shell
    ssh-keygen -f .ssh/id_rsa
    cat .ssh/id_rsa.pub
```

# Docker Captain Kubernetes

```shell
kubectl get nodes -o json | jq ".items[] | {name : .metadata.name} + .status.capacity"

kubectl describe node/nodename 

kubectl api-resources #list all resource

kubectl explain node
kubectl explain node.spec
kubectl explain node --recursive

kubectl get pods #po
kubectl get namespaces #ns

kubectl get pods  --all-namespaces
kubectl get pods -n kube-system


kubectl create deployment pingpong --image alpine -- ping 1.1.1.1
kubectl run pingpong --image alpine ping 1.1.1.1
kubectl logs pods/pingpong
kubectl delete deployments/pingpong
kubectl delete pods/pingpong

kubectl scale deployment pingpong --replicas 3

kubectl create cronjob myjob --image=alpine --schedule="*/3 * * * *" --restart=OnFailure  -- sleep 10
kubectl get cronjobs
kubectl delete cronjob/myjob

kubectl logs -l pods/pingpong --tail 1 --follow 
kubectl logs -l pods/pingpong --tail 1 --f --timestamps

watch kubectl get po
kubectl get po -w # watch the pods if their status is changed.
kubectl create deployment httpenv --image=bretfisher/httpenv
kubectl scale deployment httpenv --replicas 10
kubectl expose deployment httpenv --port 8888
kubectl get svc httpenv

kubectl apply -f https://shpod.in/shpod.yaml #install shpod with admin account
kubectl attach --namespace=shpod -ti shpod


kubectl get svc httpenv -o go-template --template '{{ .spec.clusterIP }}'
IP=$(kubectl get svc httpenv -o go-template --template '{{ .spec.clusterIP }}')
curl http://$IP:8888 
curl -s http://$IP:8888 | jq .HOSTNAME #filter just Hostname

kubectl delete deployments.apps httpenv

kubectl describe svc httpenv
kubectl get endpoints -o yaml
kubectl get po -l app=httpenv -o wide 

watch kubectl get all --all-namespaces #see everything
```

## Docker Coin in DockerCompose

```shell
#DockerCoins in DockerCompose
curl -o dockercoins.yml https://k8smastery.com/dockercoins-compose.yml
docker-compose -f dockercoins.yml up
docker-compose -f dockercoins.yml down

```

## Docker Coin in Kubernetes

```shell
#DockerCoins in K8s
kubectl get deployments.apps -w
kubectl create deployment redis --image=redis
kubectl create deployment hasher --image=dockercoins/hasher:v0.1
kubectl create deployment rng --image=dockercoins/rng:v0.1
kubectl create deployment webui --image=dockercoins/webui:v0.1
kubectl create deployment worker --image=dockercoins/worker:v0.1

kubectl expose deployment redis --port 6379
kubectl expose deployment rng --port 80
kubectl expose deployment hasher --port 80
kubectl expose deployment webui --type=NodePort --port=80

kubectl scale deployment worker --replicas=2
kubectl scale deployment worker --replicas=10 #Reach the limit check HTTP connections
kubectl apply -f https://shpod.in/shpod.yaml 
kubectl attach --namespace=shpod -ti shpod
HASHER=$(kubectl get svc hasher -o go-template --template '{{ .spec.clusterIP }}')
RNG=$(kubectl get svc rng -o go-template --template '{{ .spec.clusterIP }}')
httping -c 3 $HASHER    #connected to 10.96.140.109:80 (210 bytes), seq=0 time=  1.04 ms
httping -c 3 $RNG          #connected to 10.103.247.1:80 (158 bytes), seq=0 time=749.05 ms

#do all operation with YAML File
kubectl apply -f https://k8smastery.com/dockercoins.yaml
kubectl apply -f https://k8smastery.com/insecure-dashboard.yaml

#DeamonSet
kubectl get deployments.apps rng -o yaml > rng.yml #Change kind: Deployment with DaemonSet 
kubectl get po -l app=rng #-l list with label
kubectl get po --selector app=rng

kubectl label  pods -l app=rng enabled=yes #add new label to pods

POD=$(kubectl get pod -l app=rng, pod-template-hash -o name )
kubectl logs --tail 1 --follow $POD

kubectl label pod -l  app=rng, pod-template-hash enabled-

#If there is a problem in Pods, dont delete it. it will be recreated.
#we can change their label to keep them up and run idle. it will be not attached any service.
#Then we can attach the debug tools,etc 
#one-shot pod: create a pod manually and you let pod collect data by changing its labels. 

kubectl delete -f https://k8smastery.com/dockercoins.yaml
kubectl delete ds/rng
kubectl delete -f https://k8smastery.com/insecure-dashboard.yaml
```

## How to create YAML file

```shell
#YAML
#Key/Value Pairs
#Array/List
#Dictionary/Maps

#apiVersion: kubectl api-versions
#kind: kubectl api-resources
#metadata:
#spec: kubectl describe pod

#Create a default YAML File with dry-run option
kubectl create namespace awesome-app -o yaml --dry-run --validate=false
kubectl create namespace awesome-app -o yaml --server-dry-run  --validate=false #all operation/check/validation is done except writing to ETCDB.
```

## Rolling Upgrade

```shell
#Rolling update: It is only for deployments/daemonsets/statefulsets. 
#create a new replicaset
#maxUnavailable and mxSurge: 
#minumum pods = replicas - maxUnavailable
#maximum pods = replicas + mxSurge

kubectl apply -f https://k8smastery.com/dockercoins.yaml
kubectl get deploy -o json | jq ".items[] | {name:.metadata.name} + .spec.strategy"

kubectl set image deployments worker worker=dockercoins/worker:v0.2

kubectl rollout status deploy worker
kubectl set image deployments worker worker=dockercoins/worker:v0.3 #v0.3 is not exist
kubectl rollout undo deployment worker
kubectl rollout history deployment worker

kubectl describe replicasets.apps -l app=worker | grep -A3 Annotations
kubectl rollout undo deployment worker --to-revision=1
```

## Health Check

```shell
#Health Check is per container
#Probes : liveness/readiness/startup(Alpha)
#handler: HTTP, TCP, Exec

#liveness: this is container alive
    #restartPolicy -> Never, OnFailure, Always
#Rediness: Ready to accept requests
#StartUp: prvious is InitialDelaySeconds

#Timing and Thresholds
#periodSeconds -> Default 10 
#timeoutSeconds -> Default 1 
#successThreshold -> Default 1 
#failureThreshold -> Default 3
#initialDelaySeconds -> Default 0
    livenessProbe:
          exec:
            command: ["redis-cli", "ping"]
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 1
# if there is no endpoint for worker container, health check can be done through logs and a success file. 
# health check will not check external serverices. it is just for contaniner. Dependecy can be implemented in container as /heathy end points
    
ab -c 10 -n 1000 http://IP/1
```
