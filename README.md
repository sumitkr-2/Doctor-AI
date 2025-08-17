```markdown
# Doctor AI 💊 - Medicine Suggestor


https://github.com/user-attachments/assets/c54f84e7-3900-41e5-88fd-520ca080fb73







Doctor AI is a full-stack web application that provides AI-powered medicine recommendations based on symptoms or diseases. It integrates **React.js** for the frontend, **Flask** for the backend, and the **Ollama AI model** as a virtual AI doctor. Users can also **talk to the AI doctor** and receive spoken advice.

---

## Features

- 🔹 **Symptom/Disease-based Medicine Recommendation** – Get suggested medicines based on input symptoms or disease.  
- 🔹 **AI Doctor Powered by Ollama** – Uses the Ollama model to provide intelligent, context-aware recommendations.  
- 🔹 **Voice Interaction with Doctor** – Talk to the AI doctor and receive spoken advice.  
- 🔹 **Common Cases Fallback** – Predefined instant advice for common symptoms like fever, cough, headache, etc.  
- 🔹 **Medicine Details** – View price, description, and images of medicines.  
- 🔹 **External Links** – Click on disease names to redirect to Wikipedia for more information.  
- 🔹 **Responsive Design** – Works on desktop and mobile devices.  

---
```

## Architecture


```
Frontend (React.js)
│
├─ Input form for symptoms/disease
├─ Voice interaction module
├─ Sends POST request to Flask backend
│
Backend (Flask)
│
├─ Endpoint: /api/doctor
├─ Checks COMMON\_CASES for predefined advice
├─ If no match, sends prompt to Ollama AI model
├─ Returns AI-generated or fallback advice
│
Ollama AI
│
└─ Provides context-aware medicine suggestions and guidance

````

---

## Technologies Used

- **Frontend:** React.js, HTML5, CSS3  
- **Backend:** Python Flask, Flask-CORS  
- **AI Integration:** Ollama AI (`mistral:latest`)  
- **Voice Interaction:** Browser Speech Recognition & Text-to-Speech APIs  
- **Styling:** CSS Flexbox & Grid  
- **Hosting (Optional):** Vercel / Netlify (frontend), Heroku / Railway / Local Flask (backend)  

---

## Installation

### Backend (Flask)

1. Clone the repository:

```bash
git clone https://github.com/your-username/doctor-ai.git
cd doctor-ai/backend
````

2. Install dependencies:

```bash
pip install flask flask-cors
```

3. Run the Flask server:

```bash
python app.py
```

The backend will run on [http://127.0.0.1:5000](http://127.0.0.1:5000).

### Frontend (React)

1. Navigate to the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Screenshots

<img width="1907" height="857" alt="image" src="https://github.com/user-attachments/assets/5af48729-846e-4618-b365-47a9c9c950fe" />
<img width="1894" height="876" alt="image" src="https://github.com/user-attachments/assets/b6f2f0af-db73-452f-837d-21bfdf0505ae" />

---

## Usage

1. Open the web app in your browser.
2. Enter a symptom or disease in the input box, or **talk to the AI doctor using the voice feature**.
3. Click the "Get Recommendation" button.
4. The backend checks **COMMON\_CASES** first, then queries **Ollama AI** if needed.
5. View AI-powered medicine suggestions with descriptions, prices, and images.
6. Click on disease names for detailed information on Wikipedia.

---

## Project Structure

```
doctor-ai/
├── backend/
│   ├── app.py         # Flask backend
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── assets/    # Images
│   │   ├── components/# React components
│   │   ├── css/       # Stylesheets
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## Future Enhancements / Scope

* Enhance **voice interaction** with natural language understanding for more conversational AI.
* Integrate with **online pharmacies** for real-time prices.
* Include **AI-based symptom analysis** for more accurate recommendations.
* Implement **user accounts** to save previous searches and recommendations.
* **Disease outbreak prediction** using historical data and AI/ML algorithms.
* **Regional disease & medicine analysis** – Track disease searches and medicine consumption in specific areas to help predict trends and prepare healthcare responses.
* Expand **Ollama AI capabilities** to provide detailed consultations, personalized health tips, and preventive care suggestions.
* Add **analytics dashboard** for doctors and health administrators to monitor trends.

---

## Author

**Sumit Kumar**

* GitHub: [https://github.com/sumitkr-2](https://github.com/sumitkr-2)
* LinkedIn: [https://www.linkedin.com/in/sumit-kumar2004](https://www.linkedin.com/in/sumit-kumar2004)

```
```
