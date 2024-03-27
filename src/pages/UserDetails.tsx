import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Wrapper } from "../components/table";
import useFetch from "../hooks/useFetch";
import { updateUser } from "../actions/user";
import { UserType } from "../lib/types";
import { notify } from "../lib/utils";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, loading } = useFetch(`https://dummyjson.com/users/${id}`);
  const [updatedUser, setUpdatedUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (updatedUser) {
      setUpdatedUser({ ...updatedUser, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (id && updatedUser) {
        await updateUser(+id, updatedUser);
        notify("User updated successfully", "success");
      }
    } catch (error) {
      notify("An error occurred while updating user.", "error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {updatedUser && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block text-neutral-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={updatedUser.firstName || ""}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md mt-1 text-md"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-neutral-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={updatedUser.lastName || ""}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md mt-1 text-md"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-neutral-700">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={updatedUser.age || ""}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md mt-1 text-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-neutral-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={updatedUser.email || ""}
              onChange={handleChange}
              className="w-full py-2 px-3 border rounded-md mt-1 text-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      )}
    </Wrapper>
  );
};

export default UserDetails;
