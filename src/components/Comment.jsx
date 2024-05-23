export default function Comment({ comment, user, created, updated, user_id }) {
  return (
    <div className="border-2 border-white">
      <h1>
        <a href={`http://localhost:5173/profile/${user_id}`}>{user}</a>
      </h1>
      <div>{comment}</div>
      <p>{created}</p> <p>{updated}</p>
    </div>
  );
}
