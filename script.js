let incidents = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics...",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z"
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "LLM provided incorrect safety procedure information...",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z"
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata...",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z"
    }
];

// Initial render
window.onload = () => {
    renderIncidents();
    document.getElementById("incident-form").addEventListener("submit", handleSubmit);
    document.getElementById("filter-severity").addEventListener("change", renderIncidents);
    document.getElementById("sort-date").addEventListener("change", renderIncidents);
};

function renderIncidents() {
    const list = document.getElementById("incident-list");
    list.innerHTML = "";

    let filtered = [...incidents];

    const severityFilter = document.getElementById("filter-severity").value;
    const sortOption = document.getElementById("sort-date").value;

    if (severityFilter !== "All") {
        filtered = filtered.filter(inc => inc.severity === severityFilter);
    }

    if (sortOption === "newest") {
        filtered.sort((a, b) => new Date(b.reported_at) - new Date(a.reported_at));
    } else {
        filtered.sort((a, b) => new Date(a.reported_at) - new Date(b.reported_at));
    }

    filtered.forEach(incident => {
        const card = document.createElement("div");
        card.className = "incident-card";

        const title = document.createElement("h3");
        title.textContent = incident.title;

        const meta = document.createElement("p");
        meta.innerHTML = `<strong>Severity:</strong> ${incident.severity} | <strong>Date:</strong> ${new Date(incident.reported_at).toLocaleString()}`;

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View Details";
        viewBtn.className = "view-btn";

        const details = document.createElement("div");
        details.className = "details";
        details.textContent = incident.description;

        viewBtn.onclick = () => {
            details.style.display = details.style.display === "block" ? "none" : "block";
        };

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(viewBtn);
        card.appendChild(details);
        list.appendChild(card);
    });
    meta.innerHTML = `
  <strong>Severity:</strong> 
  <span class="severity-tag severity-${incident.severity}">${incident.severity}</span> 
  | <strong>Date:</strong> ${new Date(incident.reported_at).toLocaleString()}
`;

}

function handleSubmit(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const severity = document.getElementById("severity").value;

    if (!title || !description || !severity) {
        alert("Please fill all fields!");
        return;
    }

    const newIncident = {
        id: incidents.length + 1,
        title,
        description,
        severity,
        reported_at: new Date().toISOString()
    };

    incidents.push(newIncident);

    // Reset form
    e.target.reset();

    // Re-render list
    renderIncidents();
}

