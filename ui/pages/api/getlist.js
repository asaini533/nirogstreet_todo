export default async function handler(req, res) {
  const { userId } = req.body;

  const response = await fetch("http://localhost:3000/todo/" + userId);
  const responseData = await response.json();

  console.log("hit", responseData);

  res.json(responseData.entity);
}
