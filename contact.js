function myfunc1() {
  alert("your info was sent");
}
document.querySelector("#info").addEventListener("click", () => {
  myfunc1();
});
