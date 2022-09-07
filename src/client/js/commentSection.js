const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
let deleteBtns = document.querySelectorAll(".comment__delete");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.className = "comment__delete";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);

  deleteBtns = document.querySelectorAll(".comment__delete");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDelete);
  });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
const handleDelete = async (event) => {
  console.log("start");
  const li = event.target.parentElement;
  const {
    dataset: { id: commentId },
  } = li;
  const response = await fetch(`/api/deleteComment/${commentId}`, {
    method: "DELETE",
  });
  console.log("delete success");
  li.remove();
  //window.location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDelete);
  });
}
