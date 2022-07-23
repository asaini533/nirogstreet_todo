export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    console.log(data);

    const response = await fetch("http://localhost:3000/todo/" + data.userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    });

    console.log(response);

    const responseData = await response.json();

    res.json(responseData.entity);
  }
}
