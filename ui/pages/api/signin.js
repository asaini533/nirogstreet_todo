export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    console.log(req.body);

    const response = await fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: data.number,
        password: data.password,
      }),
    });

    const responseData = await response.json();

    console.log(responseData);

    res.json(responseData.entity);
  }
}
