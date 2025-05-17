document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu");
    const navigation = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("show");
    });
});
