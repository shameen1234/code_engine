async function runCode() {
    const language = document.getElementById("language").value;
    const code = document.getElementById("code").value;
    const input_data = document.getElementById("input_data").value;
    const outputBox = document.getElementById("output");
 
    outputBox.innerText = "Running...";
 
    try {
        const response = await fetch("http://127.0.0.1:8000/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: language,
                code: code,
                input_data: input_data
            })
        });
 
        const result = await response.json();
        outputBox.innerText = result.output;
 
    } catch (error) {
        outputBox.innerText = "Error connecting to backend";
    }
}
 