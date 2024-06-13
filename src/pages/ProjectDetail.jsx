import useFetchData from "../hooks/useFetchData";
import useProject from "../hooks/useProject.jsx";
import ProjectCard from "../components/ProjectCard";
import { useLoggedInUser } from "../context/LoggedInUserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "../components/Comment.jsx";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios.js";

export default function ProjectDetail() {
  const loggedInUser = useLoggedInUser();
  const { project, developer } = useFetchData();
  const {
    handleSubmit,
    setDeleteProject,
    setEditProject,
    editProject,
    error,
    title,
    description,
    homepage,
    repo,
    handleChange,
  } = useProject();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [users, setUsers] = useState([]);
  const [editCommentId, setEditCommentId] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await instance.get("/comments/");
        const user = await instance.get(`/users/`);
        setUsers(user?.data);
        setComments(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!editProject) {
      setDeleteProject(true);
    } else {
      setDeleteProject(false);
    }
    getComments();
  }, [editProject, setDeleteProject]);

  console.log(editCommentId);

  const handleCommentSubmit = async () => {
    try {
      if (!editCommentId) {
        await axios.instance("/comments/", {
          comment: comment,
          user: loggedInUser.pk,
          project: project.id,
        });
      } else {
        await instance.patch(`/comments/${editCommentId}/`, {
          comment: editedComment,
          user: loggedInUser.pk,
          project: project.id,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (comment) => {
    try {
      await instance.delete(`/comments/${comment.id}`);
      setComments(comments.filter((c) => c.id !== comment.id));
      navigate(`/project/${project.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!editProject ? (
        <>
          <ProjectCard project={project} username={developer?.username} />
          {loggedInUser.pk === project.developer && (
            <div className="flex gap-3 justify-center">
              <button className="btn-red" onClick={handleSubmit}>
                Delete
              </button>
              <button
                className="btn bg-blue-600"
                onClick={() => setEditProject(true)}
              >
                Edit
              </button>
            </div>
          )}
          {comments
            .filter((comment) => comment.project === project.id)
            .map((comment, id) => {
              const user = users.find((user) => user.id === comment.user);
              return (
                <div key={id} className="flex flex-col mt-5">
                  <Comment
                    id={comment.id}
                    user_id={user.id}
                    comment={
                      editCommentId === comment.id &&
                      loggedInUser.pk === comment.user ? (
                        <form
                          onSubmit={handleCommentSubmit}
                          className="flex flex-col"
                        >
                          <input
                            className="placeholder:text-center"
                            type="text"
                            placeholder={comment.comment}
                            onChange={(e) => setEditedComment(e.target.value)}
                          />
                          <button type="submit">Submit</button>
                        </form>
                      ) : (
                        comment.comment
                      )
                    }
                    user={user ? user.username : comment.user}
                    created={comment.created_at}
                    updated={comment.updated_at}
                  />
                  {loggedInUser.pk === comment.user && (
                    <>
                      <button
                        onClick={() => handleDeleteComment(comment)}
                        className="btn-red"
                      >
                        Delete Comment
                      </button>
                      <button onClick={() => setEditCommentId(comment.id)}>
                        Edit
                      </button>
                      {editCommentId === comment.id &&
                        loggedInUser.pk === comment.user && (
                          <button onClick={() => setEditCommentId(false)}>
                            Cancel
                          </button>
                        )}
                    </>
                  )}
                </div>
              );
            })}
          <form
            onSubmit={handleCommentSubmit}
            className="mt-5 flex flex-col gap-5"
          >
            <p>Add Comment</p>
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Add a comment"
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start">
            Title {error && <p>{error.title}</p>}
          </div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder={project.title}
          />
          <div className="flex flex-col items-start">
            Description {error && <p>{error.description}</p>}
          </div>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder={project.description}
          />
          <div className="flex">
            <p>Homepage</p>
          </div>
          <input
            type="text"
            name="homepage"
            value={homepage}
            onChange={handleChange}
            placeholder={project.homepage}
          />
          <div className="flex flex-col items-start">
            Repo {error && <p>{error.repo}</p>}
          </div>
          <input
            type="text"
            name="repo"
            value={repo}
            onChange={handleChange}
            placeholder={project.repo}
          />
          <button className="btn bg-green-500" type="submit">
            Submit
          </button>
          <button className="bg-blue-600" onClick={() => setEditProject(false)}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
}
