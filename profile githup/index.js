
const inputElement = document.querySelector("#input");
const buttonElement = document.querySelector("#button");

const DATA = [
  { id: "avatar_url", isImage: true },
  { id: "name" },
  { id: "bio" },
  { id: "twitter_username" },
  { id: "followers" },
];

buttonElement?.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = inputElement.value;
  try {
    const result = await fetchData(username);
    DATA.forEach((item) => fillData({ ...item, data: result[item.id] }));    
  } catch (err) {
    alert(err);
  }
});

// Get data from https://api.github.com/users/${username}
const fetchData = async (username) => {
  const result = await fetch(`https://api.github.com/users/${username}`);
  if (result.ok) {
    return result.json();
  }
  return Promise.reject(new Error("This username is not found !!!"));
}
// Add data to the html page (profile.html)
const fillData = (obj ) => {
  const element = document.querySelector(`#${obj.id}`);
  if (!obj.isImage) {
    element.textContent = obj.data;
  }
  else {
    element.src = obj.data;
  }
};


// When user adds wrong username then show him an alert with "This username is not found"
