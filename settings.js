
const settingsBody = document.getElementById("settingsBody");
if (settingsBody) {
    
    document.getElementById("lightTheme").addEventListener("click", () => {
        localStorage.setItem("theme", "light");
        applyTheme();
    });

    document.getElementById("darkTheme").addEventListener("click", () => {
        localStorage.setItem("theme", "dark");
        applyTheme();
    });

    function applyTheme() {
        let theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.body.style.background = "#1e1e1e";
            document.body.style.color = "white";
        } else {
            document.body.style.background = "#f2f2f2";
            document.body.style.color = "black";
        }
    }

    applyTheme();
}
const fontBtns = document.querySelectorAll(".fontBtn");
if (fontBtns.length > 0) {
    fontBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let size = btn.getAttribute("data-size");
            localStorage.setItem("fontSize", size);
            document.body.style.fontSize = size;
        });
    });

    let savedSize = localStorage.getItem("fontSize");
    if (savedSize) {
        document.body.style.fontSize = savedSize;
    }
}
const deleteAllBtn = document.getElementById("deleteAll");
if (deleteAllBtn) {
    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete ALL expenses?")) {
            localStorage.removeItem("expenses");
            alert("All expenses deleted.");
        }
    });
}
