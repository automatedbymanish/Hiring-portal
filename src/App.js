import { useEffect, useState, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background: #f0f4ff;
    min-height: 100vh;
  }

  .portal-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #e8f0fe 0%, #fce8f3 50%, #e8fef0 100%);
    padding: 30px 20px 60px;
  }

  /* ── HEADER ── */
  .portal-header {
    text-align: center;
    margin-bottom: 36px;
  }
  .portal-header .badge {
    display: inline-block;
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 18px;
    border-radius: 50px;
    margin-bottom: 14px;
  }
  .portal-header h1 {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(26px, 5vw, 42px);
    font-weight: 900;
    color: #1a1d3b;
    line-height: 1.15;
  }
  .portal-header h1 span {
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .portal-header p {
    margin-top: 8px;
    color: #6b7280;
    font-size: 15px;
  }

  /* ── CARD ── */
  .card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(79,142,247,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
    padding: 36px 32px;
  }

  /* ── FORM CARD ── */
  .form-card {
    max-width: 480px;
    margin: 0 auto;
  }
  .form-card h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #1a1d3b;
    margin-bottom: 6px;
    text-align: center;
  }
  .form-card .subtitle {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 28px;
  }

  .field-group {
    margin-bottom: 16px;
  }
  .field-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .field-group input,
  .field-group select {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    color: #111827;
    background: #f9fafb;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .field-group input:focus,
  .field-group select:focus {
    border-color: #4f8ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,142,247,0.12);
  }
  .field-group select {
    cursor: pointer;
  }

  .btn-start {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,142,247,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-start:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,142,247,0.40);
  }
  .btn-start:active { transform: translateY(0); }

  /* ── EXAM LAYOUT ── */
  .exam-wrapper { max-width: 860px; margin: 0 auto; }

  /* ── EXAM TOPBAR ── */
  .exam-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
  }
  .topbar-info h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1d3b;
  }
  .topbar-info .post-tag {
    display: inline-block;
    background: linear-gradient(90deg, #e0eaff, #ede0ff);
    color: #4f3fa0;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 12px;
    border-radius: 50px;
    margin-left: 8px;
  }
  .topbar-info p {
    color: #6b7280;
    font-size: 13px;
    margin-top: 4px;
  }

  .timer-box {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border: 1.5px solid #fca5a5;
    color: #b91c1c;
    padding: 10px 20px;
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 1px;
    min-width: 110px;
    text-align: center;
  }
  .timer-box.warning {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-color: #fbbf24;
    color: #92400e;
    animation: pulse 1s infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
  }

  /* ── PROGRESS BAR ── */
  .progress-wrap {
    background: #e5e7eb;
    border-radius: 50px;
    height: 7px;
    margin-bottom: 24px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    border-radius: 50px;
    transition: width 0.4s;
  }
  .progress-label {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 6px;
    text-align: right;
  }

  /* ── QUESTION CARD ── */
  .question-card {
    margin-bottom: 18px;
    border: 1.5px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    padding: 26px 28px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s;
  }
  .question-card:hover {
    box-shadow: 0 6px 24px rgba(79,142,247,0.10);
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
  }
  .q-number {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 14px;
  }
  .q-text {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    line-height: 1.6;
    flex: 1;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 540px) {
    .options-grid { grid-template-columns: 1fr; }
    .card { padding: 24px 18px; }
  }

  .option-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #374151;
    background: #f9fafb;
    transition: border-color 0.15s, background 0.15s;
    user-select: none;
  }
  .option-label:hover {
    border-color: #4f8ef7;
    background: #eff6ff;
    color: #1d4ed8;
  }
  .option-label input[type="radio"] { display: none; }
  .option-label input[type="radio"]:checked + .opt-badge {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-color: transparent;
  }
  .option-label:has(input:checked) {
    border-color: #4f8ef7;
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 600;
  }
  .opt-badge {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 11px;
    color: #6b7280;
    transition: background 0.15s, color 0.15s;
  }

  /* ── SUBMIT BUTTON ── */
  .btn-submit {
    display: block;
    margin: 36px auto 0;
    padding: 15px 50px;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 17px;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(22,163,74,0.28);
    transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
    letter-spacing: 0.5px;
    min-width: 220px;
  }
  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(22,163,74,0.38);
  }
  .btn-submit:disabled {
    cursor: not-allowed;
    background: linear-gradient(135deg, #6b7280, #4b5563);
    box-shadow: none;
  }

  /* ── SUBMITTING OVERLAY ── */
  .submit-overlay {
    position: fixed;
    inset: 0;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(6px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .submit-spinner {
    width: 64px;
    height: 64px;
    border: 5px solid #e5e7eb;
    border-top-color: #16a34a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .submit-overlay h3 {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1d3b;
  }
  .submit-overlay p {
    font-size: 13px;
    color: #6b7280;
    margin-top: -12px;
  }
  .submit-dots span {
    display: inline-block;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #16a34a;
    margin: 0 3px;
    animation: dotBounce 1.2s infinite ease-in-out;
  }
  .submit-dots span:nth-child(2) { animation-delay: 0.2s; }
  .submit-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1.1); opacity: 1; }
  }

  /* ── RESULT CARD ── */
  .result-card {
    text-align: center;
    padding: 44px 32px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 8px 32px rgba(79,142,247,0.12);
    margin-top: 36px;
  }
  .result-icon {
    font-size: 56px;
    margin-bottom: 16px;
  }
  .result-score {
    font-family: 'Nunito', sans-serif;
    font-size: 48px;
    font-weight: 900;
    color: #1a1d3b;
    margin-bottom: 4px;
  }
  .result-score span {
    font-size: 24px;
    color: #9ca3af;
  }
  .result-verdict {
    display: inline-block;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 3px;
    padding: 8px 32px;
    border-radius: 50px;
    margin-top: 12px;
  }
  .verdict-pass {
    background: #dcfce7;
    color: #15803d;
    border: 2px solid #86efac;
  }
  .verdict-fail {
    background: #fee2e2;
    color: #b91c1c;
    border: 2px solid #fca5a5;
  }
  .result-msg {
    margin-top: 14px;
    color: #6b7280;
    font-size: 14px;
  }

  /* ── INSTRUCTIONS POPUP ── */
  .popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 15, 40, 0.72);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .popup-box {
  background: #fff;
  border-radius: 24px;
  padding: 36px 32px 32px;
  max-width: 520px;
  width: 100%;

  max-height: 90vh;
  overflow-y: auto;

  box-shadow: 0 24px 64px rgba(79,142,247,0.18);
  animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
  @keyframes popIn {
    from { transform: scale(0.88); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  .popup-icon {
    width: 58px;
    height: 58px;
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    margin: 0 auto 16px;
  }
  .popup-box h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 21px;
    font-weight: 900;
    color: #1a1d3b;
    text-align: center;
    margin-bottom: 6px;
  }
  .popup-box .popup-sub {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 24px;
  }
  .rules-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-bottom: 28px;
  }
  .rules-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
  }
  .rule-badge {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    margin-top: 1px;
  }
  .rule-badge.red   { background: #fee2e2; }
  .rule-badge.amber { background: #fef3c7; }
  .rule-badge.blue  { background: #dbeafe; }
  .rule-badge.green { background: #dcfce7; }
  .rule-badge.purple{ background: #ede9fe; }
  .rule-text strong {
    display: block;
    font-weight: 700;
    color: #111827;
    font-size: 13.5px;
  }
  .rule-text span {
    color: #6b7280;
    font-size: 12.5px;
  }
  .popup-warning {
    background: linear-gradient(90deg, #fef3c7, #fff7ed);
    border: 1.5px solid #fbbf24;
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 12.5px;
    color: #92400e;
    text-align: center;
    margin-bottom: 20px;
    font-weight: 600;
  }
  .btn-agree {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,142,247,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
    letter-spacing: 0.3px;
  }
  .btn-agree:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,142,247,0.40);
  }

  /* ── STEPS ── */
  .steps {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #9ca3af;
    font-weight: 600;
  }
  .step.active { color: #4f8ef7; }
  .step-dot {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800;
    color: #9ca3af;
  }
  .step.active .step-dot {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
  }
  .step-line {
    width: 24px; height: 2px;
    background: #e5e7eb;
  }
`;

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateMobile, setCandidateMobile] = useState("");
  // view: "login" | "exam" | "result"
  const [view, setView] = useState("login");
  const [score, setScore] = useState(null);
  const [totalQs, setTotalQs] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [answered, setAnswered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const apiUrl =
    "https://script.google.com/macros/s/AKfycbw9CwfoRDhDc22k3NzecXDOJpbW6IQYz9nTbClJNGr21lGfMEU4N9j_IvXgMRHPU9JP/exec";

  // Fetch questions on mount
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDepartment(dept) {
    setSelectedDept(dept);
    const filtered = questions.filter((q) => q.department === dept);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setFilteredQuestions(shuffled.slice(0, 10));
    setScore(null);
  }

  function startExam() {
    if (!candidateName || !candidateEmail || !candidateMobile || !selectedDept) {
      alert("Please fill all details before starting.");
      return;
    }
    // Pehle instructions popup dikhao
    setShowInstructions(true);
  }

  function agreeAndStart() {
    setShowInstructions(false);
    setView("exam");
  }

  // ── submitTest defined with useCallback (no useEffect inside) ──
  const submitTest = useCallback(() => {
    setIsSubmitting(true);
    let total = 0;
    filteredQuestions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.correct) total++;
    });
    const finalResult = total >= 6 ? "PASS" : "FAIL";
    setScore(total);
    setTotalQs(filteredQuestions.length);
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        name: candidateName,
        email: candidateEmail,
        mobile: candidateMobile,
        post: selectedDept,
        score: total + "/" + filteredQuestions.length,
        result: finalResult,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setIsSubmitting(false);
        setView("result");
      })
      .catch(() => {
        setIsSubmitting(false);
        setView("result");
      });
  }, [filteredQuestions, candidateName, candidateEmail, candidateMobile, selectedDept, apiUrl]);

  // ── Security: Tab switch / copy-paste / PrintScreen — exam ke dauran ──
  useEffect(() => {
    if (view !== "exam") return;

    const handleVisibility = () => {
      if (document.hidden) {
        alert("Security violation detected! Your test has been auto submitted.");
        submitTest();
      }
    };

    const blockCopyPaste = (e) => {
      e.preventDefault();
    };

    const handleKey = (e) => {
      if (e.key === "PrintScreen") {
        alert("Screenshot detected! Your test has been terminated.");
        submitTest();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("copy", blockCopyPaste);
    document.addEventListener("paste", blockCopyPaste);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("copy", blockCopyPaste);
      document.removeEventListener("paste", blockCopyPaste);
      document.removeEventListener("keydown", handleKey);
    };
  }, [view, submitTest]);

  // ── Timer ──
  useEffect(() => {
    if (view === "exam" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearInterval(timer);
    }
    if (view === "exam" && timeLeft === 0) {
      alert("Time Up! Test Submitted Automatically.");
      submitTest();
    }
  }, [view, timeLeft, submitTest]);

  function countAnswered() {
    let c = 0;
    filteredQuestions.forEach((_, i) => {
      if (document.querySelector(`input[name="q${i}"]:checked`)) c++;
    });
    setAnswered(c);
  }

  function resetForNewCandidate() {
    setCandidateName("");
    setCandidateEmail("");
    setCandidateMobile("");
    setSelectedDept("");
    setFilteredQuestions([]);
    setScore(null);
    setTotalQs(0);
    setTimeLeft(1800);
    setAnswered(0);
    setIsSubmitting(false);
    setShowInstructions(false);
    setView("login");
  }

  const departments = [...new Set(questions.map((q) => q.department))];
  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");
  const isWarning = timeLeft <= 300;
  const progressPct = filteredQuestions.length
    ? Math.round((answered / filteredQuestions.length) * 100)
    : 0;

  return (
    <>
      <style>{styles}</style>
      {/* ── INSTRUCTIONS POPUP ── */}
      {showInstructions && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">⚠️</div>
            <h2>Exam Instructions</h2>
            <p className="popup-sub">Please read all rules carefully before starting</p>
            <ul className="rules-list">
              <li>
                <span className="rule-badge red">🚫</span>
                <span className="rule-text">
                  <strong>No Tab Switching</strong>
                  <span>Do not minimize or switch to any other tab/window — test will auto-submit.</span>
                </span>
              </li>
              <li>
                <span className="rule-badge amber">📋</span>
                <span className="rule-text">
                  <strong>No Copy / Paste</strong>
                  <span>Copying or pasting any content during the exam is strictly prohibited.</span>
                </span>
              </li>
              <li>
                <span className="rule-badge purple">📸</span>
                <span className="rule-text">
                  <strong>No Screenshots</strong>
                  <span>Taking a screenshot (PrintScreen) will immediately terminate your test.</span>
                </span>
              </li>
              <li>
                <span className="rule-badge blue">📱</span>
                <span className="rule-text">
                  <strong>No Mobile Capture</strong>
                  <span>Do not use your mobile phone to photograph or record the questions.</span>
                </span>
              </li>
              <li>
                <span className="rule-badge amber">🪑</span>
                <span className="rule-text">
                  <strong>Stay at Your Seat</strong>
                  <span>Do not leave or move from your designated sitting place during the exam.</span>
                </span>
              </li>
              <li>
                <span className="rule-badge green">👁️</span>
                <span className="rule-text">
                  <strong>No One Behind You</strong>
                  <span>Ensure that no person is standing or sitting behind you while attempting the test.</span>
                </span>
              </li>
            </ul>
            <div className="popup-warning">
              ⚠️ Any violation may lead to immediate disqualification
            </div>
            <button className="btn-agree" onClick={agreeAndStart}>
              ✅ I Agree — Start My Test
            </button>
          </div>
        </div>
      )}

      <div className="portal-wrapper">

        {/* Header */}
        <div className="portal-header">
          <div className="badge">🏢 KSK Hiring Portal</div>
          <h1>Online <span>Examination</span> System</h1>
          <p>Professional Assessment Platform — Attempt all questions carefully</p>
        </div>

        {/* ── VIEW 1: LOGIN ── */}
        {view === "login" && (
          <>
            <div className="steps">
              <div className="step active">
                <div className="step-dot">1</div>
                <span>Fill Details</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <div className="step-dot">2</div>
                <span>Attempt Test</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <div className="step-dot">3</div>
                <span>View Result</span>
              </div>
            </div>

            <div className="card form-card">
              <h2>Candidate Details</h2>
              <p className="subtitle">Fill in your information to begin the test</p>

              <div className="field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@email.com"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={candidateMobile}
                  onChange={(e) => setCandidateMobile(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label>Applied Post</label>
                <select value={selectedDept} onChange={(e) => handleDepartment(e.target.value)}>
                  <option value="">— Select Department / Post —</option>
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <button className="btn-start" onClick={startExam}>
                🚀 Start Test
              </button>
            </div>
          </>
        )}

        {/* ── VIEW 2: EXAM ── */}
        {view === "exam" && (
          <div className="exam-wrapper">

            <div className="card exam-topbar">
              <div className="topbar-info">
                <h2>
                  {candidateName}
                  <span className="post-tag">{selectedDept}</span>
                </h2>
                <p>📋 {filteredQuestions.length} Questions &nbsp;|&nbsp; Answer all carefully</p>
              </div>
              <div className={`timer-box ${isWarning ? "warning" : ""}`}>
                ⏱ {mins}:{secs}
              </div>
            </div>

            <div>
              <div className="progress-label">{answered} of {filteredQuestions.length} answered</div>
              <div className="progress-wrap">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {filteredQuestions.map((q, index) => (
              <div className="question-card" key={index} onChange={countAnswered}>
                <div className="q-header">
                  <div className="q-number">{index + 1}</div>
                  <div className="q-text">{q.question}</div>
                </div>
                <div className="options-grid">
                  {[
                    { key: "A", text: q.optionA },
                    { key: "B", text: q.optionB },
                    { key: "C", text: q.optionC },
                    { key: "D", text: q.optionD },
                  ].map(({ key, text }) => (
                    <label className="option-label" key={key}>
                      <input type="radio" name={`q${index}`} value={key} />
                      <span className="opt-badge">{key}</span>
                      {text}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button className="btn-submit" onClick={submitTest} disabled={isSubmitting}>
              {isSubmitting ? "⏳ Submitting..." : "✅ Submit Test"}
            </button>

            {isSubmitting && (
              <div className="submit-overlay">
                <div className="submit-spinner" />
                <h3>Submitting Your Test...</h3>
                <p>Please wait, do not close this page</p>
                <div className="submit-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── VIEW 3: RESULT ── */}
        {view === "result" && (
          <div className="exam-wrapper">
            <div className="result-card">
              <div className="result-icon">
                {score >= 6 ? "🎉" : "📝"}
              </div>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
                {candidateName} &nbsp;·&nbsp; {selectedDept}
              </p>
              <div className="result-score">
                {score} <span>/ {totalQs}</span>
              </div>
              <div className={`result-verdict ${score >= 6 ? "verdict-pass" : "verdict-fail"}`}>
                {score >= 6 ? "✓ PASS" : "✗ FAIL"}
              </div>
              <p className="result-msg">
                {score >= 6
                  ? "Congratulations! You have cleared the test. Our team will contact you soon."
                  : "You did not meet the passing criteria. Better luck next time!"}
              </p>

              <button
                className="btn-start"
                style={{ marginTop: "28px", maxWidth: "260px" }}
                onClick={resetForNewCandidate}
              >
                👤 New Candidate Login
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}