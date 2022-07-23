import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ISSERVER = typeof window === "undefined";
  let userid;
  if (!ISSERVER) {
    userid = sessionStorage.getItem("userid");
  }

  if (userid) {
    router.push({ pathname: "/createtodo" });
  }

  const onSubmit = async (data) => {
    const response = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const user = await response.json();

    sessionStorage.setItem("userid", user.id);
    router.push({ pathname: "/createtodo" });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center ">
      <h1 className="m-4">Sign In</h1>
      <div className="bg-white p-10 drop-shadow-md rounded-lg w-1/3 flex flex-col ">
        <form class="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border border-gray-400 px-4 py-3 rounded-lg"
            placeholder="Mobile"
            type="number"
            {...register("number", {})}
          />
          {errors.mobile && <span>Mobile number is mandatory!</span>}
          <input
            className="border border-gray-400 px-4 py-3 rounded-lg"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && <span>Password is mandotary</span>}

          <input
            className="bg-orange-400 font-medium cursor-pointer text-white px-4 py-3 rounded-lg hover:bg-orange-500"
            type="submit"
          />
        </form>

        <Link href="/">
          <a className="text-center mt-6 text-gray-400 hover:text-gray-500 cursor-pointer ">
            Sign Up
          </a>
        </Link>
      </div>
    </div>
  );
}
