console.log("client side js loaded");

//http://puzzle.mead.io/puzzle

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const para1 = document.querySelector('#p1');
const para2 = document.querySelector('#p2');

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  para1.textContent = 'Loading...';
  para2.textContent = '';
  const location = search.value;
    fetch(`/weather?location=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            para1.textContent = data.error
          } else {
            para1.textContent = data.fore;
            para2.textContent = data.loc;
          }
        });
      }
    );
});
