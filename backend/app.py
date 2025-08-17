# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import shlex

app = Flask(__name__)
CORS(app)

# ✅ Common instant medicine suggestions
COMMON_CASES = {
    "fever": "Take Paracetamol 500mg every 6–8 hours. Drink plenty of water. If fever persists more than 3 days, consult a doctor.",
    "cough": "Try Cough Syrup (Dextromethorphan) for dry cough. Drink warm fluids and rest.",
    "headache": "Take Ibuprofen 400mg or Paracetamol 500mg. Rest in a quiet, dark room.",
    "cold": "Take an antihistamine (Cetirizine). Stay warm and hydrated.",
    "acidity": "Take an antacid (Eno, Gelusil, or Omeprazole). Avoid spicy foods.",
    "stomach_pain": "Take a mild antispasmodic like Dicyclomine. Eat light, bland meals and stay hydrated.",
    "nausea": "Take Ondansetron 4mg if severe. Drink clear fluids and avoid oily foods.",
    "diarrhea": "Take Oral Rehydration Solution (ORS). Use Loperamide if not improving and consult a doctor if severe.",
    "constipation": "Increase fiber intake, drink plenty of water, and use mild laxatives like Psyllium husk if necessary.",
    "body_pain": "Take Ibuprofen 400mg or Paracetamol 500mg. Rest and apply warm compress if needed.",
    "sore_throat": "Gargle with warm salt water. Take Lozenges or Paracetamol for pain relief.",
    "allergy": "Take an antihistamine (Cetirizine or Loratadine). Avoid the allergen.",
    "vomiting": "Drink clear fluids. Take antiemetics like Ondansetron if severe.",
    "fatigue": "Ensure proper rest and balanced diet. Consider Multivitamins if necessary.",
    "insomnia": "Maintain good sleep hygiene. Use mild sedatives like Melatonin under guidance if needed.",
    "cold_flu": "Take Paracetamol for fever, antihistamines for runny nose, and rest well.",
    "back_pain": "Take Ibuprofen 400mg or Acetaminophen. Apply heat or mild stretches.",
    "joint_pain": "Take NSAIDs like Ibuprofen. Rest and avoid strain. Consult doctor if persistent.",
    "ear_pain": "Use pain relievers like Paracetamol. Keep ear dry and consult ENT if severe or prolonged.",
    "eye_irritation": "Use artificial tears or lubricating eye drops. Avoid rubbing eyes.",
    "skin_rash": "Apply hydrocortisone cream for mild rashes. Avoid scratching and consult dermatologist if severe.",
    "high_blood_pressure": "Monitor regularly. Take antihypertensives as prescribed. Reduce salt intake.",
    "low_blood_pressure": "Stay hydrated and eat small, frequent meals. Consult a doctor for underlying causes.",
    "diabetes_symptoms": "Monitor blood sugar. Maintain healthy diet, exercise, and take medications as prescribed.",
    "urinary_issues": "Stay hydrated. Use mild pain relief if needed. Consult doctor if burning, frequency, or blood present.",
    "cold_sores": "Apply antiviral creams like Acyclovir. Avoid touching the sores.",
    "acid_reflux": "Take antacids like Omeprazole. Avoid spicy and fatty foods. Eat small meals.",
    "heartburn": "Take antacids. Avoid lying down immediately after meals. Reduce caffeine and spicy foods.",
    "muscle_cramps": "Stretch gently and apply heat. Take magnesium supplements if needed.",
    "dehydration": "Drink plenty of water and oral rehydration salts. Avoid alcohol and caffeine.",
    "dizziness": "Sit or lie down immediately. Stay hydrated and eat small, frequent meals.",
    "anxiety": "Practice deep breathing and relaxation. Consult doctor if persistent.",
    "cold_hands_feet": "Keep warm, wear socks and gloves. Check circulation and consult doctor if frequent.",
    "minor_burn": "Cool the burn with running water, apply aloe vera or burn ointment. Avoid breaking blisters.",
    "minor_cut": "Clean with antiseptic, apply antibiotic ointment and bandage.",
    "sunburn": "Apply Aloe Vera gel or moisturizing cream. Avoid sun exposure until healed."
}


SYSTEM_PROMPT = """
You are a medical assistant.
Rules:
- Suggest only OTC (over-the-counter) medicines and home remedies.
- Be concise and clear.
- If symptoms are severe, tell the user to see a doctor immediately.
"""

@app.route("/")
def home():
    return "✅ Backend running"

@app.route("/api/doctor", methods=["POST"])
def doctor():
    try:
        data = request.get_json(force=True)
        message = data.get("message", "").strip().lower()
        if not message:
            return jsonify({"error": "No message provided"}), 400

        # ✅ Check for common cases first
        for symptom, reply in COMMON_CASES.items():
            if symptom in message:
                return jsonify({"response": reply})

        # ✅ Call Ollama safely
        try:
            model_name = "mistral:latest"
            prompt = f"{SYSTEM_PROMPT}\nUser: {message}\nAssistant:"

            cmd = f"ollama run {model_name}"
            proc = subprocess.Popen(
                shlex.split(cmd),  # Works safely on Windows
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )

            # Communicate with timeout
            try:
                out, err = proc.communicate(input=prompt, timeout=120)
            except subprocess.TimeoutExpired:
                proc.kill()
                out, err = "", "⚠️ Model timed out."

            if proc.returncode != 0:
                print("Ollama error:", err)
                reply = "⚠️ Model error. Fallback advice: rest, hydration, paracetamol/ibuprofen."
            else:
                reply = out.strip() or "⚠️ Model returned empty answer."

        except FileNotFoundError:
            reply = f"⚠️ Ollama not found. Fallback advice for '{message}': rest, fluids, paracetamol/ibuprofen."
        except Exception as e:
            print("Unexpected error:", e)
            reply = f"⚠️ Backend error: {str(e)}"

        # ✅ Ensure reply is never empty
        reply = reply or "⚠️ Sorry, I don't have advice for that. Please consult a doctor."

        return jsonify({"response": reply})

    except Exception as e:
        print("Request error:", e)
        return jsonify({"error": "Invalid request or server error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
