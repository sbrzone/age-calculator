window.onload = () => {
    const today = new Date();
    document.getElementById('curDay').value = today.getDate();
    document.getElementById('curMonth').value = today.getMonth() + 1;
    document.getElementById('curYear').value = today.getFullYear();
};

function autoTab(current, nextId, len) {
    if (current.value.length >= len) {
        document.getElementById(nextId).focus();
    }
}

document.getElementById('calculateBtn').addEventListener('click', function() {
    const d1 = parseInt(document.getElementById('dobDay').value);
    const m1 = parseInt(document.getElementById('dobMonth').value);
    const y1 = parseInt(document.getElementById('dobYear').value);
    const d2 = parseInt(document.getElementById('curDay').value);
    const m2 = parseInt(document.getElementById('curMonth').value);
    const y2 = parseInt(document.getElementById('curYear').value);

    if (!d1 || !m1 || !y1) {
        this.style.backgroundColor = "#ff4444"; // Error feedback color
        setTimeout(() => this.style.backgroundColor = "#2da44e", 500);
        return;
    }

    // Calculations
    let d, m, y;
    y = y2 - y1;
    m2 >= m1 ? m = m2 - m1 : (y--, m = 12 + m2 - m1);
    d2 >= d1 ? d = d2 - d1 : (m--, d = new Date(y2, m2 - 1, 0).getDate() + d2 - d1);
    if (m < 0) { m = 11; y--; }

    // Update Results
    document.getElementById('mainResult').innerText = `Your age is: ${y} Years, ${m} Months, ${d} Days`;
    
    const todayObj = new Date(y2, m2 - 1, d2);
    let nextBday = new Date(todayObj > new Date(y2, m1-1, d1) ? y2 + 1 : y2, m1 - 1, d1);
    const diffDays = Math.ceil((nextBday - todayObj) / (1000 * 60 * 60 * 24));
    document.getElementById('nextBirthday').innerText = `Next Birthday: ${diffDays === 0 || diffDays === 365 ? "Today! 🎉" : "In " + diffDays + " Days"}`;

    const totalDays = Math.floor((todayObj - new Date(y1, m1-1, d1)) / (1000 * 60 * 60 * 24));
    document.getElementById('statsResult').innerText = `Age in Months: ${(y * 12) + m}, Age in Weeks: ${Math.floor(totalDays/7)}, Age in Days: ${totalDays}`;

    // Trigger Animation
    const resBox = document.getElementById('resultBox');
    resBox.classList.remove('show'); // Reset animation
    void resBox.offsetWidth; // Trigger reflow
    resBox.classList.add('show');
});