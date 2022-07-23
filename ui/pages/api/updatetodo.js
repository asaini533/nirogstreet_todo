export default async function handler(req, res) {
  const { userId, todoId } = req.body;

  const response = await fetch(
    "http://localhost:3000/todo/" + todoId + "/" + userId,
    {
      method: "PUT",
    }
  );

  const responseData = await response.json();

  res.json(responseData.entity);
}
