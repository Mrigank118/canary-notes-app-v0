
# Canary Notes App

## **🚀 AIM**

The **Canary Notes App** demonstrates a **Canary Deployment** in Kubernetes:

* Deploy a **frontend Notes App** using **Vite + React**.
* Run **Stable** and **Canary** versions simultaneously.
* Use **traffic splitting** to send most users to Stable and a few to Canary.
* Demonstrate **safe deployment** and **rollback** for new releases.

This is a **visual, cloud-native DevOps demo** showing how modern CI/CD pipelines handle incremental releases.

---

## **📦 Technology Stack**

* **Frontend:** React (Vite)
* **Containerization:** Docker
* **Deployment & Release Management:** Helm
* **Orchestration:** Kubernetes (Minikube)
* **Traffic Control:** Istio (optional for traffic splitting)
* **Image Registry:** Docker Hub

---

## **🛠 Project Structure**

```
canary-notes-app/
├── charts/ (if any sub-charts)
├── templates/ (Helm templates)
│   ├── deployment-stable.yaml
│   ├── deployment-canary.yaml
│   ├── service-stable.yaml
│   ├── service-canary.yaml
│   └── ingress.yaml
├── values.yaml
├── Dockerfile
├── src/
│   └── App.jsx (React Notes App)
└── package.json
```

---

## **⚡ Setup Steps**

### **1. Build & Push Docker Images**

```bash
# Stable
docker build -t notes-app:stable .
docker tag notes-app:stable mrigankwastaken/canary-notes-app:stable
docker push mrigankwastaken/canary-notes-app:stable

# Canary
docker build -t notes-app:canary .
docker tag notes-app:canary mrigankwastaken/canary-notes-app:canary
docker push mrigankwastaken/canary-notes-app:canary
```

---

### **2. Helm Deployment**

```bash
# Install Helm chart
helm install canary-notes ./canary-notes-app

# Or upgrade existing release
helm upgrade canary-notes ./canary-notes-app
```

Check pods/services:

```bash
kubectl get pods
kubectl get svc
```

---

### **3. Traffic Split (Optional: Istio)**

1. Install Istio demo profile:

```bash
istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled
```

2. Apply Gateway + VirtualService for 90% Stable / 10% Canary:

```bash
kubectl apply -f istio-virtualservice.yaml
```

3. Test traffic:

```bash
kubectl get svc istio-ingressgateway -n istio-system
curl http://<INGRESS_IP>/
```

* Refresh multiple times: most hits go to **Stable ✅**, some to **Canary 🚀**.

---

### **4. Rollback Canary**

```bash
helm rollback canary-notes 1
```

* Restores Stable deployment if Canary fails.

---
