function toggleTheme() {
    const isLight = document.body.classList.toggle("light-mode");
    const themeBtn = document.getElementById("theme-btn");
 
    themeBtn.innerText = isLight ? "☀️" : "🌙";
 
    localStorage.setItem(
        "omnirun-theme",
        isLight ? "light" : "dark"
    );
}
 
function switchPanel(panelName) {
    const panels = [
        "console-pane",
        "input-pane",
        "metrics-pane"
    ];
 
    panels.forEach(panel => {
        document.getElementById(panel).classList.add("hidden");
    });
 
    document
        .getElementById(`${panelName}-pane`)
        .classList.remove("hidden");
 
    document.querySelectorAll(".tab-link").forEach(button => {
        button.classList.remove("active");
 
        if (
            button.innerText.trim().toLowerCase() === panelName
        ) {
            button.classList.add("active");
        }
    });
}
 
function updateEditorMode() {
    const language = document.getElementById("language").value;
    const fileDisplay = document.getElementById("file-display");
 
    const files = {
        python: "main.py",
        cpp: "main.cpp",
        javascript: "app.js"
    };
 
    fileDisplay.innerText = files[language];
}
 
function handleInput() {
    const codeArea = document.getElementById("code");
    const gutter = document.getElementById("gutter");
 
    const lines = codeArea.value.split("\n").length;
 
    let lineNumbers = "";
 
    for (let i = 1; i <= lines; i++) {
        lineNumbers += i + "<br>";
    }
 
    gutter.innerHTML = lineNumbers;
}
 
async function runCode() {
    const outputBox = document.getElementById("output");
    const startTime = performance.now();
 
    switchPanel("console");
 
    outputBox.innerHTML = "● Executing your code...";
 
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/run",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: document.getElementById("language").value,
                    code: document.getElementById("code").value,
                    input_data: document.getElementById("input_data").value
                })
            }
        );
 
        const result = await response.json();
 
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);
 
        outputBox.innerText =
            result.output || "Execution completed successfully.";
 
        document.getElementById("stat-time").innerText =
            executionTime + " ms";
 
        document.getElementById("stat-mem").innerText =
            result.memory || "0.0 KB";
    }
    catch (error) {
        outputBox.innerText =
            "Error: Backend server is offline or not responding.";
    }
}
 
window.onload = function () {
    const savedTheme = localStorage.getItem("omnirun-theme");
    const themeBtn = document.getElementById("theme-btn");
 
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeBtn.innerText = "☀️";
    } else {
        themeBtn.innerText = "🌙";
    }
 
    handleInput();
};
 