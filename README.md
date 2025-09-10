# Canary Notes App

## Overview

The **Canary Notes App** serves as a demonstration of **Canary Deployment** strategies in Kubernetes environments. The project showcases **incremental release deployment**, enabling teams to validate new versions of an application with limited exposure before a full rollout.

Key objectives:

* Deploy a **React-based Notes App** using **Vite**.
* Operate **Stable** and **Canary** versions concurrently.
* Implement **traffic segmentation** to direct the majority of traffic to Stable while selectively routing a subset to Canary.
* Illustrate **safe deployment practices** and **rollback procedures** in a Kubernetes CI/CD pipeline.

---

## Technology Stack

**Frontend:** React (Vite)
**Containerization:** Docker
**Deployment Management:** Helm
**Orchestration:** Kubernetes (Minikube)
**Traffic Management:** Istio (optional, for traffic splitting)
**Container Registry:** Docker Hub

---

## Project Structure

```
canary-notes-app/
├── charts/                # Optional sub-charts for Helm
├── templates/             # Helm manifests
│   ├── deployment-stable.yaml
│   ├── deployment-canary.yaml
│   ├── service-stable.yaml
│   ├── service-canary.yaml
│   └── ingress.yaml
├── values.yaml            # Helm values configuration
├── Dockerfile
├── src/
│   └── App.jsx            # React Notes App
└── package.json
```

---

## Setup and Deployment

### 1. Build and Push Docker Images

```bash
# Stable version
docker build -t notes-app:stable .
docker tag notes-app:stable mrigankwastaken/canary-notes-app:stable
docker push mrigankwastaken/canary-notes-app:stable

# Canary version
docker build -t notes-app:canary .
docker tag notes-app:canary mrigankwastaken/canary-notes-app:canary
docker push mrigankwastaken/canary-notes-app:canary
```

---

### 2. Deploy Helm Chart

```bash
# Initial installation
helm install canary-notes ./canary-notes-app

# Upgrade existing release
helm upgrade canary-notes ./canary-notes-app
```

Verify deployment:

```bash
kubectl get pods
kubectl get svc
```

---

### 3. Traffic Segmentation (Optional, Istio)

1. Install Istio with the demo profile:

```bash
istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled
```

2. Apply Istio Gateway and VirtualService configuration to achieve traffic split (e.g., 90% Stable, 10% Canary):

```bash
kubectl apply -f istio-virtualservice.yaml
```

3. Validate routing:

```bash
kubectl get svc istio-ingressgateway -n istio-system
curl http://<INGRESS_IP>/
```

---

### 4. Canary Rollback

If the Canary deployment exhibits instability, rollback to the previous stable release:

```bash
helm rollback canary-notes 1
```

This ensures system reliability and minimal user disruption.

---

### Notes

* Designed as a **cloud-native DevOps demonstration**.
* Emphasizes **incremental release deployment**, **traffic control**, and **rollback mechanisms**.
* Can be extended to **automated CI/CD pipelines** with monitoring, alerting, and performance analysis.

