const newsContainer = document.querySelector("#newsContainer");
const saveButton = document.querySelector("#saveButton");
const loadSavedButton = document.querySelector("#loadSavedButton");
const loadNewsButton = document.querySelector("#loadNewsButton");
const categorySelect = document.querySelector("#categorySelect");


function showDiv() {
  document.querySelector('#hidden').style.display = "block";
  document.querySelector('#landing-haeading').style.display = "none";
}

const savedNews = [];

const handleSavedNews = (savedItem) => {
   
    savedNews.push(savedItem);
  console.log(savedNews);
  alert("Your liked News are saved")
}

const getNews = (category = "science") => {
  newsContainer.innerHTML = "";
  fetch(`https://inshorts.deta.dev/news?category=${category}`)
    .then((response) => response.json())
    .then((data) => {
       console.log("Data", data)
      data.data.forEach((newsItem) => {
        const div = document.createElement("div");
        
        div.classList.add("newsItem");
        
        div.innerHTML = `
          
          <p>By <strong>${newsItem.author}</strong></p>
            <div id="box" style="backgroundColor:white;">
          <img src="${newsItem.imageUrl}" class="img"></img>
          <div id="innerbox">
          <p id="nscontent">${newsItem.content} <a href="${newsItem.readMoreUrl}" style="text-decoration:none">READ MORE</a></p>
          <p>Date:- ${newsItem.date}</p>
          <p>Time:- ${newsItem.time}</p>
          </div>
          </div>
       
        `;
        const button = document.createElement("button");
        button.style.backgroundImage = "url('like.png')";
        button.style.width='35px';
        button.style.height='35px';
        button.style.position= 'absolute';
        button.style.left='1050px';
        button.style.backgroundColor="Black";
        button.onclick = function () {
        handleSavedNews(newsItem)
    }
        div.appendChild(button);
        newsContainer.appendChild(div);
      });
    });
};

const saveNews = () => {
  const news = Array.from(document.querySelectorAll(".newsItem")).map(
    (newsItem) => {
      return {
        title: newsItem.querySelector("h2").textContent,
        content: newsItem.querySelector("#nscontent").textContent,
      };
    }
  );
  console.log("saved news", news)
  localStorage.setItem("savedNews", JSON.stringify(news));
};

const loadSavedNews = () => {
  console.log("Saved News", savedNews)
  newsContainer.innerHTML = "";
 
  if (!savedNews) {
    return;
  }
  savedNews.forEach((newsItem) => {
    const div = document.createElement("div");
    div.classList.add("newsItem");
    div.innerHTML = `
    <img src="${newsItem.imageUrl}" class="img"></img>
    <p>${newsItem.content}</p>
    
    `;
    newsContainer.appendChild(div);
  });
};

loadSavedButton.addEventListener("click", loadSavedNews);
loadNewsButton.addEventListener("click", () => {

  
  getNews(categorySelect.value);
});

getNews();
