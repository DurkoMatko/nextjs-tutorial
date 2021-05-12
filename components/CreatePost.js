// all from this tutorial: https://medium.com/swlh/lets-create-blog-app-with-next-js-react-hooks-and-firebase-backend-tutorial-7ce6fd7bbb3a#3c58

import React, { useState, useEffect } from "react";
import Link from "next/link";
import fire from "../config/fire-config";

const CreatePost = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });

    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const handleLogout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        setNotification("Logged out");
        setTimeout(() => {
          setNotification("");
        }, 2000);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fire
      .firestore()
      .collection("blog")
      .add({
        title: title,
        content: content,
      })
      .then((a) => {
        debugger;
      })
      .catch((e) => {
        debugger;
      });

    setTitle("");
    setContent("");
    setNotification("Blogpost created");

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  return (
    <div>
      <p>_______________________ Firestore Tutorial _______________________</p>
      {!loggedIn ? (
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link>{" "}
          |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      <h2>Blogs in Firestore</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href="/blog/[id]" as={"/blog/" + blog.id}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      {loggedIn ? (
        <>
          <h2>Add Blog</h2>
          {notification}
          <form onSubmit={handleSubmit}>
            <div>
              Title
              <br />
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              Content
              <br />
              <textarea
                value={content}
                onChange={({ target }) => setContent(target.value)}
              />
            </div>
            <button type="submit">Save</button>
          </form>
        </>
      ) : (
        <>You have to be logged in to create new blogs</>
      )}
      {/* <h2>Add Blog</h2>
      {notification}
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <br />
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Content
          <br />
          <textarea
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
};
export default CreatePost;
