// Tab Switching Logic
const inputTabBtn = document.getElementById("inputTabBtn");
const terminalTabBtn = document.querySelectorAll(".tab")[0];
const outputView = document.getElementById("output-container");
const inputField = document.getElementById("input_data");
 
inputTabBtn.addEventListener("click", () => {
    inputTabBtn.classList.add("active");
    terminalTabBtn.classList.remove("active");
    inputField.classList.remove("hidden");
    outputView.classList.add("hidden");
});
 
terminalTabBtn.addEventListener("click", () => {
    terminalTabBtn.classList.add("active");
    inputTabBtn.classList.remove("active");
    outputView.classList.remove("hidden");
    inputField.classList.add("hidden");
});
 
// Update Filename based on selection
document.getElementById("language").addEventListener("change", function() {
    const names = { python: "main.py", cpp: "main.cpp", javascript: "index.js" };
    document.getElementById("current-filename").innerText = names[this.value];
});
 
// Execution Logic
async function runCode() {
    const language = document.getElementById("language").value;
    const code = document.getElementById("code").value;
    const input_data = document.getElementById("input_data").value;
    const outputBox = document.getElementById("output");
 
    // UI Feedback: Force terminal view
    terminalTabBtn.click();
 
    if (!code.trim()) {
        outputBox.innerHTML = '<span style="color: #f87171;">⚠ Please write some code first.</span>';
        return;
    }
 
    outputBox.innerHTML = '<span style="color: #60a5fa;">⏳ Running...</span>';
 
    try {
        const response = await fetch("http://127.0.0.1:8000/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ language, code, input_data })
        });
 
        const result = await response.json();
       
        // Success style or error style
        if (result.error) {
            outputBox.innerHTML = `<span style="color: #f87171;">${result.error}</span>`;
        } else {
            outputBox.innerText = result.output || "Program finished with no output.";
        }
 
    } catch (error) {
        outputBox.innerHTML = '<span style="color: #f87171;">❌ Connection Error: Ensure backend is running at :8000</span>';
    }
}
 
// Generate simple line numbers
const textarea = document.getElementById('code');
const lineNumbersEle = document.getElementById('line-numbers');
 
textarea.addEventListener('input', () => {
    const lines = textarea.value.split('\n').length;
    lineNumbersEle.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
});
 
// Initialize line numbers
lineNumbersEle.innerHTML = "1<br>2<br>3<br>4";
 