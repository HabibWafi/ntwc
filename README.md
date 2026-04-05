# 🌾 Nusantara TwinChain  
### AI + Blockchain Platform for National Food Security

> 🇮🇩 Membangun fondasi ketahanan pangan Indonesia berbasis data, AI, dan transparansi blockchain

---

## 🚀 Overview

**Nusantara TwinChain** adalah platform nasional berbasis **Artificial Intelligence (AI)** dan **Blockchain** yang dirancang untuk melakukan:

- Tracking komoditas pertanian end-to-end  
- Analisis dan prediksi berbasis data  
- Transaksi langsung petani ke pasar  

Platform ini mengintegrasikan berbagai sumber data penting dalam satu ekosistem:

- 📊 BPS (KSA & Ubinan)  
- 🏢 Bulog  
- 🏛️ Dinas Pertanian Daerah  
- 🌾 Petani  
- 🛒 Konsumen  

Sehingga tercipta sistem pangan yang **transparan, real-time, dan terintegrasi secara nasional**.

---

## 🎯 Problem Statement

Indonesia menghadapi tantangan besar dalam ketahanan pangan:

- ❌ Data tersebar dan tidak terintegrasi  
- ❌ Disparitas harga antar wilayah tinggi  
- ❌ Rantai distribusi panjang & tidak efisien  
- ❌ Praktik penimbunan sulit dideteksi  
- ❌ Keputusan kebijakan lambat & tidak berbasis data real-time  

👉 Dampaknya:
- Petani dirugikan  
- Konsumen membayar lebih mahal  
- Pemerintah kesulitan mengambil keputusan strategis  

---

## 💡 Solution

**Nusantara TwinChain** menghadirkan solusi terpadu:

### 🧠 AI-Powered Decision System
- Prediksi harga komoditas  
- Prediksi hasil panen  
- Rekomendasi kebijakan berbasis data  
- Chatbot data (natural language query)

### 🔗 Blockchain Transparency
- Marketplace on-chain  
- Transaksi immutable & audit-ready  
- Traceability rantai pasok  

### 📊 Real-Time National Dashboard
- Produksi, stok, dan harga per wilayah  
- Monitoring inflasi pangan  
- Alert anomali & penimbunan  

### 🛒 Direct Marketplace
- Petani → Konsumen langsung  
- Memotong rantai distribusi berlebih  
- Harga lebih adil & transparan  

---

## 🧩 Key Features

| Feature | Description |
|--------|------------|
| 📡 Data Integration | Integrasi multi-stakeholder (BPS, Bulog, Petani, dll) |
| 📊 Dashboard Nasional | Visualisasi peta, chart, dan laporan |
| 🤖 AI Prediction | Forecast harga & panen |
| 🚨 Anomaly Detection | Deteksi penimbunan & lonjakan harga |
| 💬 AI Chatbot | Tanya data pakai bahasa natural |
| 🛒 Marketplace | Transaksi langsung berbasis blockchain |
| 🔔 Notification System | Alert via WA, SMS, Email |

---

## 🏗️ Architecture Overview

Platform dibangun dengan pendekatan **microservices + event-driven architecture**:

- API Gateway sebagai entry point
- Microservices untuk modular scalability
- Kafka untuk data streaming real-time
- AI Engine untuk analitik dan prediksi
- Blockchain untuk transparansi transaksi

📌 Diagram lengkap tersedia di PRD

---

## 🛠️ Tech Stack

### 🌐 Frontend
- Next.js 14
- Tailwind CSS
- Mapbox GL JS
- Recharts

### ⚙️ Backend
- NestJS (Microservices)
- Kong / Nginx API Gateway
- Apache Kafka

### 🤖 AI / ML
- Python FastAPI
- Prophet + LSTM
- Scikit-learn
- LangChain + LLM

### 🔗 Blockchain
- Hyperledger Fabric

### 🗄️ Data Layer
- PostgreSQL + PostGIS
- Redis
- MinIO
- EMQX (MQTT)

### ☁️ Infrastructure
- Docker
- Kubernetes
- Prometheus & Grafana
- ELK Stack

---

## 🔄 How It Works

### 1. INPUT
Data masuk dari:
- Petani & Dinas (manual / upload)
- Integrasi API (BPS, BMKG, dll)
- IoT sensor (MQTT)

### 2. PROCESS
- Data streaming via Kafka  
- Disimpan di PostgreSQL + PostGIS  
- Diproses oleh AI Engine:
  - Forecasting
  - Anomaly detection
  - Chatbot query  

- Transaksi marketplace dicatat di blockchain  

### 3. OUTPUT
- Dashboard interaktif  
- Alert notifikasi  
- Laporan AI-generated  
- Marketplace transparan  

---

## 🌍 Impact

### 🎯 Short Term (6–12 bulan)
- Dashboard pangan nasional real-time  
- Pilot di beberapa wilayah  
- Onboarding petani awal  

### 🚀 Mid Term (1–3 tahun)
- Penurunan disparitas harga 15–20%  
- Peningkatan pendapatan petani  
- Deteksi dini penimbunan  
- Sistem nasional berbasis data  

---

## 🧠 Innovation & Differentiation

Apa yang membuat Nusantara TwinChain unik?

✅ Integrasi data nasional + marketplace + AI + blockchain dalam 1 platform  
✅ Insight langsung dari ekosistem data BPS (KSA & Ubinan)  
✅ Bukan hanya dashboard → tapi **decision support system nasional**  
✅ Blockchain untuk transparansi yang bisa diaudit  

---

## 📖 Product Requirement Document (PRD)

Detail lengkap arsitektur, use case, dan desain sistem:

👉 **[Lihat PRD Nusantara TwinChain](./nusantara-twinchain-prd.md)**

---

## 🛠️ Getting Started

Jalankan development server:

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
