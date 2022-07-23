import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
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
    // event.preventDefault();
    const response = await fetch("/api/signup", {
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
      <h1 className="m-4">Register</h1>
      <div className="bg-white p-10 drop-shadow-md rounded-lg w-1/3 flex flex-col ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border border-gray-400 px-4 py-3 rounded-lg"
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Name is required</span>}
          <input
            className="border border-gray-400 px-4 py-3 rounded-lg "
            placeholder="Mobile"
            type="number"
            {...register("mobile", { required: true })}
          />
          {errors.number && <span>This field is required</span>}
          <select
            className="border border-gray-400 px-4 py-3 rounded-lg"
            {...register("gender", { required: true })}
          >
            <option className="px-4 py-3" value="">
              Select Gender
            </option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span>Gender is required</span>}
          <select
            className="border border-gray-400 px-4 py-3 rounded-lg"
            {...register("country", { required: true })}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Srilanka">Srilanka</option>
            <option value="China">China</option>
            <option value="Japan">Japan</option>
            <option value="Pakistan">Pakistan</option>
            <option value="other">Other</option>
          </select>
          {errors.country && <span>Country is required</span>}
          <select
            className="border border-gray-400 px-4 py-3 rounded-lg"
            {...register("hobbies", { required: true })}
          >
            <option value="">Select Hobby</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Painting">Painting</option>
            <option value="Other">Other</option>
          </select>
          {errors.hobbies && <span>Hobby is required</span>}
          <input
            className="border border-gray-400 px-4 py-3 rounded-lg "
            placeholder="Email"
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is mandatory!" },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/i,
                message: "Enter a valid email!",
              },
            })}
          />
          {errors.email && <span>Enter a valid Email</span>}
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

        <Link href="/signin">
          <a className="text-center mt-6 text-gray-400 hover:text-gray-500 cursor-pointer ">
            SignIn
          </a>
        </Link>
      </div>
    </div>
  );
}
