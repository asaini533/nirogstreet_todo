export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log("hit", req.body);
    const data = req.body;

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        mobile: data.mobile,
        gender: data.gender,
        country: data.country,
        hobby: data.hobbies,
        email: data.email,
        password: data.password,
      }),
    });

    const responseData = await response.json();

    res.json(responseData.entity);
  }
}
