// Rough calculation of which year we're at for footer

document.addEventListener("DOMContentLoaded", (event) => { 
    let now = Date.now();
    const years = now / 1000 / 60 / 60 / 24 / 365;
    let footerspan = document.getElementById("copyright");
    footerspan.innerHTML += Math.floor(years + 1970);
});