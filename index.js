const postForm = document.getElementById('postForm');
const postContent = document.getElementById('postContent');
const postList = document.getElementById('postList');

// Load posts
let posts = JSON.parse(localStorage.getItem('posts')) || [];

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function renderPosts() {
  postList.innerHTML = '';
  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const contentP = document.createElement('p');
    contentP.textContent = post.content;
    postDiv.appendChild(contentP);

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.textContent = `❤️ ${post.likes}`;
    likeBtn.addEventListener('click', () => {
      post.likes += 1;
      savePosts();
      renderPosts();
    });
    postDiv.appendChild(likeBtn);

    // Comments
    const commentList = document.createElement('div');
    post.comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.textContent = comment;
      commentList.appendChild(commentDiv);
    });
    postDiv.appendChild(commentList);

    // Add comment form
    const commentForm = document.createElement('form');
    commentForm.innerHTML = `
      <input type="text" placeholder="Add a comment..." />
      <button type="submit">Comment</button>
    `;
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentInput = commentForm.querySelector('input');
      const commentText = commentInput.value.trim();
      if (commentText) {
        post.comments.push(commentText);
        commentInput.value = '';
        savePosts();
        renderPosts();
      }
    });

    postDiv.appendChild(commentForm);
    postList.appendChild(postDiv);
  });
}

// Handle new post
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = postContent.value.trim();
  if (content) {
    posts.unshift({ content, likes: 0, comments: [] });
    postContent.value = '';
    savePosts();
    renderPosts();
  }
});

// Initial render
renderPosts();
