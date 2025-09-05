import os
import logging
import psycopg2
from tqdm import tqdm
from llama_cpp import Llama

# === Setup Logging ===
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# === Load username from environment ===
USERNAME = os.getenv("LOGGED_IN_USER")

if not USERNAME:
    logging.error("❌ LOGGED_IN_USER not found. Aborting report generation.")
    exit(1)

logging.info(f"🔹 Generating soft skill report for user: {USERNAME}")

# === Load GGUF model ===
MODEL_PATH = "./models/Meta-Llama-3-8B-Instruct.Q4_K_M.gguf"  # Ensure this file exists

try:
    llm = Llama(
        model_path=MODEL_PATH,
        n_ctx=2048,
        n_threads=4,   # adjust depending on your CPU
        verbose=False
    )
    logging.info("✅ LLaMA 3 model loaded successfully.")
except Exception as e:
    logging.error(f"❌ Failed to load model: {e}")
    exit(1)

# === Database config ===
DB_CONFIG = {
    "dbname": "major",
    "user": "postgres",
    "password": "shivanirao1710",
    "host": "localhost",
    "port": "5432"
}

# === Connect to DB and process ===
try:
    with psycopg2.connect(**DB_CONFIG) as conn:
        with conn.cursor() as cur:
            # Fetch user's interview answers
            cur.execute(
                "SELECT question, answer FROM interview_answers WHERE username = %s",
                (USERNAME,)
            )
            rows = cur.fetchall()

            if not rows:
                logging.warning("⚠️ No interview answers found for this user.")
                exit(0)

            # Clear old report entries
            cur.execute("DELETE FROM soft_skill_analysis WHERE username = %s", (USERNAME,))
            logging.info("🗑️ Old soft skill analysis deleted.")

            for question, answer in tqdm(rows, desc="Analyzing answers"):
                if not answer or not answer.strip():
                    continue

                # Trim very long answers
                if len(answer.split()) > 200:
                    answer = " ".join(answer.split()[:200]) + "..."

                prompt = f"""
You are a behavioral analyst. Analyze the following interview answer and write a concise, professional behavioral insight paragraph that reflects the candidate's mindset, soft skills, and EMI (Entrepreneurial Mindset Index) traits.

Soft Skills: Problem Solving, Critical Thinking, Creative Thinking, Communication, Social Influence, Empathy  
EMI Traits: Internal Locus of Control, Emotional Intelligence, Innovation, Leadership, Ambition  

Candidate's Answer: "{answer}"

Write only one short, polished paragraph (4–6 sentences). Do not use bullet points, disclaimers, or labels—only the paragraph.
"""

                try:
                    result = llm(
                        prompt,
                        max_tokens=256,
                        stop=["</s>"]
                    )["choices"][0]["text"].strip()

                    if not result:
                        result = "Analysis unavailable (empty response from model)."

                except Exception as e:
                    logging.error(f"❌ Error during LLM generation: {e}")
                    result = "Analysis unavailable due to processing error."

                cur.execute(
                    """
                    INSERT INTO soft_skill_analysis (username, question, answer, analysis)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (USERNAME, question.strip(), answer.strip(), result)
                )

            conn.commit()
            logging.info("🎯 Report generation complete. Data saved to soft_skill_analysis.")

except Exception as e:
    logging.error(f"❌ Database or processing error: {e}")
    exit(1)
